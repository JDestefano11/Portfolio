import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setShowSocials(currentScrollY < lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "projects", label: "Projects" },
    { to: "skills", label: "Skills" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          onClick={() => setIsOpen(false)}
        >
          <h1>Joe Destefano</h1>
        </ScrollLink>
      </div>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <ScrollLink
            key={link.to}
            to={link.to}
            smooth={true}
            duration={500}
            offset={-80}
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            {link.label}
          </ScrollLink>
        ))}
      </div>

      <div className={`nav-socials ${!showSocials ? "hidden" : ""}`}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaTwitter />
        </a>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? <IoClose size={28} /> : <HiMenu size={28} />}
      </button>
    </nav>
  );
};

export default Navbar;
