import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({
  title,
  eyebrow = "CHUYÊN TRANG KIẾN THỨC & HỆ THỐNG",
  subtitle,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}) => {
  return (
    <section className="pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-[#E5E7EB] bg-[#FFFFFF]">
      <div className="st-container">
        <Breadcrumbs className="mb-5" />
        <div className="bg-[#F6F7F8] border border-[#E5E7EB] rounded-[20px] p-6 sm:p-9">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#FFC62A]"
              aria-hidden="true"
            />
            <span className="st-eyebrow text-[#5B6068]">{eyebrow}</span>
          </div>
          <h1 className="st-h1 text-[#202326] m-0">{humanize(title)}</h1>
          {subtitle && (
            <p className="text-[16.5px] text-[#5B6068] leading-relaxed max-w-[64ch] mt-3 mb-0">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
