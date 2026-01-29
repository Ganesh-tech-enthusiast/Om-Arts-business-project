import React from 'react'
import { useState } from 'react';
import { Minus, Plus,Star,Truck,X } from 'lucide-react';
import {motion,AnimatePresence } from 'framer-motion'; 

export const ProductCard = ({ product, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [showImage, setShowImage] = useState(false);

  return (
    <>
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl hover:shadow-amber-900/20 transition-all duration-300"
    >
      <div className="relative h-90 overflow-hidden cursor-pointer">
        <img 
          src={product.image}  
          className="w-full h-full object-cover"
          onClick={() => setShowImage(true)}
        />
        <div/>
        <div className="absolute top-3 right-3 bg-white text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          {product.size}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1 block">{product.category}</span>
          <h3 className="text-white text-lg font-bold leading-tight font-serif">{product.name}</h3>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-white">₹{product.price}</span>
          
          {/* Integrated Quantity Selector */}
          <div className="flex items-center bg-slate-700 rounded-lg p-1 border border-slate-600">
            <button 
              onClick={() => setQty(prev => Math.max(1, prev - 1))}
              className="p-1 text-gray-400 hover:text-white hover:bg-slate-600 rounded transition-colors"
            >
              <Minus size={18} />
            </button>
            <input 
              type="number" 
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-10 bg-transparent text-center text-white font-semibold text-sm outline-none hide-spinners"
            />
            <button 
              onClick={() => setQty(prev => prev + 1)}
              className="p-1 text-gray-400 hover:text-white hover:bg-slate-600 rounded transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
           <button 
            onClick={() => {
              onAddToCart(product, qty);
              // Optional: Visual feedback like a toast could go here
            }}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-900/30 transform active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Truck size={18} />
            Order Now
          </button>
          
        </div>
      </div>
    </motion.div>
    <AnimatePresence>
        {showImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            
          >
            {/* close button */}
            <div className='relative'>
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full"
            >
              <X size={24} />
            </button>

            {/* image */}
            <motion.img
              src={product.image}
              alt={product.name}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            />
              </div>
    
          </motion.div>
        )}
      </AnimatePresence>
</>
  );
};
