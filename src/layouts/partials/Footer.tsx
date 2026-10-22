"use client";

import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#ECEEF2]">
      <div className="st-container py-6 lg:py-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left: brand-logo.png + tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <Link
              href="/"
              aria-label="Sèo Trum — Trang chủ"
              className="inline-flex items-center shrink-0 rounded-lg"
            >
              <Image
                src="/images/brand-logo.png"
                alt="Sèo Trum"
                width={148}
                height={55}
                className="w-[132px] lg:w-[144px] h-auto object-contain"
              />
            </Link>
            <p className="text-[14px] font-medium text-[#5B6068] m-0">
              Phần mềm thông minh. Vận hành nhẹ hơn.
            </p>
          </div>

          {/* Center / Right links + yellow slider line accent + copyright */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
            <nav aria-label="Điều hướng chân trang">
              <ul className="flex flex-wrap items-center gap-6 sm:gap-7 m-0 p-0 list-none">
                {menu.footer.map((item) => {
                  const href = item.url.startsWith("#")
                    ? `/${item.url}`
                    : item.url;
                  return (
                    <li key={item.name}>
                      <Link
                        href={href}
                        className="text-[14px] font-medium text-[#202326] hover:text-[#5B6068] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-5">
              {/* Thin yellow line with yellow square knob on right */}
              <div
                className="hidden sm:flex items-center w-28 lg:w-36"
                aria-hidden="true"
              >
                <div className="h-[2px] flex-1 bg-[#FFC62A]/75 rounded-full" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#FFC62A] shrink-0" />
              </div>
              <p className="text-[13.5px] font-medium text-[#5B6068] m-0 whitespace-nowrap">
                {config.params.copyright || "© 2026 Sèo Trum"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
