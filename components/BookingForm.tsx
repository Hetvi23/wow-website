"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { BookingOptions } from "@/lib/erpnext";

// Today's date in the visitor's local timezone as YYYY-MM-DD, used as the
// `min` for the date picker so past dates can't be selected.
function todayStr() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
}

export default function BookingForm({ options }: { options: BookingOptions }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const today = todayStr();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setError(null);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Validate the phone number before hitting the backend so a bad number
    // shows a clear message here instead of a silent submit failure.
    const digits = (data.phone || "").replace(/\D/g, "").replace(/^91/, "");
    if (!/^\d{10}$/.test(digits)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email || "")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Mandatory field validation
    if (!data.customer_name?.trim() || !data.phone?.trim() || !data.email?.trim() || !data.vehicle_model?.trim()) {
      setError("Please fill in all mandatory fields (Name, Phone, Email Address, and Car Model).");
      return;
    }

    // Guard against a past date even if the browser's date picker is bypassed.
    if (data.preferred_date && data.preferred_date < today) {
      setError("Preferred date cannot be in the past.");
      return;
    }

    data.phone = `+91${digits}`;
    setLoading(true);

    try {
      const res = await fetch("/api/webform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ web_form: "wow-booking", data }),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        let msg = "Something went wrong. Please call us or try again.";
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch {
          /* keep the generic message */
        }
        setError(msg);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-[#3A115F]/15 focus:border-[#E26304] focus:ring-2 focus:ring-[#E26304]/20 outline-none transition-colors bg-white";
  const labelCls =
    "block text-[#1D1D1C] text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <div className="relative">
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-10 bg-white rounded-2xl flex flex-col items-center justify-center text-center p-8"
          >
            <CheckCircle2 size={64} className="text-[#87B21D]" />
            <h3 className="text-[#3A115F] text-2xl font-black mt-4 uppercase">
              Booking Received!
            </h3>
            <p className="text-[#1D1D1C]/60 mt-2 max-w-sm">
              Our team will call you shortly to confirm your slot. Thank you for
              choosing Auto Avengers.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-[#E26304] font-bold text-sm uppercase tracking-wider"
            >
              Book Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input name="customer_name" required className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input name="phone" required type="tel" className={inputCls} placeholder="10-digit mobile" />
        </div>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input name="email" type="email" required className={inputCls} placeholder="you@email.com" />
        </div>
        <div>
          <label className={labelCls}>Service Type *</label>
          <select name="service_type" required className={inputCls} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {options.service_types.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Vehicle Make</label>
          {options.makes.length > 0 ? (
            <select name="vehicle_make" className={inputCls} defaultValue="">
              <option value="">Select make</option>
              {options.makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          ) : (
            <input name="vehicle_make" className={inputCls} placeholder="e.g. Honda" />
          )}
        </div>
        <div>
          <label className={labelCls}>Car Model *</label>
          <input name="vehicle_model" required className={inputCls} placeholder="e.g. City" />
        </div>
        <div>
          <label className={labelCls}>Registration No</label>
          <input name="registration_no" className={inputCls} placeholder="GJ05AB1234" />
        </div>
        <div>
          <label className={labelCls}>Preferred Date</label>
          <input name="preferred_date" type="date" min={today} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Preferred Time Slot</label>
          <select name="preferred_time_slot" className={inputCls} defaultValue="">
            <option value="">Any time</option>
            {options.time_slots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Pincode</label>
          <input
            name="pincode"
            inputMode="numeric"
            maxLength={6}
            pattern="\d{6}"
            title="Pincode must be exactly 6 digits"
            onInput={(e) => {
              const el = e.currentTarget;
              el.value = el.value.replace(/\D/g, "").slice(0, 6);
            }}
            className={inputCls}
            placeholder="396191"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address</label>
          <input name="address" className={inputCls} placeholder="Where should we come?" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Notes</label>
          <textarea name="notes" rows={3} className={inputCls} placeholder="Anything we should know?" />
        </div>

        {error && (
          <p className="sm:col-span-2 text-red-600 text-sm font-semibold">{error}</p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E26304] text-white py-4 font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
