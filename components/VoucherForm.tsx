"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Wallet,
  Clock3,
  Upload,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Voucher / payment details. QR_SRC is the scan-to-pay image served from /public.
const AMOUNT = 999;
const SUPPORT_PHONE = "9638610000";
const QR_SRC = "https://care.autoavengers.com/files/Bank_QR%20(1).png";

type Step = "details" | "choose" | "pay-now" | "done";

export default function VoucherForm() {
  const [step, setStep] = useState<Step>("details");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultStatus, setResultStatus] = useState<string>("");

  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-[#3A115F]/15 focus:border-[#E26304] focus:ring-2 focus:ring-[#E26304]/20 outline-none transition-colors bg-white";
  const labelCls =
    "block text-[#1D1D1C] text-xs font-bold uppercase tracking-wider mb-2";

  function detailsValid() {
    return fullName.trim() !== "" && mobile.trim() !== "";
  }

  function goToChoose(e: React.FormEvent) {
    e.preventDefault();
    if (!detailsValid()) {
      setError("Please enter your name and mobile number.");
      return;
    }
    setError(null);
    setStep("choose");
  }

  async function submit(choice: "now" | "later") {
    if (choice === "now" && !proof) {
      setError("Please upload your payment screenshot first.");
      return;
    }
    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append("customer_name", fullName.trim());
    const m = mobile.trim();
    fd.append("mobile", m.startsWith("+") ? m : `+91${m}`);
    fd.append("email", email.trim());
    fd.append("payment_choice", choice);
    if (choice === "now" && proof) fd.append("payment_proof", proof);

    try {
      const res = await fetch("/api/voucher", { method: "POST", body: fd });
      if (res.ok) {
        setResultStatus(
          choice === "now"
            ? "We've received your payment proof. Our team will verify and confirm your voucher shortly."
            : "Your voucher request is saved. Our team will call you to complete the payment."
        );
        setStep("done");
      } else {
        setError("Something went wrong. Please call us or try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fade = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  return (
    <div className="relative min-h-[420px]">
      {/* Step indicator */}
      {step !== "done" && (
        <div className="flex items-center gap-2 mb-8">
          {["details", "choose", "pay-now"].map((s, i) => {
            const order = ["details", "choose", "pay-now"];
            const active = order.indexOf(step) >= i;
            return (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  active ? "bg-[#E26304]" : "bg-[#3A115F]/10"
                }`}
              />
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1 — details */}
        {step === "details" && (
          <motion.form
            key="details"
            {...fade}
            onSubmit={goToChoose}
            className="grid gap-5"
          >
            <div>
              <span className="text-[#87B21D] font-bold tracking-[0.2em] uppercase text-[11px]">
                ₹{AMOUNT} Universal Car Care Voucher
              </span>
              <h3 className="text-[#3A115F] text-xl font-black uppercase mt-1">
                Your Details
              </h3>
            </div>
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputCls}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className={labelCls}>Mobile Number *</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                type="tel"
                className={inputCls}
                placeholder="10-digit mobile"
              />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={inputCls}
                placeholder="you@email.com"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#E26304] text-white py-4 font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
            >
              Next <ArrowRight size={18} />
            </button>
          </motion.form>
        )}

        {/* STEP 2 — choose Pay Now / Pay Later */}
        {step === "choose" && (
          <motion.div key="choose" {...fade} className="grid gap-5">
            <button
              onClick={() => {
                setError(null);
                setStep("details");
              }}
              className="inline-flex items-center gap-1.5 text-[#3A115F]/60 hover:text-[#3A115F] text-sm font-bold w-fit"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h3 className="text-[#3A115F] text-xl font-black uppercase">
              How would you like to pay?
            </h3>

            <button
              onClick={() => {
                setError(null);
                setStep("pay-now");
              }}
              className="text-left group rounded-xl border-2 border-[#3A115F]/10 hover:border-[#E26304] p-6 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Wallet className="text-[#E26304]" size={26} />
                <span className="text-[#1D1D1C] font-black uppercase tracking-wide">
                  Pay Now
                </span>
              </div>
              <p className="text-[#1D1D1C]/60 text-sm mt-2">
                Pay ₹{AMOUNT} online and upload your payment screenshot. We&apos;ll
                verify and confirm your voucher.
              </p>
            </button>

            <button
              onClick={() => submit("later")}
              disabled={loading}
              className="text-left group rounded-xl border-2 border-[#3A115F]/10 hover:border-[#87B21D] p-6 transition-colors disabled:opacity-60"
            >
              <div className="flex items-center gap-3">
                <Clock3 className="text-[#87B21D]" size={26} />
                <span className="text-[#1D1D1C] font-black uppercase tracking-wide">
                  Pay Later
                </span>
              </div>
              <p className="text-[#1D1D1C]/60 text-sm mt-2">
                Submit now without paying. Our team will call you to complete the
                payment.
              </p>
            </button>

            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}
            {loading && (
              <p className="text-[#3A115F]/60 text-sm font-semibold">
                Submitting…
              </p>
            )}
          </motion.div>
        )}

        {/* STEP 3 — Pay Now: instructions + upload */}
        {step === "pay-now" && (
          <motion.div key="pay-now" {...fade} className="grid gap-5">
            <button
              onClick={() => {
                setError(null);
                setStep("choose");
              }}
              className="inline-flex items-center gap-1.5 text-[#3A115F]/60 hover:text-[#3A115F] text-sm font-bold w-fit"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h3 className="text-[#3A115F] text-xl font-black uppercase">
              Complete Your Payment
            </h3>

            <div className="rounded-xl bg-[#3A115F]/5 p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={QR_SRC}
                  alt={`Scan to pay ₹${AMOUNT}`}
                  className="w-52 h-52 rounded-lg bg-white p-2 object-contain"
                />
                <span className="text-[#1D1D1C]/60 text-xs font-semibold uppercase tracking-wider mt-3">
                  Scan to pay ₹{AMOUNT}
                </span>
              </div>
              <p className="text-[#1D1D1C]/50 text-xs pt-4 leading-relaxed text-center">
                Scan the QR with any UPI app to pay ₹{AMOUNT}, then upload the
                payment screenshot below. Need help? Call {SUPPORT_PHONE}.
              </p>
            </div>

            <div>
              <label className={labelCls}>Payment Screenshot *</label>
              <label className="flex items-center gap-3 cursor-pointer rounded-lg border-2 border-dashed border-[#3A115F]/20 hover:border-[#E26304] px-4 py-5 transition-colors">
                <Upload size={20} className="text-[#E26304]" />
                <span className="text-sm text-[#1D1D1C]/70 font-semibold truncate">
                  {proof ? proof.name : "Tap to upload your screenshot"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setError(null);
                    setProof(e.target.files?.[0] ?? null);
                  }}
                />
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}

            <button
              onClick={() => submit("now")}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[#E26304] text-white py-4 font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit With Payment Proof"}
            </button>
          </motion.div>
        )}

        {/* DONE */}
        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-10"
          >
            <CheckCircle2 size={64} className="text-[#87B21D]" />
            <h3 className="text-[#3A115F] text-2xl font-black mt-4 uppercase">
              Request Received!
            </h3>
            <p className="text-[#1D1D1C]/60 mt-2 max-w-sm">{resultStatus}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
