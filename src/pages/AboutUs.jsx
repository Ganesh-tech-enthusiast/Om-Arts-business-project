import { lazy, Suspense, useState } from 'react';
import { Award, Heart, Palette, ShieldCheck, X } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartSidebar = lazy(() => import('../components/CartSidebar'));

const businessCardImage = "https://res.cloudinary.com/did8mktr3/image/upload/v1780724671/Business_card_nl1p1a.png";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-sm">
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-600/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:text-gray-400 dark:hover:text-white">
          <X size={24} />
        </button>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-4">{title}</h3>
          {children}
        </div>
      </Motion.div>
    </div>
  );
};

export default function AboutUs() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const emptyCart = [];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-800 dark:text-slate-200">
      <Header cart={emptyCart} setIsAddressOpen={setIsAddressOpen} setIsCartOpen={setIsCartOpen} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      <main className="pt-32 md:pt-36">
        <section className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <p className="text-amber-600 dark:text-amber-500 font-semibold tracking-wide uppercase text-sm">About Us</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-stone-900 dark:text-white leading-tight">
              Handmade Ganpati murtis with devotion, detail, and dependable service.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-stone-600 dark:text-gray-400 leading-relaxed">
              Om Arts is a Ganpati murti workshop focused on beautiful finishing, careful craftsmanship, and a smooth booking experience for families and mandals.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Palette, title: "Crafted Finish", text: "Every model is shaped and finished with attention to expression, color, and balance." },
              { icon: Heart, title: "Devotional Work", text: "The workshop keeps tradition at the center of every murti made for Ganeshotsav." },
              { icon: ShieldCheck, title: "Clear Booking", text: "Customers can browse models, choose quantity, and prepare their order details online." },
              { icon: Award, title: "Local Trust", text: "Serving devotees with reliable communication and workshop visits for final selection." },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6">
                <item.icon className="text-amber-600 dark:text-amber-500 mb-4" size={28} />
                <h2 className="text-lg font-bold text-stone-900 dark:text-white">{item.title}</h2>
                <p className="mt-3 text-stone-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
              <div>
                <p className="text-amber-600 dark:text-amber-500 font-semibold tracking-wide uppercase text-sm">Business Card</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                  Keep our contact details handy.
                </h2>
                <p className="mt-4 text-stone-600 dark:text-gray-400 leading-relaxed">
                  Save our workshop details for booking enquiries, visits, and Ganpati murti model selection.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg shadow-stone-300/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                <img
                  src={businessCardImage}
                  alt="Om Arts business card"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Modal isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} title="Visit Our Workshop">
        <p className="text-stone-600 dark:text-gray-300">Kolhar Bhagvatinagar, Sonagaon Road, Taluka Rahata, Maharashtra - 413710</p>
      </Modal>
      <Suspense fallback={null}>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={emptyCart} updateItemQty={() => { }} removeItem={() => { }} onOrderClick={() => setIsCartOpen(false)} />
      </Suspense>
    </div>
  );
}
