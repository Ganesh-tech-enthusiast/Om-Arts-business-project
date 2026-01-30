import React, { useEffect, useState } from 'react'
import { MapPin, Truck, Menu, X, Sun, Moon, Lightbulb } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Header({ setIsAddressOpen, setIsCartOpen, setIsMenuOpen, isMenuOpen, cart }) {

  const [darkTheme, setDarkTheme] = useState(false);
  // to enable the dark theme to entire page we have to add the dark class on the root element in html

  useEffect(()=>{
    if (darkTheme)
    document.documentElement.classList.add("dark"); 
    else
    document.documentElement.classList.remove("dark");
    
  },[darkTheme])

  return (
    <nav className="fixed top-0 w-full z-40 bg-orange-50/90 backdrop-blur-md border-b border-orange-200/50 dark:bg-slate-950/80 dark:border-white/5 transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between h-20 md:h-23">
          {/* Logo */}
          <div className="shrink flex items-center gap-3">
            <div className="w-12 h-12 md:w-17 md:h-17 bg-linear-to-br m-2 from-amber-500 to-orange-600 dark:from-amber-500 dark:to-orange-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 dark:shadow-orange-500/30">
              <img src={logo} />

            </div>
            <span className="marathi-yatra  text-2xl md:text-5xl text-slate-900 dark:text-white">
               ओम कलाकेंद्र 

            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="m-10 flex items-baseline space-x-8 text-xl ">
              <a href="#" className="text-amber-600 dark:text-amber-500 font-medium px-3 py-2 rounded-md transition-colors">Home</a>
              <a href="#collection" className="text-slate-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md transition-colors">Collection</a>
              <a href="#about" className="text-slate-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md transition-colors">About Us</a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-10">
            <button
              onClick={() => setIsAddressOpen(true)}
              className="hidden md:flex  text-slate-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors items-center gap-1 text-sm font-medium"
            >
              <MapPin size={20} /> Address
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-white transition-colors bg-white shadow-sm border border-orange-200 dark:bg-slate-800 dark:border-none rounded-full dark:hover:bg-slate-700 flex gap-2 items-center"
            >
              <Truck size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cart.reduce((acc, item) => acc + item.id, 0)}
                </span>
              )}
              <span className=' hidden  md:block'>Orders</span>
            </button>
            <button
              onClick={() => setDarkTheme(!darkTheme)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-colors"
            >
              {darkTheme ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        <div className="md:hidden bg-white/95 dark:bg-slate-900 border-b border-orange-200 dark:border-slate-800 shadow-lg dark:shadow-none">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-amber-600 dark:text-amber-500 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#collection" className="text-slate-700 hover:text-amber-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">Collection</a>
            <a href="#" onClick={() => setIsAddressOpen(true)} className="text-slate-700 hover:text-amber-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">Our Address</a>
            <a href="#" onClick={() => setIsCartOpen(true)} className="text-slate-700 hover:text-amber-600 hover:bg-orange-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium transition-colors">View Orders</a>
          </div>
        </div>
      )}
    </nav>
  )
}
