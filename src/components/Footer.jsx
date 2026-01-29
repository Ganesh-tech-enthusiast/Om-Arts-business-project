import React from 'react'
import logo from '../assets/logo.png'
import { Phone } from 'lucide-react'
export default function Footer() {
  return (
    
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  <img src={logo} />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">ओम आर्ट्स - गणपती मूर्ती कार्यशाळा</h3>
              </div>
              <p className="text-gray-500 leading-relaxed">
                श्री गणेशाची दिव्य कृपा घराघरात पोहोचवत आहोत. शुद्ध भक्ती आणि उत्कृष्ट कारागिरीचा संगम
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-500">

                <li><a href="#" className="hover:text-amber-500 transition-colors">Shadu Mati Murtis</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">POP Murtis</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Visit us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">कॉल करा</h4>
              <div className="flex gap-4 items-center">

                <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-500 border border-green-900 hover:bg-green-600 hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div className='flex flex-col gap-1'>
                  <h1>प्रो. सोन्याबापू शिवाजी वाकचौरे</h1>
                  <h1>+91 9822397846 </h1>
                  <h1>+91 8010072112 </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2026 Om Arts. All rights reserved. Designed and developed by Ganesh wakchaure.
            </p>
          </div>
        </div>
      </footer>

  )
}
