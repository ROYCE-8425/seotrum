"use client";

import config from "@/config/config.json";
import { SERVICE_CATALOG } from "@/lib/seoTrumCatalog";
import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

type SimulationState =
  | "idle"
  | "receiving"
  | "processing"
  | "syncing"
  | "complete";

type DataSourceKey = "form" | "sheet" | "webhook";

const DATA_SOURCES: Record<
  DataSourceKey,
  {
    label: string;
    sampleRecord: string;
    ruleApplied: string;
    syncTarget: string;
  }
> = {
  form: {
    label: "Biểu mẫu",
    sampleRecord: "REQ-001 • Yêu cầu tư vấn & xử lý đơn mẫu",
    ruleApplied: "Kiểm tra SĐT/Email hợp lệ & phân nhóm dịch vụ",
    syncTarget: "Tạo bản ghi trên Dashboard & báo tin vào nhóm điều phối",
  },
  sheet: {
    label: "Bảng tính",
    sampleRecord: "REQ-001 • Dòng dữ liệu bảng tính cần chuẩn hoá",
    ruleApplied: "Loại bỏ khoảng trắng thừa, lọc trùng mã & chuẩn hoá trường",
    syncTarget: "Cập nhật sang cơ sở dữ liệu & đánh dấu trạng thái Đã đồng bộ",
  },
  webhook: {
    label: "Webhook",
    sampleRecord: "REQ-001 • Sự kiện JSON gửi từ nền tảng bên thứ ba",
    ruleApplied: "Xác thực chữ ký sự kiện & ánh xạ (mapping) cấu trúc JSON",
    syncTarget: "Đẩy qua REST API đích & ghi nhật ký đối soát",
  },
};

