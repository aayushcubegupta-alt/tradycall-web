"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "./ui/Button";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Industries", href: "/industries", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && href !== "/#how-it-works" && pathname?.startsWith(href.split("#")[0]));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-base/95 backdrop-blur-md border-b border-white/10 shadow-lg py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Image
              src="/tradycall_logo_v2.png"
              alt="TradyCall Logo"
              width={180}
              height={54}
              priority
              className="h-10 sm:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 relative ${
                      active
                        ? "text-yellow-accent font-semibold"
                        : "text-slate-300 hover:text-yellow-accent"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {active && (
                      <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-yellow-accent rounded-full shadow-[0_0_8px_#facc15]" />
                    )}
                  </Link>
                  {link.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 mt-2 origin-top scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-navy-dark border border-white/10 rounded-lg p-2 shadow-xl">
                        {["Plumbing", "Electrical", "HVAC & Cooling", "Carpentry", "Roofing"].map((industry) => (
                          <Link
                            key={industry}
                            href={`/industries#${industry.toLowerCase().replace(/[^a-z]/g, "")}`}
                            className="block px-4 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-yellow-accent rounded-md"
                          >
                            {industry}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/demo">
              <Button variant="primary" size="sm" className="rounded-md flex items-center gap-2">
                <span className="text-[11px] font-black uppercase">Book a Demo</span>
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-accent"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full-screen overlay */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 top-[52px] sm:top-[64px] bg-navy-base/98 backdrop-blur-md border-t border-white/10 transition-all duration-300 ease-in-out z-40 h-[calc(100vh-52px)] sm:h-[calc(100vh-64px)] ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="px-4 pt-6 pb-20 space-y-1 overflow-y-auto h-full no-scrollbar">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <div key={link.name} className="space-y-1">
                <Link
                  href={link.href}
                  onClick={() => !link.hasDropdown && setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 text-base font-semibold rounded-xl transition-colors ${
                    active
                      ? "text-yellow-accent bg-white/5 font-bold"
                      : "text-slate-200 hover:text-yellow-accent hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 border-l-2 border-white/10 ml-4 space-y-0.5 pb-1">
                    {["Plumbing", "Electrical", "HVAC", "Carpentry", "Roofing"].map((industry) => (
                      <Link
                        key={industry}
                        href={`/industries#${industry.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2.5 text-sm text-slate-400 hover:text-yellow-accent rounded-lg hover:bg-white/5 transition-colors"
                      >
                        {industry}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile CTA */}
          <div className="pt-6 border-t border-white/10 mt-4 px-0">
            <Link href="/demo" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center text-sm font-black py-4">
                Book a Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
