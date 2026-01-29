import React from 'react'
import { MapPin,Truck,Menu,X } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Header({setIsAddressOpen, setIsCartOpen, setIsMenuOpen, isMenuOpen , cart}) {
  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-23">
            {/* Logo */}
            <div className="shrink flex items-center gap-3">
              <div className="w-12 h-12 md:w-17 md:h-17 bg-linear-to-br m-2 from-amber-500 to-orange-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
                <img src={logo} />

              </div>
              <span className="font-serif text-2xl md:text-5xl font-bold text-white tracking-wide">
                Om Arts

              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="m-10 flex items-baseline space-x-8 text-xl ">
                <a href="#" className="text-amber-500 font-medium px-3 py-2 rounded-md  transition-colors">Home</a>
                <a href="#collection" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">Collection</a>
                <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">About Us</a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddressOpen(true)}
                className="hidden md:flex text-gray-300 hover:text-amber-400 transition-colors items-center gap-1 text-sm font-medium"
              >
                <MapPin size={20} /> Address
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors bg-slate-800 rounded-full hover:bg-slate-700 flex gap-2 items-center"
              >
                <Truck size={20} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0  items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cart.reduce((acc, item) => acc + item.id, 0)}
                  </span>
                )}
                <span className=' md:block'>Orders</span>
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-amber-500 block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#collection" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Collection</a>
              <a href="#" onClick={() => setIsAddressOpen(true)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Our Address</a>
              <a href="#" onClick={() => setIsCartOpen(true)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">View Orders</a>
            </div>
          </div>
        )}
      </nav>
  )
}
