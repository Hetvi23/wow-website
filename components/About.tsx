"use client";

import { motion } from "framer-motion";
import { Zap, Eye } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-28 bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Mosaic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative grid grid-cols-2 gap-4"
          >
            <img
              src="/images/wow-images/Web_Sec1_Img1.png"
              className="rounded-2xl shadow-xl mt-14 object-cover h-64 w-full"
              alt="Mechanic working on car"
            />
            <img
              src="/images/wow-images/Web_Sec1_img2.png"
              className="rounded-2xl shadow-xl object-cover h-64 w-full"
              alt="Car engine service"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#3A115F] text-white px-6 py-4 rounded-2xl shadow-2xl text-center whitespace-nowrap"
            >
              <span className="text-[#87B21D] font-black text-2xl block">5★</span>
              <span className="text-[11px] uppercase tracking-widest font-bold opacity-70">Rated Service</span>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8 pt-8 lg:pt-0"
          >
            <div>
              <span className="text-[#E26304] font-bold text-xs uppercase tracking-[0.3em]">
                Innovation in Motion
              </span>
              <h2 className="text-[#3A115F] text-4xl md:text-5xl font-black tracking-wide leading-tight mt-3 uppercase">
                Reliable Car Care{" "}
                <span className="text-[#8852A7]">Delivered To You.</span>
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              Auto Avengers is an innovative, customer-centric mobile car repair
              and maintenance service designed to provide convenience, efficiency, and
              reliability to vehicle owners. We eliminate the need for time-consuming
              visits to traditional workshops by delivering expert automotive solutions
              directly to your location.
            </p>

            {/* Dashed divider */}
            <div className="dashed-divider w-24 rounded-full" />

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Mission */}
              <div className="space-y-3 p-6 border border-gray-100 rounded-xl hover:border-[#3A115F]/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#3A115F] p-2.5 rounded-lg">
                    <Zap size={18} className="text-[#E26304]" />
                  </div>
                  <h4 className="font-black text-[#3A115F] uppercase tracking-wide border-b-2 border-[#E26304]">
                    Mission
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To revolutionize the automotive service industry by providing convenient,
                  reliable, and professional car care solutions anytime, anywhere.
                </p>
              </div>

              {/* Vision */}
              <div className="space-y-3 p-6 border border-gray-100 rounded-xl hover:border-[#87B21D]/40 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#87B21D] p-2.5 rounded-lg">
                    <Eye size={18} className="text-white" />
                  </div>
                  <h4 className="font-black text-[#3A115F] uppercase tracking-wide border-b-2 border-[#87B21D]">
                    Vision
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To be the leading mobile car service provider, redefining customer
                  convenience while maintaining high standards of service excellence.
                </p>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-700 italic border-l-4 border-[#8852A7] pl-4">
              We ensure top-quality service using advanced tools and genuine parts.
            </p>
          </motion.div>
        </div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-24 bg-[#3A115F] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#E26304]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <span className="text-[#87B21D] font-bold text-xs uppercase tracking-[0.3em]">
              Our Founder
            </span>
            <h3 className="text-3xl md:text-4xl font-black mt-3 uppercase tracking-wide">
              Mr. Jignesh Dixit
            </h3>
            <p className="text-white/70 leading-relaxed text-lg mt-5">
              Auto Avengers is founded by Mr. Jignesh Dixit, a seasoned automobile
              professional with over <strong className="text-white">25 years</strong> of
              hands-on experience in automotive servicing, operations, and customer
              management. He established and scaled <strong className="text-white">Auto
              Solution</strong>, a multi-brand car workshop running profitably since 2010,
              and his tenure with <strong className="text-white">Ford Motor Company</strong>{" "}
              shaped his understanding of structured operations and service standards.
              Driven by a vision to eliminate the trust deficit in car servicing, he leads
              Auto Avengers with a mission to bring transparency, reliability, and
              convenience to every car owner&apos;s doorstep.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
