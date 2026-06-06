import { lazy, Suspense, useState } from 'react';
import { Mail, MapPin, Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendContactEnquiry } from '../services/emailService';

const CartSidebar = lazy(() => import('../components/CartSidebar'));

const businessCardImage = "https://res.cloudinary.com/did8mktr3/image/upload/v1780724671/Business_card_nl1p1a.png";

const contact = {
  address: "Kolhar Bhagvatinagar, Sonagaon Road, Taluka Rahata, Maharashtra - 413710",
  phoneOne: "+91 9822397846",
  phoneTwo: "+91 8010072112",
  email: "ganeshwakchaure801@gmail.com",
};

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

export default function ContactUs() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    enquiry: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  const emptyCart = [];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleEnquirySubmit = async (event) => {
    event.preventDefault();
    setFormStatus("sending");
    setFormMessage("");

    try {
      await sendContactEnquiry(formData);
      setFormStatus("sent");
      setFormMessage("Thank you. Your enquiry has been sent successfully.");
      setFormData({
        name: "",
        phone: "",
        address: "",
        enquiry: "",
      });
    } catch (error) {
      setFormStatus("error");
      setFormMessage(error.message || "Unable to send enquiry right now. Please call or WhatsApp us.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-800 dark:text-slate-200">
      <Header cart={emptyCart} setIsAddressOpen={setIsAddressOpen} setIsCartOpen={setIsCartOpen} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      <main className="pt-32 md:pt-36">
        <section className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <p className="text-amber-600 dark:text-amber-500 font-semibold tracking-wide uppercase text-sm">Contact Us</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-stone-900 dark:text-white leading-tight">
              Visit the workshop or call us for Ganpati murti booking.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-stone-600 dark:text-gray-400 leading-relaxed">
              We are available for model selection, order confirmation, and workshop visit guidance.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <a href={`tel:${contact.phoneOne.replaceAll(" ", "")}`} className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 hover:border-amber-500/60 transition-colors">
              <Phone className="text-amber-600 dark:text-amber-500 mb-4" size={28} />
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">Call</h2>
              <p className="mt-3 text-stone-600 dark:text-gray-400">{contact.phoneOne}</p>
              <p className="text-stone-600 dark:text-gray-400">{contact.phoneTwo}</p>
            </a>
            <a href="https://wa.me/919822397846" className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 hover:border-green-500/60 transition-colors">
              <FaWhatsapp className="text-green-600 dark:text-green-500 mb-4" size={28} />
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">WhatsApp</h2>
              <p className="mt-3 text-stone-600 dark:text-gray-400">Message us for availability and booking details.</p>
            </a>
            <a href={`mailto:${contact.email}`} className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 hover:border-amber-500/60 transition-colors">
              <Mail className="text-amber-600 dark:text-amber-500 mb-4" size={28} />
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">Email</h2>
              <p className="mt-3 text-stone-600 dark:text-gray-400 break-words">{contact.email}</p>
            </a>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-6 flex gap-4">
              <MapPin className="shrink-0 text-amber-600 dark:text-amber-500" size={28} />
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-white">Workshop Address</h2>
                <p className="mt-2 text-stone-600 dark:text-gray-400">{contact.address}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
              <div>
                <p className="text-amber-600 dark:text-amber-500 font-semibold tracking-wide uppercase text-sm">Get In Touch</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                  Send your murti booking enquiry.
                </h2>
                <p className="mt-4 text-stone-600 dark:text-gray-400 leading-relaxed">
                  Share your name, phone number, address, and enquiry details. We will reply with availability and next steps.
                </p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-lg p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-stone-700 dark:text-gray-300">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-stone-700 dark:text-gray-300">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="+91 9876543210"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-stone-700 dark:text-gray-300">Address</span>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Your city / full address"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-stone-700 dark:text-gray-300">Enquiry</span>
                  <textarea
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-2 w-full resize-y rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition-colors focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Tell us about size, model, quantity, or booking details"
                  />
                </label>

                {formMessage && (
                  <p className={`text-sm font-medium ${formStatus === "error" ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-400"}`}>
                    {formMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full sm:w-auto rounded-lg bg-amber-600 px-6 py-3 font-bold text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-400 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
                >
                  {formStatus === "sending" ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
              <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg shadow-stone-300/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                <img
                  src={businessCardImage}
                  alt="Om Arts business card"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div>
                <p className="text-amber-600 dark:text-amber-500 font-semibold tracking-wide uppercase text-sm">Business Card</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
                  Scan, save, or share our details.
                </h2>
                <p className="mt-4 text-stone-600 dark:text-gray-400 leading-relaxed">
                  Use this card for quick access to our phone numbers, workshop details, and Ganpati murti booking contact.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Modal isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} title="Workshop Address">
        <p className="text-stone-600 dark:text-gray-300">{contact.address}</p>
      </Modal>
      <Suspense fallback={null}>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={emptyCart} updateItemQty={() => { }} removeItem={() => { }} onOrderClick={() => setIsCartOpen(false)} />
      </Suspense>
    </div>
  );
}
