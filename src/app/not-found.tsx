import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";

const NotFound = async () => {
  return (
    <div className="bg-[#FFFFFF] text-[#202326]">
      <SeoMeta
        title="Không tìm thấy trang (404) — Sèo Trum"
        meta_title="Không tìm thấy trang (404) — Sèo Trum"
        description="Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Quay lại trang chủ Sèo Trum để khám phá giải pháp phần mềm tự động hoá."
        noindex={true}
      />
      <section className="py-16 lg:py-24">
        <div className="st-container max-w-[680px] text-center">
          <div className="bg-[#FFFCF1] border border-[#E5E7EB] rounded-[24px] p-8 sm:p-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/brand-mascot.png"
                alt="Linh vật Sèo Trum"
                width={156}
                height={160}
                priority
                className="w-[140px] h-auto object-contain"
              />
            </div>

            <span className="inline-block text-[12px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFC62A] text-[#202326] mb-3">
              MÃ TRẠNG THÁI 404
            </span>

            <h1 className="st-h2 text-[#202326] mb-3">
              Không tìm thấy đường dẫn này.
            </h1>

            <p className="text-[16px] text-[#5B6068] leading-relaxed mb-8">
              Trang bạn vừa truy cập không tồn tại hoặc đã được chuyển về luồng
              chính của Sèo Trum.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[12px] px-6 py-3.5 st-btn-lift hover:bg-[#141618]"
              >
                <span>Về trang chủ Sèo Trum</span>
                <span className="text-[#FFC62A]" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#202326] border border-[#202326] text-[15px] font-bold rounded-[12px] px-5 py-3.5 st-btn-lift hover:bg-[#F6F7F8]"
              >
                <span>Xem giải pháp tự động hoá</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
