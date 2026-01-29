import React from 'react'
import { Truck ,X, Plus, Minus , Check} from 'lucide-react';
import {motion, AnimatePresence } from 'framer-motion';

export const CartSidebar = ({ isOpen, onClose, cartItems, updateItemQty, removeItem }) => {
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
