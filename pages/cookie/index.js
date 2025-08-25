"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export default function CookiePolicy() {
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rippleRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

    const ripple = rippleRef.current?.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    rippleRef.current?.appendChild(circle);
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

      // Section highlight logic
      const sections = document.querySelectorAll("h2");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
          setActiveSection(section.id);
        }
      });

      // Show/hide back to top button
      setIsVisible(scrollY > 300);
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

  // Cookie types data
  const cookieTypes = [
    {
      title: "Essential Cookies",
      description: "Required for the website to function properly.",
      icon: "🔒",
    },
    {
      title: "Analytics Cookies",
      description: "Help us understand how visitors use our site.",
      icon: "📊",
    },
    {
      title: "Preference Cookies",
      description: "Store your settings and preferences.",
      icon: "⚙️",
    },
    {
      title: "Marketing Cookies",
      description: "May be used to deliver relevant ads.",
      icon: "📢",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden flex items-center justify-center px-4 md:px-6 py-16">
      {/* Background animated blobs - More subtle and professional */}
      <motion.div
        animate={blob1Controls}
        className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
      />
      <motion.div
        animate={blob2Controls}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"
      />
      <motion.div
        animate={blob3Controls}
        className="absolute top-28 left-32 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"
      />

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

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 flex justify-center py-6">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent rounded-full"></div>
      </div>

      {/* Cookie Policy Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-gray-800 border border-white/20 mt-12"
      >
        {/* Header with logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md"
            >
              <span className="text-white font-bold text-lg">N</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-800">NovaLabs</span>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-10 tracking-tight"
        >
          Cookie Policy
        </motion.h1>

        <div className="space-y-10 text-lg leading-relaxed text-gray-700">
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-center text-gray-600 font-light mb-2"
          >
            Last Updated: January 1, 2024
          </motion.p>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-indigo-50 p-6 rounded-xl border border-indigo-100"
          >
            <p className="text-center">
              This Cookie Policy explains how{" "}
              <span className="font-semibold text-indigo-600">NovaLabs</span>{" "}
              uses cookies and similar tracking technologies on our website.
            </p>
          </motion.div>

          <motion.section
            id="what-are-cookies"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`pt-6 border-t border-gray-100 ${
              activeSection === "what-are-cookies"
                ? "bg-blue-50/50 -mx-6 px-6 py-2 rounded-lg"
                : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 flex items-center">
              <span className="mr-3">🍪</span> What Are Cookies?
            </h2>
            <p className="mt-4">
              Cookies are small text files stored on your device to help us
              provide a better browsing experience, analyze site traffic, and
              remember your preferences.
            </p>
          </motion.section>

          <motion.section
            id="types-of-cookies"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`pt-6 border-t border-gray-100 ${
              activeSection === "types-of-cookies"
                ? "bg-blue-50/50 -mx-6 px-6 py-2 rounded-lg"
                : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6">
              Types of Cookies We Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cookieTypes.map((cookie, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: index * 0.1,
                  }}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">{cookie.icon}</span>
                    <div>
                      <h3 className="font-semibold text-indigo-700">
                        {cookie.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{cookie.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="managing-cookies"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`pt-6 border-t border-gray-100 ${
              activeSection === "managing-cookies"
                ? "bg-blue-50/50 -mx-6 px-6 py-2 rounded-lg"
                : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 flex items-center">
              <span className="mr-3">⚙️</span> Managing Cookies
            </h2>
            <p className="mt-4">
              You can control or disable cookies through your browser settings.
              Please note that disabling essential cookies may affect website
              functionality.
            </p>
            <div className="mt-6 bg-gray-50 p-5 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-3">
                Browser Guides:
              </h4>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <li className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <a href="#" className="flex items-center">
                    <span className="mr-1">🌐</span> Chrome
                  </a>
                </li>
                <li className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <a href="#" className="flex items-center">
                    <span className="mr-1">🦊</span> Firefox
                  </a>
                </li>
                <li className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <a href="#" className="flex items-center">
                    <span className="mr-1">🧭</span> Safari
                  </a>
                </li>
                <li className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <a href="#" className="flex items-center">
                    <span className="mr-1">🚀</span> Edge
                  </a>
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            id="updates"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`pt-6 border-t border-gray-100 ${
              activeSection === "updates"
                ? "bg-blue-50/50 -mx-6 px-6 py-2 rounded-lg"
                : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 flex items-center">
              <span className="mr-3">🔄</span> Updates
            </h2>
            <p className="mt-4">
              We may update this Cookie Policy from time to time. Changes will
              be posted here with an updated date.
            </p>
          </motion.section>

          <motion.section
            id="contact"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`pt-6 border-t border-gray-100 ${
              activeSection === "contact"
                ? "bg-blue-50/50 -mx-6 px-6 py-2 rounded-lg"
                : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 flex items-center">
              <span className="mr-3">📧</span> Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions about this Cookie Policy, please contact
              us at{" "}
              <span className="font-semibold text-indigo-600">
                support@novalabs.com
              </span>
              .
            </p>
          </motion.section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NovaLabs. All rights reserved.</p>
        </div>
      </motion.div>

      {/* Back to top button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-10"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          transform: scale(0);
          animation: ripple 0.6s linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .ripple-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
