"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setLoading(true);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Ensure phone number has country code for ERPNext validation
    if (typeof data.phone === 'string' && !data.phone.startsWith('+')) {
      data.phone = `+91${data.phone.trim()}`;
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-28 bg-[#3A115F] relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E26304]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8852A7]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1D1D1C]/30 [clip-path:polygon(30%_0%,100%_0%,100%_100%,0%_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2"
        >
          {/* Form Side */}
          <div className="p-10 md:p-16 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-[#3A115F] uppercase tracking-wide">
                Get a Quick Callback
              </h2>
              <p className="text-gray-500 mt-2">
                Book your mobile mechanic in seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                  Name
                </label>
                <input
                  name="lead_name"
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#E26304] outline-none transition-all font-semibold rounded-t-lg"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#E26304] outline-none transition-all font-semibold rounded-t-lg"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                  Car Model
                </label>
                <input
                  name="car_model"
                  type="text"
                  required
                  placeholder="Car model"
                  className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#E26304] outline-none transition-all font-semibold rounded-t-lg"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                  Service Required
                </label>
                <select name="service_required" required defaultValue="" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#E26304] outline-none transition-all font-semibold appearance-none rounded-t-lg">
                  <option value="" disabled>Service required</option>
                  <option>Routine Maintenance</option>
                  <option>Oil Change</option>
                  <option>Brake / Battery Service</option>
                  <option>Diagnostics</option>
                  <option>Roadside Assistance</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us more about the issue..."
                  className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#E26304] outline-none transition-all font-semibold resize-none rounded-t-lg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E26304] text-white font-black py-5 uppercase tracking-widest text-sm shadow-xl hover:bg-[#3A115F] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Request Callback"}
              </button>
            </form>
          </div>

          {/* Image / Emergency Side */}
          <div className="hidden md:block relative">
            <img
              src="/images/wow-images/Web_Sec3_CU.png"
              className="w-full h-full object-cover object-right"
              alt="Mechanic on call"
            />
            <div className="absolute inset-0 bg-[#3A115F]/70 flex flex-col items-center justify-center p-12 text-center">
              <p className="text-4xl font-black text-white tracking-wide leading-tight mb-4">
                Emergency?
                <br />
                Call Now
              </p>
              <a
                href="tel:+919638610000"
                className="text-2xl font-black text-[#E26304] hover:text-white transition-colors duration-300 underline underline-offset-4"
              >
                +91 96386 10000
              </a>
              <div className="mt-10 grid grid-cols-2 gap-4 text-center w-full">
                <div className="bg-white/10 p-4 rounded-xl">
                  <span className="block text-2xl font-black text-[#87B21D]">24/7</span>
                  <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Support</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <span className="block text-2xl font-black text-[#E26304]">30m</span>
                  <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Response</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#1D1D1C] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 min-w-[320px]"
          >
            <CheckCircle2 size={24} className="text-[#87B21D] flex-shrink-0" />
            <div>
              <p className="font-black text-sm">Request Submitted!</p>
              <p className="text-gray-400 text-xs mt-0.5">Our team will call you back shortly.</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="ml-auto text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
