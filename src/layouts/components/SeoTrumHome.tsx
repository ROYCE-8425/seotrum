"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

type SimulationState =
  | "idle"
  | "receiving"
  | "processing"
  | "syncing"
  | "complete";

type DataSourceKey = "sheet" | "webhook" | "excel" | "form";

type SolutionOption =
  | "Tự động hoá"
  | "Web & App"
  | "API, Bot & Tích hợp"
  | "SEO"
  | "Chưa rõ, cần tư vấn";

interface ProjectConcept {
  id: "ops-system" | "sync-tool";
  slug: string;
  tag: string;
  title: string;
  description: string;
  formOption: SolutionOption;
  architectureSteps: {
    step: string;
    title: string;
    detail: string;
  }[];
  highlights: string[];
}

const PROJECT_CONCEPTS: ProjectConcept[] = [
  {
    id: "ops-system",
    slug: "he-thong-quan-ly-va-dieu-phoi-van-hanh",
    tag: "WEB APP / AUTOMATION",
    title: "Hệ thống quản lý & vận hành",
    description:
      "Theo dõi đơn hàng, công việc, trạng thái xử lý và dữ liệu tập trung trên một màn hình.",
    formOption: "Web & App",
    architectureSteps: [
      {
        step: "01",
        title: "Tiếp nhận & Phân luồng",
        detail:
          "Tập hợp yêu cầu từ biểu mẫu hoặc nhập liệu nội bộ vào một danh sách chuẩn hoá duy nhất.",
      },
      {
        step: "02",
        title: "Xử lý theo trạng thái rõ ràng",
        detail:
          "Theo dõi từng bước (Đang xử lý → Hoàn thành) kèm người phụ trách và lịch sử thao tác.",
      },
      {
        step: "03",
        title: "Tổng hợp & Đối soát",
        detail:
          "Hiển thị tiến độ xử lý theo thời gian thực với dữ liệu minh bạch, hạn chế sai sót thủ công.",
      },
    ],
    highlights: [
      "Giao diện tập trung một màn hình, giảm chuyển đổi qua lại giữa nhiều tab",
      "Trạng thái luồng công việc rõ ràng cho cả người thực thi và quản lý",
      "Thiết kế mô-đun dễ mở rộng thêm bước tự động hoá khi quy mô tăng",
    ],
  },
  {
    id: "sync-tool",
    slug: "cong-cu-xu-ly-va-dong-bo-du-lieu-da-kenh",
    tag: "CUSTOM TOOL / API",
    title: "Công cụ xử lý & đồng bộ dữ liệu",
    description:
      "Tự động kiểm tra, làm sạch, chuẩn hoá và đẩy dữ liệu giữa các nền tảng qua API.",
    formOption: "API, Bot & Tích hợp",
    architectureSteps: [
      {
        step: "01",
        title: "Nhận dữ liệu từ API",
        detail:
          "Tự động thu thập bản ghi mới theo lịch định kỳ hoặc sự kiện Webhook.",
      },
      {
        step: "02",
        title: "Làm sạch & chuyển đổi",
        detail:
          "Chuẩn hoá trường dữ liệu, kiểm tra định dạng và lọc trùng bản ghi tự động.",
      },
      {
        step: "03",
        title: "Đồng bộ sang hệ thống & Gửi thông báo",
        detail:
          "Đẩy dữ liệu sang CRM/Sheet đích và gửi cảnh báo khi có bản ghi lỗi.",
      },
    ],
    highlights: [
      "Chạy tự động theo sự kiện (Webhook) hoặc theo lịch cố định",
      "Tách biệt rõ bản ghi thành công và bản ghi cần kiểm tra lại",
      "Giảm rủi ro lệch dữ liệu khi nhập tay trên nhiều phần mềm",
    ],
  },
];

const SOURCE_LABELS: Record<DataSourceKey, string> = {
  sheet: "Google Sheets",
  webhook: "Webhook",
  excel: "File Excel",
  form: "Form website",
};

