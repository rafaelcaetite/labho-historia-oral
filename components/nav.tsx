"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavProps {
  siteName?: string;
}

export function Nav({ siteName = "Laboratório de História Oral" }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Fecha o menu móvel ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/laboratorio" },
    { label: "Acervo", href: "/acervo" },
    { label: "Eventos", href: "/eventos" },
    { label: "Contato", href: "/contato", isMobileOnly: true },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className={`nav ${isOpen ? "is-open" : ""}`} id="nav">
      <button
        className="nav__toggle"
        aria-expanded={isOpen}
        aria-controls="menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Fechar" : "Menu"}
      </button>

      <nav id="menu" className="nav__menu" aria-label="Principal">
        <ul className="nav__list">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={`${isActive(item.href) ? "is-active" : ""} ${
                item.isMobileOnly ? "is-contato" : ""
              }`}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        className="nav__wm"
        href="/"
        aria-label={`${siteName} — início`}
      >
        {siteName}
      </Link>

      <div className="nav__end">
        <Link className="nav__cta" href="/contato">
          Contato{" "}
          <svg width="7" height="11" viewBox="0 0 7 11" aria-hidden="true">
            <path
              d="M1 1l4.5 4.5L1 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
