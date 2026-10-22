"use client";

import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

type SolutionOption =
  | "Tự động hoá"
  | "Web & App"
  | "API, Bot & Tích hợp"
  | "SEO"
  | "Chưa rõ, cần tư vấn";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [solutionNeed, setSolutionNeed] =
    useState<SolutionOption>("Tự động hoá");
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

  const handleValidateSubmit = (e: React.FormEvent) => {
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

    const validOptions: SolutionOption[] = [
      "Tự động hoá",
      "Web & App",
      "API, Bot & Tích hợp",
      "SEO",
      "Chưa rõ, cần tư vấn",
    ];
    if (!validOptions.includes(solutionNeed)) {
      errors.solutionNeed = "Vui lòng chọn một nhóm giải pháp.";
    }

    const trimmedDesc = problemDesc.trim();
    if (trimmedDesc.length < 20 || trimmedDesc.length > 3000) {
      errors.problemDesc =
        "Vui lòng mô tả bài toán tối thiểu 20 ký tự (tối đa 3000 ký tự).";
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
  };

  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Trao đổi bài toán tự động hoá cùng Sèo Trum"
        meta_title="Trao đổi bài toán tự động hoá cùng Sèo Trum"
        description="Mô tả thao tác thủ công đang lặp lại mỗi ngày của bạn. Cùng Sèo Trum tìm hướng xây công cụ tự động hoá, web app hoặc tích hợp hệ thống gọn rõ."
      />

      <section className="py-10 lg:py-16">
        <div className="st-container">
          <div className="bg-[#FFC62A] rounded-[24px] p-6 sm:p-10 lg:p-12 border border-[#202326]/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (5 cols) */}
              <div className="lg:col-span-5 text-[#202326]">
                <span className="inline-block text-[12px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#202326] text-[#FFFFFF] mb-4">
                  TRAO ĐỔI BÀI TOÁN CÙNG SÈO TRUM
                </span>
                <h1 className="st-h2 text-[#202326] mb-3">
                  Bạn đang làm tay việc gì mỗi ngày?
                </h1>
                <p className="text-[18px] font-medium text-[#202326]/90 leading-relaxed mb-6">
                  Kể tôi nghe. Ta cùng tìm cách tự động hoá.
                </p>

                <div className="bg-[#FFFFFF]/90 border border-[#202326]/12 rounded-[16px] p-5 mb-5 flex items-center gap-4">
                  <Image
                    src="/images/brand-mascot.png"
                    alt="Linh vật Sèo Trum"
                    width={80}
                    height={82}
                    priority
                    className="w-[72px] h-auto object-contain shrink-0"
                  />
                  <div className="text-[14px] text-[#202326] leading-snug">
                    <strong className="block mb-1">
                      Không cần bản mô tả kỹ thuật phức tạp
                    </strong>
                    Chỉ cần ghi lại đầu vào dữ liệu, bước đang làm tay và kết
                    quả bạn mong muốn.
                  </div>
                </div>

                <div className="bg-[#FFFFFF]/75 border border-[#202326]/10 rounded-[16px] p-4 space-y-2 text-[13.5px] text-[#202326]">
                  <div className="font-bold">Gợi ý 3 thông tin giúp làm rõ nhanh:</div>
                  <div>1. Dữ liệu hiện đang nằm ở đâu (Biểu mẫu, Excel, CRM...)?</div>
                  <div>2. Bước nào đang tốn thời gian kiểm tra / nhập lại nhất?</div>
                  <div>3. Bạn muốn kết quả cuối tự động đẩy về đâu?</div>
                </div>
              </div>

              {/* Right Column: Form Card (7 cols) */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleValidateSubmit}
                  noValidate
                  className="bg-[#FFFFFF] rounded-[18px] p-6 sm:p-[28px] border border-[#202326]/12 shadow-[0_18px_50px_rgba(20,23,28,0.08)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="contact-fullname"
                        className="block text-[14px] font-bold text-[#202326] mb-1.5"
                      >
                        Họ và tên <span className="text-[#B42318]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-fullname"
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
                        placeholder="Ví dụ: Nguyễn Minh"
                        aria-invalid={Boolean(formErrors.fullName)}
                        aria-describedby={
                          formErrors.fullName ? "err-contact-name" : undefined
                        }
                        className={`w-full rounded-[10px] px-3.5 py-2.5 text-[15px] text-[#202326] bg-[#FFFFFF] border transition-colors ${
                          formErrors.fullName
                            ? "border-[#B42318] bg-[#B42318]/5"
                            : "border-[#E5E7EB] focus:border-[#202326]"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p
                          id="err-contact-name"
                          role="alert"
                          className="text-[12.5px] font-semibold text-[#B42318] mt-1.5 m-0"
                        >
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-info"
                        className="block text-[14px] font-bold text-[#202326] mb-1.5"
                      >
                        Email / Số điện thoại{" "}
                        <span className="text-[#B42318]">*</span>
                      </label>
                      <input
                        ref={contactInputRef}
                        id="contact-info"
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
                        placeholder="email@congty.vn hoặc 09xxxxxxxx"
                        aria-invalid={Boolean(formErrors.contactInfo)}
                        aria-describedby={
                          formErrors.contactInfo
                            ? "err-contact-info"
                            : undefined
                        }
                        className={`w-full rounded-[10px] px-3.5 py-2.5 text-[15px] text-[#202326] bg-[#FFFFFF] border transition-colors ${
                          formErrors.contactInfo
                            ? "border-[#B42318] bg-[#B42318]/5"
                            : "border-[#E5E7EB] focus:border-[#202326]"
                        }`}
                      />
                      {formErrors.contactInfo && (
                        <p
                          id="err-contact-info"
                          role="alert"
                          className="text-[12.5px] font-semibold text-[#B42318] mt-1.5 m-0"
                        >
                          {formErrors.contactInfo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="contact-solution"
                      className="block text-[14px] font-bold text-[#202326] mb-1.5"
                    >
                      Bạn cần giải pháp gì?{" "}
                      <span className="text-[#B42318]">*</span>
                    </label>
                    <select
                      ref={solutionSelectRef}
                      id="contact-solution"
                      name="solutionNeed"
                      value={solutionNeed}
                      onChange={(e) =>
                        setSolutionNeed(e.target.value as SolutionOption)
                      }
                      aria-invalid={Boolean(formErrors.solutionNeed)}
                      className="w-full rounded-[10px] px-3.5 py-2.5 text-[15px] text-[#202326] bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#202326] transition-colors"
                    >
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
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="contact-problem"
                      className="block text-[14px] font-bold text-[#202326] mb-1.5"
                    >
                      Mô tả bài toán <span className="text-[#B42318]">*</span>
                    </label>
                    <textarea
                      ref={descTextareaRef}
                      id="contact-problem"
                      name="problemDesc"
                      rows={4}
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
                      placeholder="Mô tả ngắn quy trình bạn đang làm tay (tối thiểu 20 ký tự)..."
                      aria-invalid={Boolean(formErrors.problemDesc)}
                      aria-describedby={
                        formErrors.problemDesc
                          ? "err-contact-problem"
                          : undefined
                      }
                      className={`w-full rounded-[10px] px-3.5 py-2.5 text-[15px] text-[#202326] bg-[#FFFFFF] border transition-colors ${
                        formErrors.problemDesc
                          ? "border-[#B42318] bg-[#B42318]/5"
                          : "border-[#E5E7EB] focus:border-[#202326]"
                      }`}
                    />
                    {formErrors.problemDesc && (
                      <p
                        id="err-contact-problem"
                        role="alert"
                        className="text-[12.5px] font-semibold text-[#B42318] mt-1.5 m-0"
                      >
                        {formErrors.problemDesc}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-6 py-3.5 st-btn-lift hover:bg-[#141618]"
                    >
                      <span>Kiểm tra yêu cầu (bản xem trước)</span>
                      <span className="text-[#FFC62A]" aria-hidden="true">
                        →
                      </span>
                    </button>

                    <span className="text-[12px] text-[#5B6068]">
                      Chế độ xem trước — kiểm tra tính hợp lệ của thông tin
                    </span>
                  </div>

                  {previewValidated && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="mt-4 rounded-[12px] bg-[#217A48]/10 border border-[#217A48] p-4 text-[#202326]"
                    >
                      <p className="text-[14px] font-bold text-[#217A48] m-0 mb-1">
                        ✓ Yêu cầu hợp lệ. Bản xem trước chưa gửi dữ liệu.
                      </p>
                      <p className="text-[13px] text-[#5B6068] m-0">
                        Tóm tắt đã kiểm tra:{" "}
                        <strong className="text-[#202326]">
                          {fullName.trim()}
                        </strong>{" "}
                        • Liên hệ:{" "}
                        <strong className="text-[#202326]">
                          {contactInfo.trim()}
                        </strong>{" "}
                        • Giải pháp:{" "}
                        <strong className="text-[#202326]">
                          {solutionNeed}
                        </strong>
                      </p>
                    </div>
                  )}
                </form>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13.5px] text-[#202326]">
                  <span>
                    Muốn thử nghiệm trực tiếp cách luồng tự động chạy 3 bước?
                  </span>
                  <Link
                    href="/#top"
                    className="font-bold underline hover:text-[#202326]/80"
                  >
                    Mở Automation Studio trên trang chủ →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
