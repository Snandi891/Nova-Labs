"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export default function PrivacyPolicy() {
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rippleRef = useRef(null);

  // Create ripple effect for back button
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = rippleRef.current.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    rippleRef.current.appendChild(circle);
  };

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      blob1Controls.start({ y: scrollY * 0.3 });
      blob2Controls.start({ y: scrollY * 0.1 });
      blob3Controls.start({ y: scrollY * 0.2 });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [blob1Controls, blob2Controls, blob3Controls]);

  // Animation variants for section items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center px-4 md:px-6 py-16">
      {/* Back Button with hover effect */}
      <div className="absolute top-6 left-6 z-30">
        <motion.a
          href="/"
          className="inline-flex items-center gap-3 py-2 pl-4 pr-6 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/30 shadow-lg shadow-indigo-500/10 font-medium relative overflow-hidden"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 20px -5px rgba(99, 102, 241, 0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={createRipple}
        >
          {/* Floating particles */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-indigo-400"
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: -10,
                      y: -10,
                    }}
                    animate={{
                      opacity: [0, 0.7, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * 60 - 30,
                      y: Math.random() * 40 - 20,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    style={{
                      width: Math.random() * 6 + 2,
                      height: Math.random() * 6 + 2,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Ripple container */}
          <div ref={rippleRef} className="ripple-container"></div>

          {/* Animated arrow */}
          <motion.div
            className="relative"
            animate={{
              rotate: [0, -10, 10, 0],
              x: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </motion.svg>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-indigo-400 rounded-full blur-sm"
              animate={{
                opacity: isHovered ? [0, 0.4, 0] : 0,
                scale: isHovered ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          </motion.div>

          {/* Text with animated underline */}
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Back to Home
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </span>
        </motion.a>
      </div>

      {/* Background animated blobs - more subtle */}
      <motion.div
        animate={blob1Controls}
        className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"
      />
      <motion.div
        animate={blob2Controls}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"
      />
      <motion.div
        animate={blob3Controls}
        className="absolute top-28 left-32 w-64 h-64 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"
      />

      {/* Privacy Policy Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20"
      >
        {/* Decorative header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative overflow-hidden">
          {/* Animated particles in header */}
          <AnimatePresence>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 500 - 250,
                  y: Math.random() * 100 - 50,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 500 - 250,
                  y: Math.random() * 100 - 50,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
                style={{
                  width: Math.random() * 20 + 5,
                  height: Math.random() * 20 + 5,
                }}
              />
            ))}
          </AnimatePresence>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">
            Privacy Policy
          </h1>
          <p className="text-indigo-100 font-light relative z-10">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="p-8 md:p-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="space-y-8 text-gray-700"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed"
            >
              At <span className="font-semibold text-indigo-600">NovaLabs</span>
              , we value your privacy and are committed to protecting your
              personal data. This policy explains how we collect, use, and
              safeguard your information when you use our website and services.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="bg-indigo-50/50 p-5 rounded-xl border-l-4 border-indigo-500 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl md:text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-5">
                <li>Personal details (name, email, phone number)</li>
                <li>Project requirements and files you share</li>
                <li>Payment and billing information</li>
                <li>Technical information such as IP address and cookies</li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-purple-50/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl md:text-2xl font-bold text-purple-700 flex items-center gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                How We Use Your Information
              </h2>
              <p>
                We use your information to deliver custom project solutions,
                communicate with you, process payments, and improve our
                services.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-blue-50/50 p-5 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 flex items-center gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Data Protection
              </h2>
              <p>
                Your information is protected using industry-standard security
                measures. We never sell your personal data, and only share with
                trusted providers such as hosting and payment services.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-teal-50/50 p-5 rounded-xl border-l-4 border-teal-500 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl md:text-2xl font-bold text-teal-700 flex items-center gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Your Rights
              </h2>
              <p>
                You have the right to access, update, or delete your data at any
                time. You may also opt out of promotional communications.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-50/70 p-5 rounded-xl border-l-4 border-gray-400 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 flex items-center gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </h2>
              <p>
                If you have any questions regarding this policy, please contact
                us at{" "}
                <span className="font-semibold text-indigo-600">
                  support@novalabs.com
                </span>
                .
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100/80 p-5 text-center text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} NovaLabs. All rights reserved.
        </div>
      </motion.div>

      {/* Custom styles for ripple effect */}
      <style jsx>{`
        .ripple-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background: radial-gradient(
            circle,
            rgba(192, 132, 252, 0.4) 0%,
            rgba(99, 102, 241, 0) 70%
          );
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
