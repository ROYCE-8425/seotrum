"use client";

import menu from "@/config/menu.json";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  const { main }: { main: INavigationLink[] } = menu;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const timer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = (restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => {
        triggerRef.current?.focus();
      }, 20);
    }
  };

  return (
    <header
      id="top"
      className={`sticky top-0 z-40 h-[72px] lg:h-[82px] bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#ECEEF2] transition-shadow duration-200 ${
        scrolled ? "shadow-[0_4px_20px_rgba(20,23,28,0.05)]" : ""
      }`}
    >
      <div className="st-container h-full flex items-center justify-between gap-4">
        {/* Left: brand-logo.png */}
        <Link
          href="/"
          aria-label="Sèo Trum — Trang chủ"
          className="inline-flex items-center shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-[#202326]"
        >
          <Image
            src="/images/brand-logo.png"
            alt="Sèo Trum"
            width={168}
            height={62}
            priority
            className="w-[140px] lg:w-[164px] h-auto object-contain"
          />
        </Link>

        {/* Center Nav (Desktop) */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-9"
        >
          {main.map((item) => {
            const href = item.url.startsWith("#") ? `/${item.url}` : item.url;
            return (
              <Link
                key={item.name}
                href={href}
                className="text-[15px] font-medium text-[#202326] hover:text-[#202326] relative py-1.5 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#FFC62A] after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA (Desktop) + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/#tu-van"
            className="hidden lg:inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[14.5px] font-semibold rounded-[11px] px-[20px] py-[11px] hover:bg-[#141618] transition-colors shadow-2xs"
          >
            <span>Trao đổi bài toán</span>
            <span className="text-[#FFC62A] text-[15px] leading-none font-bold" aria-hidden="true">
              ↗
            </span>
          </Link>

          <button
            ref={triggerRef}
            type="button"
            aria-label={
              mobileOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#202326] hover:bg-[#F6F7F8] transition-colors"
          >
            {mobileOpen ? (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng di động"
          className="lg:hidden fixed inset-x-0 top-[72px] bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-[0_14px_34px_rgba(20,23,28,0.08)] z-50"
        >
          <div className="st-container py-5 flex flex-col gap-2">
            {main.map((item, idx) => {
              const href = item.url.startsWith("#") ? `/${item.url}` : item.url;
              return (
                <Link
                  key={item.name}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={href}
                  onClick={() => closeMobileMenu(false)}
                  className="px-3 py-2.5 rounded-[10px] text-[16px] font-semibold text-[#202326] hover:bg-[#F6F7F8] transition-colors"
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-2 mt-1 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
              <Link
                href="/#tu-van"
                onClick={() => closeMobileMenu(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#202326] text-[#FFFFFF] text-[15px] font-bold rounded-[10px] px-[18px] py-[12px]"
              >
                <span>Trao đổi bài toán</span>
                <span className="text-[#FFC62A]" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <button
                type="button"
                onClick={() => closeMobileMenu(true)}
                className="px-4 py-[11px] rounded-[10px] border border-[#E5E7EB] text-[14px] font-semibold text-[#5B6068] hover:text-[#202326] hover:bg-[#F6F7F8]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