export default function AutomationStudioPage() {
  const [simState, setSimState] = useState<SimulationState>("idle");
  const [selectedSource, setSelectedSource] = useState<DataSourceKey>("form");
  const [history, setHistory] = useState<
    { id: number; source: string; status: string }[]
  >([]);

  // Workload calculator state (honest arithmetic based on user's own inputs)
  const [tasksPerDay, setTasksPerDay] = useState<number>(25);
  const [minutesPerTask, setMinutesPerTask] = useState<number>(6);
  const [workDaysPerMonth, setWorkDaysPerMonth] = useState<number>(22);

  const runCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const handleRunFlow = () => {
    if (
      simState === "receiving" ||
      simState === "processing" ||
      simState === "syncing"
    ) {
      return;
    }
    clearTimer();
    const srcLabel = DATA_SOURCES[selectedSource].label;
    setSimState("receiving");
    timerRef.current = window.setTimeout(() => {
      setSimState("processing");
      timerRef.current = window.setTimeout(() => {
        setSimState("syncing");
        timerRef.current = window.setTimeout(() => {
          setSimState("complete");
          runCountRef.current += 1;
          const nextId = runCountRef.current;
          setHistory((prev) =>
            [
              {
                id: nextId,
                source: srcLabel,
                status: "3/3 bước hoàn tất",
              },
              ...prev,
            ].slice(0, 4),
          );
        }, 850);
      }, 850);
    }, 850);
  };

  const stepProgressCount =
    simState === "idle"
      ? 0
      : simState === "receiving"
        ? 1
        : simState === "processing"
          ? 2
          : 3;

  const isRunning =
    simState === "receiving" ||
    simState === "processing" ||
    simState === "syncing";

  // Arithmetic calculation from user's selected sliders
  const totalMinutesPerMonth = tasksPerDay * minutesPerTask * workDaysPerMonth;
  const totalHoursPerMonth = Math.round((totalMinutesPerMonth / 60) * 10) / 10;

  const baseUrl = config.site.base_url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${baseUrl}/automation-studio#app`,
    name: "Sèo Trum Automation Studio — Mô phỏng luồng tự động hoá",
    description:
      "Trình mô phỏng luồng tự động hoá 3 bước (Nhận dữ liệu → Xử lý quy tắc → Đồng bộ hệ thống) và công cụ tính khối lượng thao tác thủ công hàng tháng.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    url: `${baseUrl}/automation-studio`,
    author: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Automation Studio — Mô phỏng luồng phần mềm tự động hoá | Sèo Trum"
        meta_title="Automation Studio — Mô phỏng luồng phần mềm tự động hoá | Sèo Trum"
        description="Chạy thử luồng tự động hoá 3 bước (Nhận dữ liệu, Xử lý theo quy tắc, Đồng bộ hệ thống) và ước tính khối lượng thao tác lặp lại mỗi tháng cùng Sèo Trum."
        canonical={`${baseUrl}/automation-studio`}
        jsonLd={jsonLd}
      />

      {/* Hero + Interactive Simulator */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-[#E5E7EB]">
        <div className="st-container">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-[#5B6068]"
          >
            <Link href="/" className="hover:text-[#202326]">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#202326] font-semibold">
              Automation Studio (Mô phỏng luồng tự động)
            </span>
          </nav>

          <div className="max-w-[760px] mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
                aria-hidden="true"
              />
              <span className="st-eyebrow text-[#5B6068]">
                SÈO TRUM / AUTOMATION STUDIO
              </span>
            </div>

            <h1 className="st-h1 text-[#202326] mb-4">
              Xem cách{" "}
              <span className="relative inline-block pb-1">
                phần mềm
                <span
                  className="st-yellow-bar absolute left-0 right-0 -bottom-0.5 h-[8px] bg-[#FFC62A] rounded-full"
                  aria-hidden="true"
                />
              </span>{" "}
              xử lý việc lặp lại.
            </h1>

            <p className="text-[17px] lg:text-[18px] leading-[1.6] text-[#5B6068] m-0">
              Chọn nguồn dữ liệu đầu vào và nhấn{" "}
              <strong className="text-[#202326]">
                &ldquo;Chạy thử luồng&rdquo;
              </strong>{" "}
              để quan sát cách một bản ghi mẫu (`REQ-001`) đi qua 3 bước tự động
              hoá tiêu chuẩn.
            </p>
          </div>

          {/* Interactive Studio Window */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[22px] shadow-[0_18px_50px_rgba(20,23,28,0.06)] overflow-hidden">
            <div className="px-5 py-4 bg-[#F6F7F8] border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#202326]/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#202326]" />
                </div>
                <span className="text-[14px] font-bold text-[#202326]">
                  Sèo Trum / Automation Studio (Mô phỏng quy trình — dữ liệu mẫu)
                </span>
              </div>

              <button
                type="button"
                onClick={handleRunFlow}
                disabled={isRunning}
                className={`inline-flex items-center gap-2 text-[14px] font-bold rounded-[10px] px-4 py-2.5 transition-all ${
                  isRunning
                    ? "bg-[#FFFFFF] text-[#5B6068] border border-[#E5E7EB] cursor-not-allowed"
                    : "bg-[#FFC62A] text-[#202326] hover:bg-[#F0B900] border border-[#202326]/15 st-btn-lift"
                }`}
              >
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#202326] text-[#FFC62A] text-[10px]"
                  aria-hidden="true"
                >
                  ▶
                </span>
                <span>
                  {isRunning
                    ? "Đang mô phỏng luồng..."
                    : simState === "complete"
                      ? "Chạy lại luồng"
                      : "Chạy thử luồng"}
                </span>
              </button>
            </div>

            <div className="st-tech-grid p-6 sm:p-8">
              {/* Source Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[14px] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-bold text-[#202326] mr-2">
                    Chọn nguồn dữ liệu mẫu:
                  </span>
                  {(Object.keys(DATA_SOURCES) as DataSourceKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSource(key)}
                      className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold border transition-colors ${
                        selectedSource === key
                          ? "bg-[#202326] text-[#FFFFFF] border-[#202326]"
                          : "bg-[#F6F7F8] text-[#202326] border-[#E5E7EB] hover:bg-[#E5E7EB]"
                      }`}
                    >
                      {DATA_SOURCES[key].label}
                    </button>
                  ))}
                </div>
                <span className="text-[12.5px] font-bold px-3 py-1 rounded-full bg-[#FFFCF1] border border-[#FFC62A] text-[#202326]">
                  Bản ghi mẫu: REQ-001
                </span>
              </div>

              {/* 3 Workflow Nodes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                <div
                  className={`rounded-[16px] p-5 border ${
                    simState === "receiving"
                      ? "bg-[#FFFCF1] border-[#FFC62A] ring-2 ring-[#FFC62A]/50"
                      : "bg-[#FFFFFF] border-[#E5E7EB]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11.5px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#F6F7F8] border border-[#E5E7EB] text-[#5B6068]">
                      Bước 01 • Input
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#FFC62A] text-[#202326] text-xs font-extrabold flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold text-[#202326] mb-2">
                    Nhận dữ liệu ({DATA_SOURCES[selectedSource].label})
                  </h2>
                  <p className="text-[13.5px] text-[#5B6068] m-0">
                    {DATA_SOURCES[selectedSource].sampleRecord}
                  </p>
                </div>

                <div
                  className={`rounded-[16px] p-5 border ${
                    simState === "processing"
                      ? "bg-[#FFFCF1] border-[#FFC62A] ring-2 ring-[#FFC62A]/50"
                      : "bg-[#FFFFFF] border-[#E5E7EB]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11.5px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#F6F7F8] border border-[#E5E7EB] text-[#5B6068]">
                      Bước 02 • Rule Engine
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#FFC62A] text-[#202326] text-xs font-extrabold flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold text-[#202326] mb-2">
                    Xử lý theo quy tắc
                  </h2>
                  <p className="text-[13.5px] text-[#5B6068] m-0">
                    {DATA_SOURCES[selectedSource].ruleApplied}
                  </p>
                </div>

                <div
                  className={`rounded-[16px] p-5 border ${
                    simState === "syncing" || simState === "complete"
                      ? "bg-[#FFFCF1] border-[#FFC62A] ring-2 ring-[#FFC62A]/50"
                      : "bg-[#FFFFFF] border-[#E5E7EB]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11.5px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#F6F7F8] border border-[#E5E7EB] text-[#5B6068]">
                      Bước 03 • Output Sync
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#217A48] text-[#FFFFFF] text-xs font-extrabold flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold text-[#202326] mb-2">
                    Đồng bộ hệ thống
                  </h2>
                  <p className="text-[13.5px] text-[#5B6068] m-0">
                    {DATA_SOURCES[selectedSource].syncTarget}
                  </p>
                </div>
              </div>

              {/* Progress & Session Log */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className="bg-[#202326] text-[#FFFFFF] rounded-[16px] p-5"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold uppercase text-[#FFFFFF]/75">
                      Tiến trình mô phỏng
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326] text-[12px] font-extrabold">
                      {stepProgressCount}/3 bước
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#FFFFFF]/15 overflow-hidden mb-2">
                    <div
                      className="h-full bg-[#FFC62A] transition-all duration-300"
                      style={{ width: `${(stepProgressCount / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-[13px] text-[#FFFFFF]/85">
                    {simState === "idle"
                      ? "Sẵn sàng chạy mô phỏng dữ liệu mẫu"
                      : simState === "complete"
                        ? "Đã hoàn tất mô phỏng 3/3 bước"
                        : "Đang thực thi luồng mô phỏng..."}
                  </span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5">
                  <span className="text-[12px] font-bold uppercase text-[#5B6068] block mb-2">
                    Lịch sử mô phỏng trong phiên
                  </span>
                  {history.length === 0 ? (
                    <p className="text-[13.5px] text-[#5B6068] m-0">
                      Chưa có lượt chạy trong phiên này. Nhấn &ldquo;Chạy thử
                      luồng&rdquo; ở góc trên để kiểm thử.
                    </p>
                  ) : (
                    <ul className="space-y-1.5 m-0 p-0 list-none">
                      {history.map((h) => (
                        <li
                          key={h.id}
                          className="text-[13px] flex items-center justify-between bg-[#F6F7F8] border border-[#E5E7EB] rounded-lg px-3 py-1.5"
                        >
                          <span className="font-semibold text-[#202326]">
                            Lượt #{h.id} • Nguồn: {h.source}
                          </span>
                          <span className="font-bold text-[#217A48]">
                            {h.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Manual Workload Calculator */}
      <section className="st-section border-b border-[#E5E7EB]">
        <div className="st-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="st-eyebrow text-[#5B6068] block mb-2">
                ƯỚC TÍNH KHỐI LƯỢNG THAO TÁC LẶP LẠI
              </span>
              <h2 className="st-h2 text-[#202326] mb-3">
                Mỗi tháng đội ngũ đang dành bao nhiêu giờ cho việc lặp lại?
              </h2>
              <p className="text-[15.5px] text-[#5B6068] leading-relaxed mb-6">
                Điều chỉnh 3 thông số bên dưới theo thực tế công việc của bạn để
                tính tổng số giờ thao tác thủ công mỗi tháng.
              </p>

              <div className="space-y-5 bg-[#F6F7F8] border border-[#E5E7EB] rounded-[18px] p-6">
                <div>
                  <div className="flex justify-between text-[14px] font-bold text-[#202326] mb-1.5">
                    <label htmlFor="calc-tasks">
                      Số lần thực hiện tác vụ lặp mỗi ngày:
                    </label>
                    <span>{tasksPerDay} lần/ngày</span>
                  </div>
                  <input
                    id="calc-tasks"
                    type="range"
                    min={5}
                    max={200}
                    step={5}
                    value={tasksPerDay}
                    onChange={(e) => setTasksPerDay(Number(e.target.value))}
                    className="w-full accent-[#202326]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[14px] font-bold text-[#202326] mb-1.5">
                    <label htmlFor="calc-minutes">
                      Thời gian làm tay trung bình mỗi lần:
                    </label>
                    <span>{minutesPerTask} phút/lần</span>
                  </div>
                  <input
                    id="calc-minutes"
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={minutesPerTask}
                    onChange={(e) => setMinutesPerTask(Number(e.target.value))}
                    className="w-full accent-[#202326]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[14px] font-bold text-[#202326] mb-1.5">
                    <label htmlFor="calc-days">
                      Số ngày làm việc trong tháng:
                    </label>
                    <span>{workDaysPerMonth} ngày/tháng</span>
                  </div>
                  <input
                    id="calc-days"
                    type="range"
                    min={15}
                    max={30}
                    step={1}
                    value={workDaysPerMonth}
                    onChange={(e) =>
                      setWorkDaysPerMonth(Number(e.target.value))
                    }
                    className="w-full accent-[#202326]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#FFFCF1] border border-[#FFC62A] rounded-[22px] p-6 sm:p-8">
                <span className="inline-block text-[12px] font-extrabold px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326] mb-4">
                  Kết quả tính toán theo thông số bạn chọn
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4">
                    <span className="text-[12.5px] font-semibold text-[#5B6068] block mb-1">
                      Tổng thời gian thao tác tay / tháng
                    </span>
                    <span className="text-[28px] font-extrabold text-[#202326]">
                      {totalHoursPerMonth} giờ
                    </span>
                    <span className="text-[12px] text-[#5B6068] block mt-0.5">
                      ({totalMinutesPerMonth.toLocaleString("vi-VN")} phút /
                      tháng)
                    </span>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4">
                    <span className="text-[12.5px] font-semibold text-[#5B6068] block mb-1">
                      Tổng số lượt thao tác lặp / tháng
                    </span>
                    <span className="text-[28px] font-extrabold text-[#202326]">
                      {(tasksPerDay * workDaysPerMonth).toLocaleString("vi-VN")}{" "}
                      lượt
                    </span>
                    <span className="text-[12px] text-[#5B6068] block mt-0.5">
                      Có thể chuyển sang luồng tự động
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4 mb-6">
                  <Image
                    src="/images/brand-mascot.png"
                    alt="Linh vật Sèo Trum"
                    width={64}
                    height={66}
                    loading="eager"
                    className="w-[56px] h-auto object-contain shrink-0"
                  />
                  <p className="text-[13.5px] text-[#202326] m-0 leading-snug">
                    Khi khối lượng lặp lại vượt quá{" "}
                    <strong>20–30 giờ/tháng</strong>, việc viết một công cụ tự
                    động hoá riêng thường giúp hoàn vốn thời gian rất nhanh.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-6 py-3.5 st-btn-lift"
                >
                  <span>Gửi bài toán này cho Sèo Trum</span>
                  <span className="text-[#FFC62A]" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links to 4 Dedicated Solution Pages */}
      <section className="st-section">
        <div className="st-container">
          <h2 className="st-h3 text-[#202326] mb-6">
            Chọn trang giải pháp chuyên biệt theo nhu cầu của bạn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_CATALOG.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-5 st-card-hover block"
              >
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded bg-[#FFC62A] text-[#202326] inline-block mb-2.5">
                  {svc.code}
                </span>
                <h3 className="text-[16.5px] font-bold text-[#202326] mb-2">
                  {svc.shortTitle}
                </h3>
                <p className="text-[13.5px] text-[#5B6068] mb-3">
                  {svc.heroSummary.slice(0, 95)}...
                </p>
                <span className="text-[13.5px] font-bold text-[#202326]">
                  Xem trang riêng →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
