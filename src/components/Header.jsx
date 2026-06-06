import { useEffect, useState } from 'react'
import { MapPin, Truck, Menu, X, Sun, Moon } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
// import logo from '../assets/logo.png'
import newlogo from '../assets/newlogo.svg'


export default function Header({ setIsAddressOpen, setIsCartOpen, setIsMenuOpen, isMenuOpen, cart }) {
  const location = useLocation();
  const [darkTheme, setDarkTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true; // default dark theme
  });

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/#collection", hash: "#collection" },
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  const isLinkActive = (link) => {
    if (link.hash) {
      return location.pathname === "/" && location.hash === link.hash;
    }
    return location.pathname === link.to && !location.hash;
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMobileAddressClick = (event) => {
    event.preventDefault();
    setIsAddressOpen(true);
    closeMobileMenu();
  };

  const handleMobileCartClick = (event) => {
    event.preventDefault();
    setIsCartOpen(true);
    closeMobileMenu();
  };

  const handleCollectionClick = () => {
    closeMobileMenu();
    window.setTimeout(() => {
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  return (
    <nav className="fixed top-0 w-full z-40 bg-orange-50/90 backdrop-blur-md border-b border-orange-200/50 dark:bg-slate-950/80 dark:border-white/5 transition-transform duration-300">
      <div className="w-full mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20 md:h-23">
          {/* Logo */}
          <Link to="/" onClick={closeMobileMenu} className="min-w-0 flex items-center gap-2 sm:gap-3">
            <div className="shrink-0 w-11 h-11 sm:w-13 sm:h-13 lg:w-16 lg:h-16">
              <img src={newlogo} alt='Ganpati logo' className="w-full h-full object-contain" />
            </div>
            <span className="font-logo font-semibold text-[clamp(1.35rem,5vw,3rem)] leading-none text-slate-900 dark:text-white truncate">
              Om Arts
            </span>
          </Link>

          {/* Desktop Links */}

          <div className="hidden lg:flex h-13 items-center rounded-full px-2 backdrop-blur-xl bg-stone-300/10 border border-gray-500/50">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={link.hash ? handleCollectionClick : closeMobileMenu}
                  className={() => `relative px-4 xl:px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ease-out overflow-hidden whitespace-nowrap ${isLinkActive(link)
                    ? "text-black dark:text-amber-300 bg-linear-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : "text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                >
                  {isLinkActive(link) && (
                    <span className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-6">
            <button
              name='show address'
              onClick={() => setIsAddressOpen(true)}
              className="hidden xl:flex text-slate-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors items-center gap-1 text-sm font-medium"
            >
              <MapPin size={20} /> Address
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              name='check your orders'
              className="relative p-2 text-slate-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-white  bg-white shadow-sm border border-orange-200 dark:bg-slate-800 dark:border-none rounded-full dark:hover:bg-slate-700 flex gap-2 items-center"
            >
              <Truck size={18} />
              {cart.reduce((acc, item) => acc + item.qty, 0) > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 text-xs font-bold text-white bg-red-600 rounded-full flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
              <span className=' hidden  md:block'>Orders</span>
            </button>
            <button
              onClick={() => setDarkTheme(!darkTheme)}
              name='change theme'
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {darkTheme ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                name='toggle menubar'
                className="text-slate-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900 border-b border-orange-200 dark:border-slate-800 shadow-lg dark:shadow-none">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={link.hash ? handleCollectionClick : closeMobileMenu}
                className={() => `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isLinkActive(link)
                  ? "text-amber-600 dark:text-amber-500 bg-orange-50 dark:bg-slate-800"
                  : "text-slate-700 hover:text-amber-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800"
                  }`}
              >
                {link.label}
              </NavLink>
            ))}
            <a href="#" onClick={handleMobileAddressClick} className="text-slate-700 hover:text-amber-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">Our Address</a>
            <a href="#" onClick={handleMobileCartClick}
              className="text-slate-700 hover:text-amber-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors "
            >View Orders</a>
          </div>
        </div>
      )}


    </nav>

  )
}
