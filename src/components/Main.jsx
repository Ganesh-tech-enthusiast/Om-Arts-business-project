import React, { useState } from 'react';
import logo from '../assets/logo.png'
import { Size1data, Size2data, Size3data, Size4data } from '../data/data';
import {
  Mail,
  MapPin,
  Phone,
  X,
  Truck,
  Plus,
  Minus,
  Menu,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import Sizebtn from './Sizebtn';
import Footer from './Footer';


const BUSINESS_ADDRESS = {
  shop: "ओम आर्ट्स - गणपती मूर्ती कार्यशाळा ",
  street: "सोनगाव रोड, कोल्हार भागवतीनगर तालुका:राहता , जिल्हा:अहिल्यानगर",
  city: "कोल्हार , महाराष्ट्र ",
  pin: "413710",
  phone: "+91 9822397846 , +91 8010072112",
  email: "ganeshwakchaure801@gmail.com"
};

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 border border-amber-600/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="p-8">
          {title && <h2 className="text-2xl font-bold text-amber-500 mb-4 font-serif">{title}</h2>}
          {children}
        </div>
      </motion.div>
    </div>
  );
};



const CartSidebar = ({ isOpen, onClose, cartItems, updateItemQty, removeItem }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-150  bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <h2 className="text-xl font-bold text-amber-500 font-serif flex items-center gap-2">
                < Truck size={38} /> Your Orders
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <Truck size={48} strokeWidth={1} />
                  <p>Your cart is empty. <br />Order some divine blessings!</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div
                    layout
                    key={item.id}
                    className="bg-slate-800/50 p-3 rounded-xl flex gap-4 border border-slate-700/50"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-amber-500 font-bold">₹{item.price} / unit</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-slate-800 rounded border border-slate-600">
                          <button
                            onClick={() => updateItemQty(item.id, item.qty - 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-mono text-white px-2">{item.qty}</span>
                          <button
                            onClick={() => updateItemQty(item.id, item.qty + 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-300 underline">Remove</button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end py-1">
                      <span className="text-white font-bold">₹{item.price * item.qty}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-5 bg-slate-900 border-t border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="text-2xl font-bold text-white">₹{total}</span>
                </div>
                <button
                  onClick={() => alert("Redirecting to WhatsApp Order System...")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Check size={18} /> Confirm Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Main() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSize, setActiveSize] = useState(1);

  const addToCart = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });

  };

  const updateItemQty = (id, newQty) => {
    if (newQty < 1) return removeItem(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-amber-500/30">

      {/* --- Navigation --- */}
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

      {/* --- Hero Section --- */}
      <div className="relative bg-slate-900 pt-25 pb-10 lg:pt-30 lg:pb-15 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >

            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-semibold mb-6 tracking-wider uppercase">
              || वक्रतुंड महाकाय सूर्यकोटि समप्रभ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ||
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              गणपती बाप्पाच्या आशीर्वादाने <br />
              <span className="text-transparent bg-clip-text bg-linear-to-br from-amber-300 to-orange-500 ">Om arts </span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto mb-10">
              पीओपि व शाडू मातीच्या गणेश मूर्ती बनविण्यात अग्रगण्य
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#collection"
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-900/40 transition-all transform hover:-translate-y-1"
              >
                सर्व मॉडेल्स बघा
              </a>
              <button
                onClick={() => setIsAddressOpen(true)}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <MapPin size={20} /> आमचा  पत्ता
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Stat Banner --- */}
      <div className="bg-slate-900/50 border-y border-white/5 backdrop-blur-sm">
        <div className="w-full h-20 flex justify-center items-center text-center p-4 text-white">
          आपल्याकडील विविध प्रकारच्या मूर्ती खालील प्रमाणे आहेत. आजच आपली ऑर्डर पूर्ण करा !
        </div>
      </div>

      {/* --- Product Collection --- */}
      <div id="collection" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">आमच्याकडील विविध मूर्ती </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full" />
            <p className="mt-4 text-gray-400">आपली ऑर्डर ऑनलाइन स्वीकारली जाईल </p>
          </div>
          {/* sizes section */}
          <div className="flex w-full justify-evenly mb-8 items-center font-bold">
            <Sizebtn id={1} label="6/9 इंच " activeSize={activeSize} setActiveSize={setActiveSize} />
            <Sizebtn id={2} label="1 फुट" activeSize={activeSize} setActiveSize={setActiveSize} />
            <Sizebtn id={3} label="1.25 / 1.5 फुट " activeSize={activeSize} setActiveSize={setActiveSize} />
            <Sizebtn id={4} label="2 फुट+" activeSize={activeSize} setActiveSize={setActiveSize} />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeSize == 1 && Size1data.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
            {activeSize === 2 && Size2data.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
            {activeSize === 3 && Size3data.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
            {activeSize === 4 && Size4data.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      {/* --- Modals & Overlays --- */}

      {/* Address Modal */}
      <Modal isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} title="Visit Our Workshop">
        <div className="space-y-4 text-gray-300 font-light">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-slate-800 p-2 rounded-lg text-amber-500">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{BUSINESS_ADDRESS.shop}</h3>
              <p className="mt-1">{BUSINESS_ADDRESS.street}</p>
              <p>{BUSINESS_ADDRESS.city} - {BUSINESS_ADDRESS.pin}</p>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full my-2" />

          <div className="flex items-center gap-4">
            <Phone size={20} className="text-amber-600" />
            <span className="text-white">{BUSINESS_ADDRESS.phone}</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-amber-600" />
            <span className="text-white">{BUSINESS_ADDRESS.email}</span>
          </div>
        </div>
      </Modal>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        updateItemQty={updateItemQty}
        removeItem={removeItem}
      />
    </div>
  );
}