export default function SeoTrumHome() {
  // --- 1. Interactive Workflow Demo State Machine ---
  const [simState, setSimState] = useState<SimulationState>("complete");
  const [selectedSource, setSelectedSource] = useState<DataSourceKey>("sheet");
  const [runHistory, setRunHistory] = useState<
    { id: number; status: "success" | "error"; label: string; time: string }[]
  >([
    { id: 1, status: "success", label: "Hoàn thành", time: "2 phút trước" },
    { id: 2, status: "success", label: "Hoàn thành", time: "1 giờ trước" },
    { id: 3, status: "error", label: "Lỗi dữ liệu", time: "3 giờ trước" },
    { id: 4, status: "success", label: "Hoàn thành", time: "Hôm qua" },
  ]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
  );

  const demoRunBtnRef = useRef<HTMLButtonElement | null>(null);
  const simRunCountRef = useRef(4);
  const timerIdRef = useRef<number | null>(null);
  const nextStepFnRef = useRef<(() => void) | null>(null);
  const stepDeadlineRef = useRef<number>(0);
  const remainingMsRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const clearSimTimer = useCallback(() => {
    if (timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    nextStepFnRef.current = null;
    remainingMsRef.current = 0;
  }, []);

  const scheduleSimStep = useCallback(
    (delayMs: number, callback: () => void) => {
      if (timerIdRef.current !== null) {
        window.clearTimeout(timerIdRef.current);
      }
      nextStepFnRef.current = callback;
      remainingMsRef.current = delayMs;
      stepDeadlineRef.current = performance.now() + delayMs;

      if (!document.hidden) {
        isPausedRef.current = false;
        timerIdRef.current = window.setTimeout(() => {
          timerIdRef.current = null;
          nextStepFnRef.current = null;
          callback();
        }, delayMs);
      } else {
        isPausedRef.current = true;
      }
    },
    [],
  );

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timerIdRef.current !== null && nextStepFnRef.current) {
          window.clearTimeout(timerIdRef.current);
          timerIdRef.current = null;
          const left = Math.max(
            16,
            stepDeadlineRef.current - performance.now(),
          );
          remainingMsRef.current = left;
          isPausedRef.current = true;
        }
      } else {
        if (isPausedRef.current && nextStepFnRef.current) {
          isPausedRef.current = false;
          const fn = nextStepFnRef.current;
          const delay = Math.max(16, remainingMsRef.current);
          stepDeadlineRef.current = performance.now() + delay;
          timerIdRef.current = window.setTimeout(() => {
            timerIdRef.current = null;
            nextStepFnRef.current = null;
            fn();
          }, delay);
        }
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearSimTimer();
    };
  }, [clearSimTimer]);

  const handleRunSimulation = () => {
    if (
      simState === "receiving" ||
      simState === "processing" ||
      simState === "syncing"
    ) {
      return;
    }

    clearSimTimer();
    const d1 = prefersReducedMotion ? 120 : 650;
    const d2 = prefersReducedMotion ? 120 : 700;
    const d3 = prefersReducedMotion ? 120 : 700;

    setSimState("receiving");
    scheduleSimStep(d1, () => {
      setSimState("processing");
      scheduleSimStep(d2, () => {
        setSimState("syncing");
        scheduleSimStep(d3, () => {
          setSimState("complete");
          simRunCountRef.current += 1;
          const nextId = simRunCountRef.current;
          setRunHistory((prev) =>
            [
              {
                id: nextId,
                status: "success" as const,
                label: "Hoàn thành",
                time: "Vừa xong",
              },
              ...prev,
            ].slice(0, 4),
          );
        });
      });
    });
  };

  const handleSecondaryHeroCta = () => {
    demoRunBtnRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
    demoRunBtnRef.current?.focus();
    handleRunSimulation();
  };

  // --- 2. Project Showcase Modal State ---
  const [activeProjectModal, setActiveProjectModal] =
    useState<ProjectConcept | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalDialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeProjectModal) return;
    const focusTimer = window.setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 20);

    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveProjectModal(null);
      }
    };

    window.addEventListener("keydown", handleModalKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleModalKeyDown);
    };
  }, [activeProjectModal]);

  // --- 3. Consultation Form State ---
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [solutionNeed, setSolutionNeed] = useState<string>("");
  const [problemDesc, setProblemDesc] = useState("");
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    contactInfo?: string;
    solutionNeed?: string;
    problemDesc?: string;
  }>({});
  const [previewValidated, setPreviewValidated] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const contactInputRef = useRef<HTMLInputElement | null>(null);
  const solutionSelectRef = useRef<HTMLSelectElement | null>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const formSectionRef = useRef<HTMLElement | null>(null);

  const prefillAndScrollToForm = (option: SolutionOption) => {
    setSolutionNeed(option);
    setPreviewValidated(false);
    formSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  const validateConsultationForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      fullName?: string;
      contactInfo?: string;
      solutionNeed?: string;
      problemDesc?: string;
    } = {};

    const trimmedName = fullName.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      errors.fullName = "Vui lòng nhập họ và tên từ 2 đến 100 ký tự.";
    }

    const trimmedContact = contactInfo.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = trimmedContact.replace(/[\s().+-]/g, "");
    const isPhone = /^\d{8,15}$/.test(phoneDigits);
    if (!emailRegex.test(trimmedContact) && !isPhone) {
      errors.contactInfo =
        "Vui lòng nhập email hợp lệ hoặc số điện thoại (8–15 chữ số).";
    }

    if (!solutionNeed) {
      errors.solutionNeed = "Vui lòng chọn nhu cầu giải pháp.";
    }

    const trimmedDesc = problemDesc.trim();
    if (trimmedDesc.length < 10 || trimmedDesc.length > 3000) {
      errors.problemDesc = "Vui lòng chia sẻ ngắn gọn bài toán của bạn.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setPreviewValidated(false);
      if (errors.fullName) {
        nameInputRef.current?.focus();
      } else if (errors.contactInfo) {
        contactInputRef.current?.focus();
      } else if (errors.solutionNeed) {
        solutionSelectRef.current?.focus();
      } else if (errors.problemDesc) {
        descTextareaRef.current?.focus();
      }
      return;
    }

    setPreviewValidated(true);
    fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: trimmedName,
        contactInfo: trimmedContact,
        solutionNeed,
        problemDesc: trimmedDesc,
        source: "homepage",
      }),
    }).catch(() => {});
  };

  const stepProgressCount =
    simState === "idle"
      ? 0
      : simState === "receiving"
        ? 1
        : simState === "processing"
          ? 2
          : 3;

  const isSimRunning =
    simState === "receiving" ||
    simState === "processing" ||
    simState === "syncing";

  return (
    <div className="bg-[#FFFFFF] text-[#202326] overflow-x-hidden">
      {/* =====================================================================
          SECTION 1: HERO + INTERACTIVE AUTOMATION STUDIO
      ===================================================================== */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 bg-[#FFFFFF]">
        {/* Soft ambient technical radial glow behind right workspace */}
        <div
          className="pointer-events-none absolute right-0 top-6 w-[55%] h-[88%] rounded-full bg-radial from-[#FFF6D6]/70 via-[#F4F5F7]/40 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="st-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
            {/* Left Column (5 cols on desktop) */}
            <div className="lg:col-span-5 relative pt-2 lg:pt-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-[#FFC62A] inline-block"
                  aria-hidden="true"
                />
                <span className="text-[11.5px] font-bold tracking-[0.06em] uppercase text-[#5B6068]">
                  DỊCH VỤ TỰ ĐỘNG HOÁ (AUTOMATION) &nbsp;•&nbsp; CUSTOM DEVELOPMENT
                </span>
              </div>

              {/* Handwritten annotation "Một luồng. Nhiều công cụ." + curved arrow */}
              <div
                className="hidden xl:flex flex-col items-center absolute -right-6 top-[48px] z-20 select-none pointer-events-none -rotate-6"
                aria-hidden="true"
              >
                <span className="italic text-[14px] leading-[1.2] text-[#202326] font-semibold text-center tracking-tight">
                  Một luồng.
                  <br />
                  Nhiều công cụ.
                </span>
                <svg
                  viewBox="0 0 64 42"
                  className="w-12 h-8 text-[#202326] mt-0.5 ml-4"
                  fill="none"
                >
                  <path
                    d="M8 4 C 24 18, 36 26, 52 34"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M44 35 L53 34.5 L49 26"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* H1: 2 lines on desktop with yellow underline under "phần mềm" */}
              <h1 className="font-extrabold text-[40px] sm:text-[50px] lg:text-[50px] xl:text-[56px] leading-[1.08] tracking-[-0.035em] text-[#202326] mb-5">
                Việc lặp lại,
                <br />
                <span className="whitespace-nowrap">
                  để{" "}
                  <span className="hero-software-highlight">phần mềm</span> lo.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[16px] lg:text-[16.5px] leading-[1.6] text-[#5B6068] max-w-[420px] mb-8">
                Tôi cùng Sèo Trum cung cấp dịch vụ tự động hoá (automation), xây
                công cụ và hệ thống giúp doanh nghiệp bớt thao tác, kết nối dữ
                liệu và vận hành gọn hơn.
              </p>

              {/* CTA Row: Primary dark button + Underlined text link */}
              <div className="flex flex-wrap items-center gap-5 relative z-30">
                <a
                  href="#tu-van"
                  className="inline-flex items-center gap-2.5 bg-[#202326] text-[#FFFFFF] text-[14.5px] font-bold rounded-[11px] px-5 py-3.5 hover:bg-[#141618] transition-colors shadow-sm"
                >
                  <span>Tìm giải pháp cho tôi</span>
                  <span
                    className="text-[#FFC62A] text-[15px] leading-none font-bold"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleSecondaryHeroCta}
                  className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#202326] border-b-[1.5px] border-[#202326] pb-1 hover:text-[#5B6068] hover:border-[#5B6068] transition-colors cursor-pointer"
                >
                  <span>Xem cách hệ thống chạy</span>
                  <span className="text-[14px] leading-none" aria-hidden="true">
                    ↓
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Automation Studio Window + Mascot + 3 Floating Cards (7 cols) */}
            <div className="lg:col-span-7 relative lg:pl-4">
              {/* Mascot overlapping bottom-left of the studio stage */}
              <div className="relative lg:absolute lg:-left-[92px] lg:bottom-[54px] z-20 flex items-center justify-center lg:block mb-4 lg:mb-0 pointer-events-none select-none">
                {/* Dashed yellow connector line from mascot laptop to Node 1 */}
                <svg
                  viewBox="0 0 140 110"
                  className="hidden lg:block absolute -top-[58px] left-[128px] w-[124px] h-[94px] z-10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 8 92 C 36 92, 52 24, 128 16"
                    stroke="#F5B800"
                    strokeWidth="2.2"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />
                </svg>

                <Image
                  src="/images/brand-mascot.png"
                  alt="Linh vật Sèo Trum mặc áo hoodie lập trình hệ thống tự động hoá"
                  width={200}
                  height={205}
                  priority
                  className="w-[148px] sm:w-[168px] lg:w-[184px] h-auto object-contain drop-shadow-[0_14px_28px_rgba(20,23,28,0.12)]"
                />
              </div>

              {/* Outer Glass Bezel Frame */}
              <div className="bg-[#F3F4F6]/90 border border-[#E5E7EB] rounded-[24px] p-2 sm:p-3 shadow-[0_24px_60px_rgba(20,23,28,0.08)]">
                {/* Main Studio Window */}
                <div
                  className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] overflow-hidden"
                  role="region"
                  aria-label="Sèo Trum Automation Studio — Mô phỏng quy trình"
                >
                  {/* Window Header Bar */}
                  <div className="px-4 sm:px-5 py-3 bg-[#FAFAFB] border-b border-[#ECEEF2] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-1.5"
                        aria-hidden="true"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FDBA74]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FDE047]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                      </div>
                      <div className="text-[13.5px] tracking-tight">
                        <strong className="font-extrabold text-[#202326]">
                          Sèo Trum
                        </strong>{" "}
                        <span className="text-[#9CA3AF] font-normal">/</span>{" "}
                        <span className="text-[#5B6068] font-medium">
                          Automation Studio
                        </span>
                      </div>
                    </div>

                    <button
                      ref={demoRunBtnRef}
                      type="button"
                      onClick={handleRunSimulation}
                      disabled={isSimRunning}
                      aria-busy={isSimRunning}
                      className="inline-flex items-center gap-2 bg-[#FFC62A] hover:bg-[#F0B900] disabled:opacity-70 text-[#202326] text-[13px] font-bold rounded-full pl-2.5 pr-3.5 py-1.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <span
                        className="w-5 h-5 rounded-full bg-[#202326] text-[#FFC62A] inline-flex items-center justify-center text-[9px]"
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                      <span>
                        {isSimRunning ? "Đang chạy luồng..." : "Chạy thử luồng"}
                      </span>
                      <span className="text-[13px] font-bold" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  </div>

                  {/* Window Body: Left Sidebar + Right Dot-Grid Canvas */}
                  <div className="grid grid-cols-12">
                    {/* Left Studio Sidebar */}
                    <div className="col-span-12 sm:col-span-3 bg-[#FAFAFB] border-b sm:border-b-0 sm:border-r border-[#ECEEF2] p-3 flex sm:flex-col gap-1.5 overflow-x-auto">
                      <div className="bg-[#FFF3C4] text-[#202326] font-bold rounded-lg px-2.5 py-2 text-[11.5px] flex items-center gap-2 shrink-0">
                        <span className="w-4 h-4 rounded-full bg-[#FFC62A] text-[#202326] inline-flex items-center justify-center text-[9px]">
                          ⚙
                        </span>
                        <span>Luồng xử lý</span>
                      </div>
                      <div className="text-[#5B6068] font-medium rounded-lg px-2.5 py-1.5 text-[11.5px] flex items-center gap-2 shrink-0">
                        <span className="text-[12px] opacity-75">🕒</span>
                        <span>Lịch sử chạy</span>
                      </div>
                      <div className="text-[#5B6068] font-medium rounded-lg px-2.5 py-1.5 text-[11.5px] flex items-center gap-2 shrink-0">
                        <span className="text-[12px] opacity-75">⊞</span>
                        <span>Tích hợp</span>
                      </div>
                      <div className="text-[#5B6068] font-medium rounded-lg px-2.5 py-1.5 text-[11.5px] flex items-center gap-2 shrink-0">
                        <span className="text-[12px] opacity-75">☷</span>
                        <span>Cài đặt</span>
                      </div>
                    </div>

                    {/* Right Dot-Grid Canvas */}
                    <div className="col-span-12 sm:col-span-9 st-studio-dots p-4 sm:p-5 sm:pb-24 relative">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center relative">
                        {/* Node 1: Nhận dữ liệu */}
                        <div
                          className={`relative bg-[#FFFFFF] rounded-[14px] p-3.5 border text-center shadow-[0_6px_18px_rgba(20,23,28,0.04)] transition-all ${
                            simState === "receiving"
                              ? "border-[#FFC62A] ring-2 ring-[#FFC62A]/40"
                              : "border-[#E5E7EB]"
                          }`}
                        >
                          <span
                            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#217A48] text-white text-[9px] font-bold inline-flex items-center justify-center"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-[#ECFDF3] border border-[#ABEFC6] text-[#217A48] mx-auto mb-2.5 flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="4" y="4" width="16" height="16" rx="2" />
                              <line x1="8" y1="9" x2="16" y2="9" />
                              <line x1="8" y1="13" x2="16" y2="13" />
                              <line x1="8" y1="17" x2="12" y2="17" />
                            </svg>
                          </div>
                          <h3 className="text-[11.5px] font-extrabold text-[#202326] mb-0.5 whitespace-nowrap">
                            Nhận dữ liệu
                          </h3>
                          <p className="text-[10px] text-[#5B6068] m-0 whitespace-nowrap">
                            Form / API / File
                          </p>

                          {/* Dashed arrow 1 -> 2 */}
                          <div
                            className="hidden sm:flex items-center absolute top-1/2 -right-[18px] w-[18px] -translate-y-1/2 z-20"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t-2 border-dashed border-[#F5B800]" />
                            <span className="text-[#F5B800] text-[10px] -ml-1 font-bold">
                              ▸
                            </span>
                          </div>
                        </div>

                        {/* Node 2: Xử lý theo quy tắc */}
                        <div
                          className={`relative bg-[#FFFFFF] rounded-[14px] p-3 border text-center shadow-[0_6px_18px_rgba(20,23,28,0.04)] transition-all ${
                            simState === "processing"
                              ? "border-[#FFC62A] ring-2 ring-[#FFC62A]/50 bg-[#FFFCF1]"
                              : "border-[#FFC62A]/70"
                          }`}
                        >
                          <span
                            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#217A48] text-white text-[9px] font-bold inline-flex items-center justify-center"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-[#FFF3C4] border border-[#FFC62A] text-[#D97706] mx-auto mb-2.5 flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                          </div>
                          <h3 className="text-[11.5px] font-extrabold text-[#202326] mb-0.5 whitespace-nowrap">
                            Xử lý theo quy tắc
                          </h3>
                          <p className="text-[10px] text-[#5B6068] m-0 whitespace-nowrap">
                            Lọc, chuyển đổi, xử lý
                          </p>

                          {/* Dashed arrow 2 -> 3 */}
                          <div
                            className="hidden sm:flex items-center absolute top-1/2 -right-[18px] w-[18px] -translate-y-1/2 z-20"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t-2 border-dashed border-[#F5B800]" />
                            <span className="text-[#F5B800] text-[10px] -ml-1 font-bold">
                              ▸
                            </span>
                          </div>
                        </div>

                        {/* Node 3: Đồng bộ hệ thống */}
                        <div
                          className={`relative bg-[#FFFFFF] rounded-[14px] p-3 border text-center shadow-[0_6px_18px_rgba(20,23,28,0.04)] transition-all ${
                            simState === "syncing"
                              ? "border-[#FFC62A] ring-2 ring-[#FFC62A]/40"
                              : "border-[#E5E7EB]"
                          }`}
                        >
                          <span
                            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#217A48] text-white text-[9px] font-bold inline-flex items-center justify-center"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] mx-auto mb-2.5 flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 12 12 17 22 12" />
                              <polyline points="2 17 12 22 22 17" />
                            </svg>
                          </div>
                          <h3 className="text-[11.5px] font-extrabold text-[#202326] mb-0.5 whitespace-nowrap">
                            Đồng bộ hệ thống
                          </h3>
                          <p className="text-[10px] text-[#5B6068] m-0 whitespace-nowrap">
                            CRM / Email / Notion...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Floating Sub-Cards Overlapping Bottom of Studio Window */}
              <div className="mt-4 sm:-mt-14 relative z-30 grid grid-cols-1 sm:grid-cols-12 gap-2.5 px-1 sm:pl-20 sm:pr-1 items-start">
                {/* Floating Card 1: Nguồn dữ liệu */}
                <div className="sm:col-span-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-3 shadow-[0_16px_38px_rgba(20,23,28,0.08)] lg:-rotate-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-extrabold text-[#202326]">
                      Nguồn dữ liệu
                    </span>
                    <span className="text-[10px] text-[#9CA3AF] font-bold">
                      •• ⌄
                    </span>
                  </div>
                  <div className="space-y-1">
                    {(
                      [
                        {
                          key: "sheet" as const,
                          name: "Google Sheets",
                          badge: "Đã kết nối",
                          dotColor: "bg-[#217A48]",
                          iconBg: "bg-[#217A48]",
                          iconChar: "⊞",
                        },
                        {
                          key: "webhook" as const,
                          name: "Webhook",
                          badge: "Đã kết nối",
                          dotColor: "bg-[#217A48]",
                          iconBg: "bg-[#4F46E5]",
                          iconChar: "⇄",
                        },
                        {
                          key: "excel" as const,
                          name: "File Excel",
                          badge: "Sẵn sàng",
                          dotColor: "bg-[#6366F1]",
                          iconBg: "bg-[#15803D]",
                          iconChar: "X",
                        },
                        {
                          key: "form" as const,
                          name: "Form website",
                          badge: "Đã kết nối",
                          dotColor: "bg-[#217A48]",
                          iconBg: "bg-[#F59E0B]",
                          iconChar: "▤",
                        },
                      ] as const
                    ).map((src) => {
                      const active = selectedSource === src.key;
                      return (
                        <button
                          key={src.key}
                          type="button"
                          onClick={() => setSelectedSource(src.key)}
                          className={`w-full flex items-center justify-between gap-1 px-1.5 py-1 rounded-lg text-left transition-colors cursor-pointer ${
                            active
                              ? "bg-[#F6F7F8] ring-1 ring-[#E5E7EB]"
                              : "hover:bg-[#F6F7F8]/60"
                          }`}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`w-3.5 h-3.5 rounded text-[8px] font-extrabold text-white inline-flex items-center justify-center shrink-0 ${src.iconBg}`}
                            >
                              {src.iconChar}
                            </span>
                            <span className="text-[10px] font-semibold text-[#202326] whitespace-nowrap">
                              {src.name}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] text-[#5B6068] shrink-0">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${src.dotColor}`}
                            />
                            <span>{src.badge}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Floating Card 2: Đang chạy luồng... (Dark Charcoal Card) */}
                <div className="sm:col-span-4 sm:-mt-3 relative">
                  <div
                    className="bg-[#202326] text-[#FFFFFF] rounded-[16px] p-3.5 shadow-[0_22px_48px_rgba(20,23,28,0.24)] border border-[#202326]"
                    aria-live="polite"
                  >
                    <div className="text-[12.5px] font-bold text-[#FFFFFF] mb-2">
                      Đang chạy luồng...
                    </div>

                    {/* Progress bar + 3/3 */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="flex-1 h-2 rounded-full bg-[#FFFFFF]/15 overflow-hidden">
                        <div
                          className="h-full bg-[#FFC62A] rounded-full transition-all duration-300"
                          style={{
                            width: `${(stepProgressCount / 3) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-[#FFFFFF]/90">
                        {stepProgressCount}/3
                      </span>
                    </div>

                    {/* 3 Checklist steps */}
                    <ul className="space-y-1.5 m-0 p-0 list-none mb-2.5 text-[10px]">
                      <li className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#217A48] text-white text-[8px] font-bold inline-flex items-center justify-center shrink-0">
                          ✓
                        </span>
                        <span className="text-white/95 whitespace-nowrap">
                          Nhận dữ liệu từ {SOURCE_LABELS[selectedSource]}
                        </span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span
                          className={`w-3.5 h-3.5 rounded-full text-[8px] font-bold inline-flex items-center justify-center shrink-0 ${
                            stepProgressCount >= 2
                              ? "bg-[#217A48] text-white"
                              : "bg-white/15 text-white/60"
                          }`}
                        >
                          ✓
                        </span>
                        <span className="text-white/95 whitespace-nowrap">
                          Xử lý theo quy tắc
                        </span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span
                          className={`w-3.5 h-3.5 rounded-full text-[8px] font-bold inline-flex items-center justify-center shrink-0 ${
                            stepProgressCount >= 3
                              ? "bg-[#217A48] text-white"
                              : "bg-white/15 text-white/60"
                          }`}
                        >
                          ✓
                        </span>
                        <span className="text-white/95 whitespace-nowrap">
                          Đồng bộ sang hệ thống
                        </span>
                      </li>
                    </ul>

                    <div className="text-[10px] text-white/60 pt-2 border-t border-white/10">
                      {isSimRunning
                        ? "Đang thực thi mô phỏng..."
                        : "Hoàn thành  •  2 phút trước"}
                    </div>
                  </div>

                  {/* Handwritten annotation "Mô phỏng quy trình" below dark card */}
                  <div
                    className="hidden sm:flex items-center justify-center gap-1.5 mt-2 select-none"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 36 28"
                      className="w-7 h-6 text-[#202326] -mt-2"
                      fill="none"
                    >
                      <path
                        d="M28 24 C 14 24, 8 16, 10 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 9 L10 3 L15 9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="italic text-[14px] font-semibold text-[#202326] tracking-tight">
                      Mô phỏng quy trình
                    </span>
                  </div>
                </div>

                {/* Floating Card 3: Lịch sử chạy */}
                <div className="sm:col-span-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-3.5 shadow-[0_16px_38px_rgba(20,23,28,0.08)]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12.5px] font-extrabold text-[#202326]">
                      Lịch sử chạy
                    </span>
                    <Link
                      href="/automation-studio"
                      className="text-[10.5px] font-semibold text-[#5B6068] hover:text-[#202326]"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                  <ul className="space-y-2 m-0 p-0 list-none">
                    {runHistory.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-2 text-[11px] py-1 border-b border-[#F3F4F6] last:border-0"
                      >
                        <span className="inline-flex items-center gap-1.5 font-semibold text-[#202326]">
                          {item.status === "success" ? (
                            <span className="w-4 h-4 rounded-full bg-[#217A48] text-white text-[9px] font-bold inline-flex items-center justify-center shrink-0">
                              ✓
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-[#EF4444] text-white text-[8px] font-bold inline-flex items-center justify-center shrink-0">
                              ▶
                            </span>
                          )}
                          <span>{item.label}</span>
                        </span>
                        <span className="text-[10.5px] text-[#5B6068]">
                          {item.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: 01 / GIẢI PHÁP CỦA SÈO TRUM — Đúng công cụ. Đúng việc.
      ===================================================================== */}
      <section
        id="phan-mem"
        className="py-16 lg:py-24 bg-[#F7F8FA] border-t border-b border-[#ECEEF2] scroll-mt-20"
      >
        <div id="giai-phap" className="st-container scroll-mt-24">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                  aria-hidden="true"
                />
                <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#5B6068]">
                  01 / GIẢI PHÁP CỦA SÈO TRUM
                </span>
              </div>
              <h2 className="font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.12] tracking-[-0.03em] text-[#202326] m-0">
                Đúng công cụ. Đúng việc.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
              <p className="text-[13.5px] leading-[1.55] text-[#5B6068] max-w-[340px] m-0">
                Từ dịch vụ tự động hoá (automation) đến hệ thống theo yêu cầu,
                chúng tôi xây giải pháp phù hợp với cách bạn đang vận hành.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-[#FFFCF1] border border-[#FFC62A] rounded-full px-4 py-1.5 text-[12.5px] font-bold text-[#202326] hover:bg-[#FFF3C4] transition-colors shrink-0 self-start sm:self-auto"
              >
                Thiết kế theo nhu cầu
              </Link>
            </div>
          </div>

          {/* 3 Solution Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CARD 1: Công cụ tự động hoá */}
            <article className="bg-[#FFFFFF] rounded-[20px] p-5 border border-[#ECEEF2] shadow-[0_10px_30px_rgba(20,23,28,0.03)] flex flex-col justify-between hover:border-[#202326]/30 transition-all">
              {/* Illustration 1: Vertical Flowchart with Dark Left Strip */}
              <div
                className="h-[215px] rounded-[14px] bg-[#FFFFFF] border border-[#ECEEF2] overflow-hidden flex shadow-2xs"
                aria-hidden="true"
              >
                {/* Dark left mini toolbar */}
                <div className="w-8 bg-[#202326] py-3 flex flex-col items-center gap-3 shrink-0">
                  <span className="w-3.5 h-3.5 rounded bg-white/20" />
                  <span className="w-3.5 h-3.5 rounded bg-white/15" />
                  <span className="w-3.5 h-3.5 rounded bg-white/15" />
                  <span className="w-3.5 h-3.5 rounded bg-white/15" />
                  <span className="w-3.5 h-3.5 rounded bg-white/10 mt-auto" />
                </div>

                {/* Dot-grid flowchart area */}
                <div className="flex-1 st-studio-dots p-3 flex flex-col items-center justify-between relative">
                  {/* Top node: Trigger / Nhận dữ liệu */}
                  <div className="bg-white border border-[#E5E7EB] rounded-xl px-3 py-1.5 shadow-2xs flex items-center gap-2 z-10">
                    <span className="w-6 h-6 rounded-lg bg-[#ECFDF3] border border-[#ABEFC6] text-[#217A48] inline-flex items-center justify-center text-[11px] font-bold">
                      ⚡
                    </span>
                    <div className="leading-tight">
                      <span className="text-[9px] text-[#5B6068] block">
                        Trigger
                      </span>
                      <span className="text-[11px] font-bold text-[#202326] block">
                        Nhận dữ liệu
                      </span>
                    </div>
                  </div>

                  {/* Connector arrow down */}
                  <div className="h-3 border-l-2 border-dashed border-[#F5B800]" />

                  {/* Middle node: Lọc & xử lý / Theo quy tắc */}
                  <div className="bg-[#FFFCF1] border-2 border-[#FFC62A] rounded-xl px-3.5 py-1.5 shadow-2xs flex items-center gap-2 z-10">
                    <span className="w-6 h-6 rounded-lg bg-[#FFF3C4] text-[#D97706] inline-flex items-center justify-center text-[12px] font-bold">
                      ⚙
                    </span>
                    <div className="leading-tight">
                      <span className="text-[11px] font-bold text-[#202326] block">
                        Lọc &amp; xử lý
                      </span>
                      <span className="text-[9px] text-[#5B6068] block">
                        Theo quy tắc
                      </span>
                    </div>
                  </div>

                  {/* Branching connector lines */}
                  <div className="w-3/5 h-3 border-t-2 border-l-2 border-r-2 border-dashed border-[#CBD5E1] rounded-t-md" />

                  {/* Bottom 2 nodes */}
                  <div className="w-full grid grid-cols-2 gap-2 z-10">
                    <div className="bg-white border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 shadow-2xs flex items-center justify-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-[#FEF3C7] text-[#D97706] inline-flex items-center justify-center text-[10px]">
                        ✉
                      </span>
                      <span className="text-[10px] font-bold text-[#202326] truncate">
                        Gửi thông báo
                      </span>
                    </div>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 shadow-2xs flex items-center justify-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-[#DBEAFE] text-[#2563EB] inline-flex items-center justify-center text-[10px]">
                        ⛁
                      </span>
                      <span className="text-[10px] font-bold text-[#202326] truncate">
                        Lưu dữ liệu
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-[21px] font-extrabold text-[#202326] mb-1">
                    <Link
                      href="/services/cong-cu-tu-dong-hoa"
                      className="hover:underline"
                    >
                      Công cụ tự động hoá
                    </Link>
                  </h3>
                  <p className="text-[13.5px] text-[#5B6068] m-0">
                    Dịch vụ tự động hoá (automation) tác vụ, quy trình và vận hành nội bộ.
                  </p>
                </div>

                <Link
                  href="/services/cong-cu-tu-dong-hoa"
                  aria-label="Xem giải pháp Công cụ tự động hoá"
                  className="w-10 h-10 rounded-full bg-[#FFC62A] hover:bg-[#F0B900] text-[#202326] inline-flex items-center justify-center font-bold text-[16px] shrink-0 transition-transform hover:translate-x-0.5 shadow-2xs"
                >
                  →
                </Link>
              </div>
            </article>

            {/* CARD 2: Web & App theo yêu cầu */}
            <article className="bg-[#FFFFFF] rounded-[20px] p-5 border border-[#ECEEF2] shadow-[0_10px_30px_rgba(20,23,28,0.03)] flex flex-col justify-between hover:border-[#202326]/30 transition-all">
              {/* Illustration 2: Quản lý công việc Web App UI */}
              <div
                className="h-[215px] rounded-[14px] bg-[#FFFFFF] border border-[#ECEEF2] overflow-hidden flex shadow-2xs"
                aria-hidden="true"
              >
                {/* Dark left sidebar */}
                <div className="w-11 bg-[#202326] p-2 flex flex-col items-center gap-2 pt-3 shrink-0">
                  <span className="w-5 h-5 rounded-full bg-[#FFC62A] text-[#202326] font-extrabold text-[9px] inline-flex items-center justify-center mb-1">
                    S
                  </span>
                  <span className="w-6 h-1.5 rounded-full bg-[#FFC62A]" />
                  <span className="w-6 h-1.5 rounded-full bg-white/20" />
                  <span className="w-6 h-1.5 rounded-full bg-white/20" />
                  <span className="w-6 h-1.5 rounded-full bg-white/20" />
                </div>

                {/* Main task management table */}
                <div className="flex-1 p-3 bg-[#FAFAFB] flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[12.5px] font-extrabold text-[#202326]">
                        Quản lý công việc
                      </span>
                      <span className="bg-[#FFC62A] text-[#202326] text-[9.5px] font-bold px-2 py-0.5 rounded-md">
                        + Tạo mới
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2 text-[9px]">
                      <span className="bg-[#FFF3C4] border border-[#FFC62A] text-[#202326] font-bold px-2 py-0.5 rounded">
                        Tất cả
                      </span>
                      <span className="bg-white border border-[#E5E7EB] text-[#5B6068] px-2 py-0.5 rounded">
                        Đang xử lý
                      </span>
                      <span className="bg-white border border-[#E5E7EB] text-[#5B6068] px-2 py-0.5 rounded">
                        Hoàn thành
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#ECEEF2] rounded-lg p-1.5 space-y-1 text-[9px]">
                    <div className="grid grid-cols-12 text-[8px] font-bold text-[#9CA3AF] border-b border-[#F3F4F6] pb-1">
                      <span className="col-span-5">Tên công việc</span>
                      <span className="col-span-3">Trạng thái</span>
                      <span className="col-span-4 text-right whitespace-nowrap">
                        Người phụ trách
                      </span>
                    </div>

                    {[
                      {
                        task: "Xử lý đơn hàng",
                        status: "Đang chạy",
                        badgeClass: "bg-[#EFF6FF] text-[#2563EB]",
                        dotClass: "bg-[#2563EB]",
                        avatarBg: "bg-[#FDE68A]",
                      },
                      {
                        task: "Đồng bộ dữ liệu",
                        status: "Hoàn thành",
                        badgeClass: "bg-[#ECFDF3] text-[#217A48]",
                        dotClass: "bg-[#217A48]",
                        avatarBg: "bg-[#BFDBFE]",
                      },
                      {
                        task: "Gửi email chăm sóc",
                        status: "Đang chạy",
                        badgeClass: "bg-[#EFF6FF] text-[#2563EB]",
                        dotClass: "bg-[#2563EB]",
                        avatarBg: "bg-[#FECACA]",
                      },
                      {
                        task: "Tổng hợp báo cáo",
                        status: "Chờ xử lý",
                        badgeClass: "bg-[#F3F4F6] text-[#5B6068]",
                        dotClass: "bg-[#9CA3AF]",
                        avatarBg: "bg-[#E5E7EB]",
                      },
                    ].map((row) => (
                      <div
                        key={row.task}
                        className="grid grid-cols-12 items-center py-0.5 border-b border-[#F9FAFB] last:border-0"
                      >
                        <span className="col-span-5 font-semibold text-[#202326] truncate pr-1">
                          {row.task}
                        </span>
                        <span className="col-span-4">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${row.badgeClass}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${row.dotClass}`}
                            />
                            {row.status}
                          </span>
                        </span>
                        <span className="col-span-3 flex items-center justify-end gap-1.5">
                          <span
                            className={`w-3.5 h-3.5 rounded-full ${row.avatarBg} border border-white inline-block`}
                          />
                          <span className="text-[#9CA3AF] text-[8px]">•••</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-[21px] font-extrabold text-[#202326] mb-1">
                    <Link
                      href="/services/thiet-ke-web-app-theo-yeu-cau"
                      className="hover:underline"
                    >
                      Web &amp; App theo yêu cầu
                    </Link>
                  </h3>
                  <p className="text-[13.5px] text-[#5B6068] m-0">
                    Xây web app, hệ thống quản lý theo quy trình riêng.
                  </p>
                </div>

                <Link
                  href="/services/thiet-ke-web-app-theo-yeu-cau"
                  aria-label="Xem giải pháp Web & App theo yêu cầu"
                  className="w-10 h-10 rounded-full bg-[#FFC62A] hover:bg-[#F0B900] text-[#202326] inline-flex items-center justify-center font-bold text-[16px] shrink-0 transition-transform hover:translate-x-0.5 shadow-2xs"
                >
                  →
                </Link>
              </div>
            </article>

            {/* CARD 3: API, Bot & Tích hợp */}
            <article className="bg-[#FFFFFF] rounded-[20px] p-5 border border-[#ECEEF2] shadow-[0_10px_30px_rgba(20,23,28,0.03)] flex flex-col justify-between hover:border-[#202326]/30 transition-all">
              {/* Illustration 3: 8-Node Hub & Spoke Diagram */}
              <div
                className="h-[215px] rounded-[14px] bg-[#FFFFFF] border border-[#ECEEF2] st-studio-dots p-3 relative flex items-center justify-between overflow-hidden shadow-2xs"
                aria-hidden="true"
              >
                {/* Dashed connecting lines SVG behind */}
                <svg
                  viewBox="0 0 300 180"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  fill="none"
                >
                  <path
                    d="M 88 26 L 150 90 M 88 68 L 150 90 M 88 112 L 150 90 M 88 154 L 150 90"
                    stroke="#CBD5E1"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 212 26 L 150 90 M 212 68 L 150 90 M 212 112 L 150 90 M 212 154 L 150 90"
                    stroke="#CBD5E1"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                  />
                </svg>

                {/* Left 4 Integration Nodes */}
                <div className="space-y-2 z-10 w-[114px]">
                  {[
                    {
                      name: "Google Sheets",
                      bg: "bg-[#217A48]",
                      icon: "⊞",
                    },
                    { name: "Notion", bg: "bg-[#202326]", icon: "N" },
                    { name: "Airtable", bg: "bg-[#F59E0B]", icon: "▲" },
                    { name: "Slack", bg: "bg-[#7C3AED]", icon: "#" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="bg-white border border-[#E5E7EB] rounded-lg px-2 py-1 shadow-2xs flex items-center gap-1.5"
                    >
                      <span
                        className={`w-4 h-4 rounded text-[8.5px] font-extrabold text-white inline-flex items-center justify-center shrink-0 ${item.bg}`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-[9.5px] font-bold text-[#202326] whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Center Yellow Cube Hub */}
                <div className="z-10 w-13 h-13 rounded-2xl bg-[#FFC62A] border-2 border-white shadow-[0_8px_20px_rgba(255,198,42,0.45)] flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-[#202326]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>

                {/* Right 4 Integration Nodes */}
                <div className="space-y-2 z-10 w-[96px]">
                  {[
                    { name: "CRM", bg: "bg-[#2563EB]", icon: "⚙" },
                    { name: "Email", bg: "bg-[#3B82F6]", icon: "✉" },
                    { name: "API", bg: "bg-[#6366F1]", icon: "◈" },
                    { name: "Webhook", bg: "bg-[#202326]", icon: "❖" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="bg-white border border-[#E5E7EB] rounded-lg px-2 py-1 shadow-2xs flex items-center gap-1.5"
                    >
                      <span
                        className={`w-4 h-4 rounded text-[8.5px] font-extrabold text-white inline-flex items-center justify-center shrink-0 ${item.bg}`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-[9.5px] font-bold text-[#202326] truncate">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-[21px] font-extrabold text-[#202326] mb-1">
                    <Link
                      href="/services/tich-hop-api-bot-he-thong"
                      className="hover:underline"
                    >
                      API, Bot &amp; Tích hợp
                    </Link>
                  </h3>
                  <p className="text-[13.5px] text-[#5B6068] m-0">
                    Kết nối hệ thống, xử lý dữ liệu, xây bot theo nhu cầu.
                  </p>
                </div>

                <Link
                  href="/services/tich-hop-api-bot-he-thong"
                  aria-label="Xem giải pháp API, Bot & Tích hợp"
                  className="w-10 h-10 rounded-full bg-[#FFC62A] hover:bg-[#F0B900] text-[#202326] inline-flex items-center justify-center font-bold text-[16px] shrink-0 transition-transform hover:translate-x-0.5 shadow-2xs"
                >
                  →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: 02 / TỪ BÀI TOÁN ĐẾN HỆ THỐNG — Xây để dùng. Làm để chạy.
      ===================================================================== */}
      <section
        id="du-an"
        className="py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#ECEEF2] scroll-mt-20"
      >
        <div className="st-container">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                  aria-hidden="true"
                />
                <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#5B6068]">
                  02 / TỪ BÀI TOÁN ĐẾN HỆ THỐNG
                </span>
              </div>
              <h2 className="font-extrabold text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.08] tracking-[-0.03em] text-[#202326] m-0">
                Xây để dùng.
                <br />
                Làm để chạy.
              </h2>
            </div>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#202326] border-b-[1.5px] border-[#202326] pb-1 hover:text-[#5B6068] hover:border-[#5B6068] transition-colors self-start sm:self-end"
            >
              <span>Khám phá cách triển khai</span>
              <span className="text-[#FFC62A] font-extrabold" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          {/* 2 Large Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* LEFT CARD (7 cols): Hệ thống quản lý & vận hành */}
            <article className="lg:col-span-7 bg-[#F8F9FB] border border-[#ECEEF2] rounded-[22px] p-4 sm:p-5 shadow-[0_14px_36px_rgba(20,23,28,0.04)] flex flex-col justify-between">
              {/* Browser Window Mockup */}
              <div
                onClick={() => setActiveProjectModal(PROJECT_CONCEPTS[0])}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-xs cursor-pointer hover:border-[#202326]/30 transition-colors"
              >
                {/* Browser Top Dots */}
                <div className="px-3.5 py-2 bg-[#FAFAFB] border-b border-[#ECEEF2] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FDBA74]" />
                  <span className="w-2 h-2 rounded-full bg-[#FDE047]" />
                  <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                </div>

                {/* App Layout: Dark Left Sidebar + Right Main Area */}
                <div className="grid grid-cols-12">
                  {/* Dark Sidebar */}
                  <div className="col-span-12 sm:col-span-3 bg-[#202326] text-white p-3 flex sm:flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                        <span className="w-5 h-5 rounded-full bg-[#FFC62A] text-[#202326] font-extrabold text-[10px] inline-flex items-center justify-center">
                          S
                        </span>
                        <span className="text-[12px] font-extrabold tracking-tight">
                          Sèo Trum
                        </span>
                      </div>

                      <div className="flex sm:flex-col gap-1 overflow-x-auto text-[10.5px]">
                        <div className="bg-[#FFC62A] text-[#202326] font-bold rounded-lg px-2.5 py-1.5 flex items-center gap-2 shrink-0">
                          <span>⌂</span>
                          <span>Tổng quan</span>
                        </div>
                        <div className="text-white/75 px-2.5 py-1.5 flex items-center gap-2 shrink-0">
                          <span>▤</span>
                          <span>Đơn hàng</span>
                        </div>
                        <div className="text-white/75 px-2.5 py-1.5 flex items-center gap-2 shrink-0">
                          <span>☺</span>
                          <span>Khách hàng</span>
                        </div>
                        <div className="text-white/75 px-2.5 py-1.5 flex items-center gap-2 shrink-0">
                          <span>◫</span>
                          <span>Sản phẩm</span>
                        </div>
                        <div className="text-white/75 px-2.5 py-1.5 flex items-center gap-2 shrink-0">
                          <span>lll</span>
                          <span>Báo cáo</span>
                        </div>
                        <div className="text-white/75 px-2.5 py-1.5 flex items-center gap-2 shrink-0">
                          <span>⚙</span>
                          <span>Thiết lập</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Dashboard Content */}
                  <div className="col-span-12 sm:col-span-9 p-3.5 bg-[#FAFAFB] space-y-3">
                    {/* Top Search + Button */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-[10px] text-[#9CA3AF] flex items-center gap-1.5">
                        <span>🔍</span>
                        <span className="truncate">
                          Tìm kiếm đơn hàng, khách hàng...
                        </span>
                      </div>
                      <span className="bg-[#FFC62A] text-[#202326] font-bold text-[10px] px-2.5 py-1.5 rounded-lg shrink-0">
                        + Tạo đơn hàng
                      </span>
                    </div>

                    {/* 4 Metric Boxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        {
                          title: "Đơn hàng",
                          sub: "Đang xử lý",
                          icon: "▤",
                          tint: "bg-[#EFF6FF] text-[#2563EB]",
                        },
                        {
                          title: "Khách hàng",
                          sub: "Tổng",
                          icon: "☺",
                          tint: "bg-[#EEF2FF] text-[#4F46E5]",
                        },
                        {
                          title: "Doanh thu",
                          sub: "Tháng này",
                          icon: "◈",
                          tint: "bg-[#ECFDF3] text-[#217A48]",
                        },
                        {
                          title: "Tác vụ",
                          sub: "Đang chạy",
                          icon: "⚡",
                          tint: "bg-[#FFF3C4] text-[#D97706]",
                        },
                      ].map((kpi) => (
                        <div
                          key={kpi.title}
                          className="bg-white border border-[#ECEEF2] rounded-xl p-2"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`w-5 h-5 rounded-md text-[9px] font-bold inline-flex items-center justify-center ${kpi.tint}`}
                            >
                              {kpi.icon}
                            </span>
                            <div className="leading-none">
                              <span className="text-[9.5px] font-bold text-[#202326] block">
                                {kpi.title}
                              </span>
                              <span className="text-[8px] text-[#9CA3AF]">
                                {kpi.sub}
                              </span>
                            </div>
                          </div>
                          <div className="text-[12px] font-extrabold text-[#202326] pl-0.5">
                            —
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Table */}
                    <div className="bg-white border border-[#ECEEF2] rounded-xl p-2.5">
                      <div className="text-[11px] font-extrabold text-[#202326] mb-2">
                        Danh sách đơn hàng
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 text-[9px]">
                        <div className="flex items-center gap-1">
                          <span className="bg-[#FFF3C4] border border-[#FFC62A] text-[#202326] font-bold px-2 py-0.5 rounded">
                            Tất cả
                          </span>
                          <span className="bg-[#FAFAFB] border border-[#E5E7EB] text-[#5B6068] px-2 py-0.5 rounded">
                            Đang xử lý
                          </span>
                          <span className="bg-[#FAFAFB] border border-[#E5E7EB] text-[#5B6068] px-2 py-0.5 rounded">
                            Hoàn thành
                          </span>
                          <span className="bg-[#FAFAFB] border border-[#E5E7EB] text-[#5B6068] px-2 py-0.5 rounded">
                            Đã huỷ
                          </span>
                        </div>
                        <span className="bg-[#FAFAFB] border border-[#E5E7EB] text-[#9CA3AF] px-2 py-0.5 rounded">
                          🔍 Tìm kiếm...
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[9.5px]">
                        <div className="grid grid-cols-12 text-[8.5px] font-bold text-[#9CA3AF] border-b border-[#F3F4F6] pb-1">
                          <span className="col-span-2">#</span>
                          <span className="col-span-3">Khách hàng</span>
                          <span className="col-span-3">Sản phẩm / Dịch vụ</span>
                          <span className="col-span-2">Trạng thái</span>
                          <span className="col-span-2 text-right">
                            Ngày tạo
                          </span>
                        </div>

                        {[
                          {
                            id: "#1001",
                            client: "Nguyễn Văn A",
                            service: "Website doanh nghiệp",
                            status: "Đang xử lý",
                            badge: "bg-[#FFF3C4] text-[#B45309]",
                            dot: "bg-[#F59E0B]",
                            date: "12/06/2024",
                          },
                          {
                            id: "#1002",
                            client: "Trần Thị B",
                            service: "Tích hợp hệ thống",
                            status: "Hoàn thành",
                            badge: "bg-[#ECFDF3] text-[#217A48]",
                            dot: "bg-[#217A48]",
                            date: "11/06/2024",
                          },
                          {
                            id: "#1003",
                            client: "Lê Minh C",
                            service: "Công cụ báo cáo",
                            status: "Đang xử lý",
                            badge: "bg-[#FFF3C4] text-[#B45309]",
                            dot: "bg-[#F59E0B]",
                            date: "10/06/2024",
                          },
                        ].map((row) => (
                          <div
                            key={row.id}
                            className="grid grid-cols-12 items-center py-0.5 border-b border-[#F9FAFB] last:border-0"
                          >
                            <span className="col-span-2 font-bold text-[#202326]">
                              {row.id}
                            </span>
                            <span className="col-span-3 font-medium text-[#202326] truncate pr-1">
                              {row.client}
                            </span>
                            <span className="col-span-3 text-[#5B6068] truncate pr-1">
                              {row.service}
                            </span>
                            <span className="col-span-2">
                              <span
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${row.badge}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${row.dot}`}
                                />
                                {row.status}
                              </span>
                            </span>
                            <span className="col-span-2 text-right text-[#5B6068]">
                              {row.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Bottom Caption Row */}
              <div className="pt-4 px-1 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-[20px] font-extrabold text-[#202326] mb-1.5">
                    <Link
                      href={`/case-studies/${PROJECT_CONCEPTS[0].slug}`}
                      className="hover:underline"
                    >
                      {PROJECT_CONCEPTS[0].title}
                    </Link>
                  </h3>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#ECEEF2] text-[#5B6068]">
                    {PROJECT_CONCEPTS[0].tag}
                  </span>
                </div>
                <span className="text-[12px] text-[#5B6068]">
                  Giao diện dự án minh hoạ
                </span>
              </div>
            </article>

            {/* RIGHT CARD (5 cols): Công cụ xử lý & đồng bộ dữ liệu */}
            <article className="lg:col-span-5 bg-[#F8F9FB] border border-[#ECEEF2] rounded-[22px] p-4 sm:p-5 shadow-[0_14px_36px_rgba(20,23,28,0.04)] flex flex-col justify-between">
              {/* Data Sync App Window */}
              <div
                onClick={() => setActiveProjectModal(PROJECT_CONCEPTS[1])}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-xs cursor-pointer hover:border-[#202326]/30 transition-colors"
              >
                {/* Top App Bar */}
                <div className="px-3.5 py-2.5 bg-white border-b border-[#ECEEF2] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#202326] text-[#FFC62A] font-extrabold text-[11px] inline-flex items-center justify-center">
                      S
                    </span>
                    <span className="text-[12.5px] font-extrabold text-[#202326]">
                      Xử lý dữ liệu
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">↻</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-[#5B6068] bg-[#F6F7F8] border border-[#E5E7EB] rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#217A48]" />
                      Đang hoạt động
                    </span>
                    <span className="bg-[#FFC62A] text-[#202326] font-bold text-[10px] px-2.5 py-1 rounded-lg">
                      Chạy ngay
                    </span>
                  </div>
                </div>

                {/* 3-Column Body */}
                <div className="grid grid-cols-12 min-h-[268px]">
                  {/* Col 1: Left Mini Nav */}
                  <div className="col-span-3 border-r border-[#ECEEF2] p-2.5 space-y-2 text-[9.5px] bg-[#FAFAFB]">
                    <div className="font-bold text-[#202326] flex items-center gap-1.5 bg-[#FFF3C4]/70 px-1.5 py-1 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      <span className="truncate">Nguồn dữ liệu</span>
                    </div>
                    <div className="text-[#5B6068] flex items-center gap-1.5 px-1.5 py-1">
                      <span>›</span>
                      <span>Xử lý</span>
                    </div>
                    <div className="text-[#5B6068] flex items-center gap-1.5 px-1.5 py-1">
                      <span>⚙</span>
                      <span>Đồng bộ</span>
                    </div>
                    <div className="text-[#5B6068] flex items-center gap-1.5 px-1.5 py-1">
                      <span>🕒</span>
                      <span>Lịch sử</span>
                    </div>
                  </div>

                  {/* Col 2: Center Luồng xử lý dữ liệu */}
                  <div className="col-span-5 border-r border-[#ECEEF2] p-3 bg-white">
                    <div className="text-[10.5px] font-extrabold text-[#202326] mb-2.5">
                      Luồng xử lý dữ liệu
                    </div>

                    <div className="space-y-2.5 relative">
                      {[
                        {
                          num: "1",
                          title: "Nhận dữ liệu từ API",
                          sub: "Đã hoàn thành",
                          circle: "bg-[#217A48] text-white",
                          dot: "bg-[#217A48]",
                          active: false,
                        },
                        {
                          num: "2",
                          title: "Làm sạch & chuyển đổi",
                          sub: "Đã hoàn thành",
                          circle: "bg-[#217A48] text-white",
                          dot: "bg-[#217A48]",
                          active: false,
                        },
                        {
                          num: "3",
                          title: "Đồng bộ sang hệ thống",
                          sub: "Đang chạy",
                          circle: "bg-[#FFC62A] text-[#202326]",
                          dot: "bg-[#F59E0B]",
                          active: true,
                        },
                        {
                          num: "4",
                          title: "Gửi thông báo",
                          sub: "Chờ xử lý",
                          circle: "bg-[#E5E7EB] text-[#5B6068]",
                          dot: "bg-[#9CA3AF]",
                          active: false,
                        },
                      ].map((st) => (
                        <div
                          key={st.num}
                          className={`flex items-start gap-2 rounded-lg p-1.5 ${
                            st.active
                              ? "bg-[#FFFCF1] border border-[#FFC62A]"
                              : ""
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full text-[9.5px] font-extrabold inline-flex items-center justify-center shrink-0 mt-0.5 ${st.circle}`}
                          >
                            {st.num}
                          </span>
                          <div className="leading-tight min-w-0">
                            <div className="text-[9.5px] font-bold text-[#202326] truncate">
                              {st.title}
                            </div>
                            <div className="inline-flex items-center gap-1 text-[8.5px] text-[#5B6068]">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
                              />
                              <span>{st.sub}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Right Kết quả xử lý */}
                  <div className="col-span-4 p-2.5 bg-[#FAFAFB]">
                    <div className="text-[10.5px] font-extrabold text-[#202326] mb-2">
                      Kết quả xử lý
                    </div>

                    <div className="grid grid-cols-2 gap-0.5 bg-[#ECEEF2] p-0.5 rounded-md text-[7.5px] font-bold text-center mb-2">
                      <span className="bg-white text-[#202326] rounded py-0.5 whitespace-nowrap">
                        Dữ liệu đầu vào
                      </span>
                      <span className="text-[#5B6068] py-0.5 whitespace-nowrap">
                        Dữ liệu đầu ra
                      </span>
                    </div>

                    <div className="bg-white border border-[#ECEEF2] rounded-lg p-1.5 space-y-1.5 text-[8.5px]">
                      <div className="flex justify-between text-[#9CA3AF] font-bold border-b border-[#F3F4F6] pb-1">
                        <span>ID</span>
                        <span>Trạng thái</span>
                      </div>
                      {[
                        {
                          id: "#001",
                          label: "Thành công",
                          dot: "bg-[#217A48]",
                          text: "text-[#217A48]",
                        },
                        {
                          id: "#002",
                          label: "Thành công",
                          dot: "bg-[#217A48]",
                          text: "text-[#217A48]",
                        },
                        {
                          id: "#003",
                          label: "Thành công",
                          dot: "bg-[#217A48]",
                          text: "text-[#217A48]",
                        },
                        {
                          id: "#004",
                          label: "Đang xử lý",
                          dot: "bg-[#2563EB]",
                          text: "text-[#2563EB]",
                        },
                        {
                          id: "#005",
                          label: "Chờ xử lý",
                          dot: "bg-[#9CA3AF]",
                          text: "text-[#5B6068]",
                        },
                      ].map((r) => (
                        <div
                          key={r.id}
                          className="flex items-center justify-between py-0.5 border-b border-[#F9FAFB] last:border-0"
                        >
                          <span className="font-bold text-[#202326]">
                            {r.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${r.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${r.dot}`}
                            />
                            {r.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Bottom Caption Row */}
              <div className="pt-4 px-1 flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-[18.5px] xl:text-[19.5px] font-extrabold text-[#202326] mb-1.5 tracking-tight">
                    <Link
                      href={`/case-studies/${PROJECT_CONCEPTS[1].slug}`}
                      className="hover:underline"
                    >
                      {PROJECT_CONCEPTS[1].title}
                    </Link>
                  </h3>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#ECEEF2] text-[#5B6068]">
                    {PROJECT_CONCEPTS[1].tag}
                  </span>
                </div>
                <span className="text-[12px] text-[#5B6068] shrink-0">
                  Giao diện dự án minh hoạ
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: FOUNDER-LED / HANDS-ON & CHIA SẺ TỪ VIỆC THẬT
      ===================================================================== */}
      <section className="py-14 lg:py-20 bg-[#F8F9FA] border-b border-[#ECEEF2]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center lg:divide-x lg:divide-[#E5E7EB]">
            {/* Left Block: Founder (#ve-seo-trum) (7 cols) */}
            <div
              id="ve-seo-trum"
              className="lg:col-span-7 lg:pr-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 scroll-mt-24"
            >
              {/* Large Mascot directly on surface */}
              <div className="shrink-0 -mb-2 select-none">
                <Image
                  src="/images/brand-mascot.png"
                  alt="Sèo Trum — Người hiểu bài toán, người trực tiếp xây"
                  width={240}
                  height={246}
                  loading="eager"
                  className="w-[180px] sm:w-[215px] lg:w-[235px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(20,23,28,0.08)]"
                />
              </div>

              {/* Founder Copy */}
              <div className="pb-2">
                <div className="inline-flex items-center gap-2 mb-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#5B6068]">
                    FOUNDER-LED / HANDS-ON
                  </span>
                </div>

                <h2 className="font-extrabold text-[30px] sm:text-[36px] lg:text-[38px] leading-[1.12] tracking-[-0.03em] text-[#202326] mb-3">
                  Người hiểu bài toán.
                  <br />
                  Người trực tiếp xây.
                </h2>

                <p className="text-[15.5px] leading-[1.6] text-[#5B6068] max-w-[390px] mb-5">
                  Sèo Trum là thương hiệu cá nhân và studio nơi tôi xây phần mềm
                  tự động hoá, từ ý tưởng đến vận hành.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#202326] border-b-[1.5px] border-[#202326] pb-0.5 hover:text-[#5B6068] hover:border-[#5B6068] transition-colors"
                >
                  <span>Về Sèo Trum</span>
                  <span
                    className="text-[#FFC62A] font-extrabold"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Block: Chia sẻ từ việc thật (#goc-chia-se) (5 cols) */}
            <div
              id="goc-chia-se"
              className="lg:col-span-5 lg:pl-10 scroll-mt-24"
            >
              <h2 className="font-extrabold text-[28px] sm:text-[32px] leading-[1.15] tracking-[-0.028em] text-[#202326] mb-6">
                Chia sẻ từ việc thật.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:divide-x sm:divide-[#E5E7EB]">
                {/* Sub-col 1: Tự động hoá */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-[19px] font-extrabold text-[#202326] mb-1.5">
                      Tự động hoá
                    </h3>
                    <p className="text-[14px] leading-[1.55] text-[#5B6068] mb-4">
                      Quy trình, tích hợp và công cụ thực chiến.
                    </p>
                  </div>

                  {/* Yellow Connected Node Line Graph */}
                  <div className="my-2 h-[56px] flex items-center" aria-hidden="true">
                    <svg viewBox="0 0 180 54" className="w-full max-w-[165px] h-auto" fill="none">
                      <path
                        d="M 16 38 L 52 22 L 88 36 L 126 16 L 160 12"
                        stroke="#F5B800"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="16" cy="38" r="5" fill="#FFFFFF" stroke="#F5B800" strokeWidth="2.5" />
                      <circle cx="52" cy="22" r="5" fill="#FFFFFF" stroke="#F5B800" strokeWidth="2.5" />
                      <circle cx="88" cy="36" r="5" fill="#FFFFFF" stroke="#F5B800" strokeWidth="2.5" />
                      <circle cx="126" cy="16" r="5" fill="#FFFFFF" stroke="#F5B800" strokeWidth="2.5" />
                      <circle cx="160" cy="12" r="5" fill="#FFFFFF" stroke="#F5B800" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/categories/he-thong-tu-dong-hoa"
                      className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-[#202326] border-b-[1.5px] border-[#202326] pb-0.5 hover:text-[#5B6068] hover:border-[#5B6068] transition-colors"
                    >
                      <span>Khám phá</span>
                      <span
                        className="text-[#FFC62A] font-extrabold"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Sub-col 2: SEO */}
                <div className="sm:pl-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[19px] font-extrabold text-[#202326] mb-1.5">
                      SEO
                    </h3>
                    <p className="text-[14px] leading-[1.55] text-[#5B6068] mb-4">
                      Góc nhìn về tìm kiếm, kỹ thuật và tăng trưởng.
                    </p>
                  </div>

                  {/* Yellow Bar Chart + Magnifying Glass */}
                  <div className="my-2 h-[56px] flex items-center justify-end sm:justify-start" aria-hidden="true">
                    <svg viewBox="0 0 180 56" className="w-full max-w-[165px] h-auto" fill="none">
                      {/* 4 ascending bars */}
                      <rect x="28" y="38" width="8" height="10" rx="1.5" fill="#FFC62A" />
                      <rect x="42" y="30" width="8" height="18" rx="1.5" fill="#FFC62A" />
                      <rect x="56" y="20" width="8" height="28" rx="1.5" fill="#FFC62A" />
                      <rect x="70" y="10" width="8" height="38" rx="1.5" fill="#FFC62A" />
                      {/* Magnifying glass */}
                      <circle cx="114" cy="24" r="14" stroke="#F5B800" strokeWidth="3.2" fill="#FFFFFF" />
                      <line x1="125" y1="34" x2="138" y2="47" stroke="#F5B800" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-[#202326] border-b-[1.5px] border-[#202326] pb-0.5 hover:text-[#5B6068] hover:border-[#5B6068] transition-colors"
                    >
                      <span>Đọc góc chia sẻ</span>
                      <span
                        className="text-[#FFC62A] font-extrabold"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FULL-WIDTH YELLOW CONSULTATION CTA + FORM (#tu-van)
      ===================================================================== */}
      <section
        id="tu-van"
        ref={formSectionRef}
        className="py-12 lg:py-16 bg-[#FFC62A] relative overflow-hidden scroll-mt-20"
      >
        <div className="st-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Side: Heading + Subtitle + Mascot on Yellow Band (6 cols) */}
            <div className="lg:col-span-6 relative min-h-[300px] flex flex-col justify-between">
              <div className="z-10">
                <h2 className="font-extrabold text-[34px] sm:text-[42px] xl:text-[44px] leading-[1.12] tracking-[-0.03em] text-[#202326] mb-5">
                  <span className="sm:whitespace-nowrap">Bạn đang làm tay</span>
                  <br />
                  <span className="relative inline-block sm:whitespace-nowrap">
                    việc gì mỗi ngày?
                    <span
                      className="absolute left-0 right-0 -bottom-1 h-[8px] bg-[#FFF5CC] rounded-full -z-10"
                      aria-hidden="true"
                    />
                  </span>
                </h2>

                <p className="text-[16px] sm:text-[16.5px] font-medium text-[#202326] leading-relaxed max-w-[340px] m-0">
                  Kể tôi nghe. Ta cùng tìm cách tự động hoá.
                </p>
              </div>

              {/* Curved arrow + Large Mascot sitting directly on the yellow band */}
              <div className="relative lg:absolute lg:right-2 lg:-bottom-6 flex items-end justify-end shrink-0 mt-4 lg:mt-0 select-none pointer-events-none">
                {/* Hand-drawn curved arrow pointing toward mascot */}
                <svg
                  viewBox="0 0 60 44"
                  className="hidden sm:block w-12 h-9 text-[#202326] mb-20 -mr-1"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 4 28 C 18 10, 36 10, 50 22"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 43 23 L 51 23 L 49 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <Image
                  src="/images/brand-mascot.png"
                  alt="Linh vật Sèo Trum sẵn sàng lắng nghe bài toán của bạn"
                  width={230}
                  height={236}
                  loading="eager"
                  className="w-[175px] sm:w-[205px] lg:w-[225px] h-auto object-contain drop-shadow-[0_14px_28px_rgba(20,23,28,0.14)]"
                />
              </div>
            </div>

            {/* Right Side: White Form Card (6 cols) */}
            <div className="lg:col-span-6">
              <form
                onSubmit={validateConsultationForm}
                noValidate
                className="bg-[#FFFFFF] rounded-[20px] p-6 sm:p-7 border border-[#202326]/10 shadow-[0_20px_50px_rgba(20,23,28,0.12)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Field 1: Họ và tên */}
                  <div>
                    <label
                      htmlFor="st-fullname"
                      className="block text-[13px] font-bold text-[#202326] mb-1.5"
                    >
                      Họ và tên <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="st-fullname"
                      name="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (formErrors.fullName) {
                          setFormErrors((prev) => ({
                            ...prev,
                            fullName: undefined,
                          }));
                        }
                      }}
                      placeholder="Nguyễn Văn A"
                      aria-invalid={Boolean(formErrors.fullName)}
                      className={`w-full rounded-[10px] px-3.5 py-2.5 text-[14px] text-[#202326] placeholder:text-[#9CA3AF] bg-[#FFFFFF] border transition-colors ${
                        formErrors.fullName
                          ? "border-[#B42318] bg-[#B42318]/5"
                          : "border-[#E5E7EB] focus:border-[#202326]"
                      }`}
                    />
                    {formErrors.fullName && (
                      <p
                        role="alert"
                        className="text-[11.5px] font-semibold text-[#B42318] mt-1 m-0"
                      >
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Email / Số điện thoại */}
                  <div>
                    <label
                      htmlFor="st-contact"
                      className="block text-[13px] font-bold text-[#202326] mb-1.5"
                    >
                      Email / Số điện thoại{" "}
                      <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      ref={contactInputRef}
                      id="st-contact"
                      name="contactInfo"
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => {
                        setContactInfo(e.target.value);
                        if (formErrors.contactInfo) {
                          setFormErrors((prev) => ({
                            ...prev,
                            contactInfo: undefined,
                          }));
                        }
                      }}
                      placeholder="email@cuaban.com"
                      aria-invalid={Boolean(formErrors.contactInfo)}
                      className={`w-full rounded-[10px] px-3.5 py-2.5 text-[14px] text-[#202326] placeholder:text-[#9CA3AF] bg-[#FFFFFF] border transition-colors ${
                        formErrors.contactInfo
                          ? "border-[#B42318] bg-[#B42318]/5"
                          : "border-[#E5E7EB] focus:border-[#202326]"
                      }`}
                    />
                    {formErrors.contactInfo && (
                      <p
                        role="alert"
                        className="text-[11.5px] font-semibold text-[#B42318] mt-1 m-0"
                      >
                        {formErrors.contactInfo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Field 3: Bạn cần giải pháp gì? */}
                <div className="mb-4">
                  <label
                    htmlFor="st-solution"
                    className="block text-[13px] font-bold text-[#202326] mb-1.5"
                  >
                    Bạn cần giải pháp gì?{" "}
                    <span className="text-[#B42318]">*</span>
                  </label>
                  <select
                    ref={solutionSelectRef}
                    id="st-solution"
                    name="solutionNeed"
                    value={solutionNeed}
                    onChange={(e) => {
                      setSolutionNeed(e.target.value);
                      if (formErrors.solutionNeed) {
                        setFormErrors((prev) => ({
                          ...prev,
                          solutionNeed: undefined,
                        }));
                      }
                    }}
                    aria-invalid={Boolean(formErrors.solutionNeed)}
                    className={`w-full rounded-[10px] px-3.5 py-2.5 text-[14px] bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#202326] transition-colors ${
                      solutionNeed === "" ? "text-[#9CA3AF]" : "text-[#202326]"
                    }`}
                  >
                    <option value="">Chọn nhu cầu</option>
                    <option value="Tự động hoá">Tự động hoá</option>
                    <option value="Web & App">Web &amp; App</option>
                    <option value="API, Bot & Tích hợp">
                      API, Bot &amp; Tích hợp
                    </option>
                    <option value="SEO">SEO</option>
                    <option value="Chưa rõ, cần tư vấn">
                      Chưa rõ, cần tư vấn
                    </option>
                  </select>
                  {formErrors.solutionNeed && (
                    <p
                      role="alert"
                      className="text-[11.5px] font-semibold text-[#B42318] mt-1 m-0"
                    >
                      {formErrors.solutionNeed}
                    </p>
                  )}
                </div>

                {/* Field 4: Mô tả bài toán của bạn */}
                <div className="mb-5">
                  <label
                    htmlFor="st-problem"
                    className="block text-[13px] font-bold text-[#202326] mb-1.5"
                  >
                    Mô tả bài toán của bạn{" "}
                    <span className="text-[#B42318]">*</span>
                  </label>
                  <textarea
                    ref={descTextareaRef}
                    id="st-problem"
                    name="problemDesc"
                    rows={3}
                    required
                    value={problemDesc}
                    onChange={(e) => {
                      setProblemDesc(e.target.value);
                      if (formErrors.problemDesc) {
                        setFormErrors((prev) => ({
                          ...prev,
                          problemDesc: undefined,
                        }));
                      }
                    }}
                    placeholder="Hãy chia sẻ ngắn gọn về công việc, hệ thống hoặc ý tưởng của bạn..."
                    aria-invalid={Boolean(formErrors.problemDesc)}
                    className={`w-full rounded-[10px] px-3.5 py-2.5 text-[14px] text-[#202326] placeholder:text-[#9CA3AF] bg-[#FFFFFF] border transition-colors ${
                      formErrors.problemDesc
                        ? "border-[#B42318] bg-[#B42318]/5"
                        : "border-[#E5E7EB] focus:border-[#202326]"
                    }`}
                  />
                  {formErrors.problemDesc && (
                    <p
                      role="alert"
                      className="text-[11.5px] font-semibold text-[#B42318] mt-1 m-0"
                    >
                      {formErrors.problemDesc}
                    </p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14.5px] font-bold rounded-[10px] px-5 py-3 hover:bg-[#141618] transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Gửi yêu cầu tư vấn</span>
                    <span
                      className="text-[#FFC62A] font-extrabold"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </button>

                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#5B6068]">
                    <span aria-hidden="true">🔒</span>
                    <span>
                      Thông tin chỉ dùng để trao đổi về yêu cầu của bạn.
                    </span>
                  </span>
                </div>

                {previewValidated && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-4 rounded-[12px] bg-[#ECFDF3] border border-[#217A48] p-3.5 text-[#202326]"
                  >
                    <p className="text-[13.5px] font-bold text-[#217A48] m-0 mb-0.5">
                      ✓ Đã ghi nhận thông tin yêu cầu tư vấn.
                    </p>
                    <p className="text-[12.5px] text-[#5B6068] m-0">
                      Cảm ơn <strong className="text-[#202326]">{fullName.trim()}</strong>. Sèo Trum sẽ phản hồi qua{" "}
                      <strong className="text-[#202326]">{contactInfo.trim()}</strong>.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ACCESSIBLE PROJECT CONCEPT MODAL
      ===================================================================== */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#202326]/60 backdrop-blur-xs p-4"
          onClick={() => setActiveProjectModal(null)}
        >
          <div
            ref={modalDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] max-w-[660px] w-full p-6 sm:p-8 shadow-[0_24px_60px_rgba(20,23,28,0.18)] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11.5px] font-extrabold tracking-wide px-2.5 py-1 rounded-full bg-[#FFC62A] text-[#202326]">
                    Giao diện dự án minh hoạ
                  </span>
                  <span className="text-[11px] font-bold text-[#5B6068] bg-[#F6F7F8] border border-[#E5E7EB] rounded-full px-2.5 py-1">
                    {activeProjectModal.tag}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-[22px] font-extrabold text-[#202326]"
                >
                  {activeProjectModal.title}
                </h3>
              </div>

              <button
                ref={modalCloseBtnRef}
                type="button"
                aria-label="Đóng cửa sổ mô hình"
                onClick={() => setActiveProjectModal(null)}
                className="w-9 h-9 rounded-lg border border-[#E5E7EB] bg-[#F6F7F8] text-[#202326] font-bold hover:bg-[#E5E7EB] flex items-center justify-center shrink-0"
              >
                ✕
              </button>
            </div>

            <p className="text-[15px] text-[#5B6068] leading-relaxed mb-6">
              {activeProjectModal.description}
            </p>

            <div className="space-y-3 mb-6">
              {activeProjectModal.architectureSteps.map((stepObj) => (
                <div
                  key={stepObj.step}
                  className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-xl p-4 flex items-start gap-3.5"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#202326] text-[#FFC62A] text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {stepObj.step}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#202326] mb-1">
                      {stepObj.title}
                    </h4>
                    <p className="text-[13.5px] text-[#5B6068] m-0">
                      {stepObj.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
              <Link
                href={`/case-studies/${activeProjectModal.slug}`}
                className="text-[13.5px] font-bold text-[#202326] hover:underline"
              >
                Mở trang chi tiết mô hình này ↗
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 rounded-[10px] border border-[#E5E7EB] text-[14px] font-semibold text-[#5B6068] hover:text-[#202326] hover:bg-[#F6F7F8]"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const opt = activeProjectModal.formOption;
                    setActiveProjectModal(null);
                    prefillAndScrollToForm(opt);
                  }}
                  className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14px] font-bold rounded-[10px] px-4 py-2 hover:bg-[#141618]"
                >
                  <span>Trao đổi mô hình tương tự</span>
                  <span className="text-[#FFC62A]" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
