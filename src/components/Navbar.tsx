"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent as ReactMouseEvent, useEffect, useState } from "react";

export default function Navbar() {
  const [activeMenuId, setActiveMenuId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveMenuId("");
      return;
    }

    const headerOffset = 80;
    const sections = Array.from(document.querySelectorAll("section[id], footer[id]"));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveMenuId(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: `-${headerOffset}px 0px -40% 0px`,
      threshold: 0.25
    });

    sections.forEach(s => observer.observe(s));
    
    const onScroll = () => {
      if (window.scrollY <= 100) {
        setActiveMenuId("");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      sections.forEach(s => observer.unobserve(s));
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (pathname !== "/") {
      router.push(`/${id ? `#${id}` : ""}`);
      return;
    }

    if (id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveMenuId("");
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveMenuId(id);
      }
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link href="/" draggable="false" onClick={(e) => handleNavClick(e as any, "")}>
          <Image src="/assets/img/logo1.png" alt="Logo Armorik Diagnostics" width={150} height={50} style={{ objectFit: 'contain' }} draggable="false" priority />
        </Link>
      </div>

      <div className={`burger-menu ${menuOpen ? "open" : ""}`} id="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`menu ${menuOpen ? "open" : ""}`} id="nav-menu" aria-label="Menu principal">
        <ul>
          <li><a href="/" className={activeMenuId === "" && pathname === "/" ? "active" : ""} onClick={(e) => handleNavClick(e, "")}>ACCUEIL</a></li>
          <li><a href="/#diagnostics" className={activeMenuId === "diagnostics" ? "active" : ""} onClick={(e) => handleNavClick(e, "diagnostics")}>NOS DIAGNOSTICS</a></li>
          <li><a href="/#devis" className={activeMenuId === "devis" ? "active" : ""} onClick={(e) => handleNavClick(e, "devis")}>DEVIS</a></li>
          <li><a href="/#service" className={activeMenuId === "service" ? "active" : ""} onClick={(e) => handleNavClick(e, "service")}>NOS SERVICES</a></li>
          <li><Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""} onClick={() => setMenuOpen(false)}>BLOG</Link></li>
          <li className="mobile-only"><a href="/#contact" className="btn-contact" onClick={(e) => handleNavClick(e, "contact")}>NOUS CONTACTER</a></li>
        </ul>
      </nav>

      <div className="right">
        <a href="/#contact" className="btn-contact" onClick={(e) => handleNavClick(e, "contact")}>NOUS CONTACTER</a>
      </div>
    </header>
  );
}
