"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export default function TermsOfService() {
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [progress, setProgress] = useState(0);
  const rippleRef = useRef(null);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

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
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;

      setProgress(scrollPercent);

      blob1Controls.start({ y: scrollY * 0.3 });
      blob2Controls.start({ y: scrollY * 0.1 });
      blob3Controls.start({ y: scrollY * 0.2 });

      // Highlight active section
      const sections = sectionRefs.current;
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(index);
          }
        }
      });
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

  const sectionTitles = [
    "Use of Our Services",
    "Project Requests",
    "Payments",
    "Intellectual Property",
    "Limitation of Liability",
    "Changes to Terms",
    "Contact Us",
  ];

  // Handle smooth scroll to section
  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden flex items-center justify-center px-4 sm:px-6 py-16"
      ref={containerRef}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 40%)",
              "radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)",
              "radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 40%)",
              "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 40%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background animated blobs */}
      <motion.div
        animate={blob1Controls}
        className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
      />
      <motion.div
        animate={blob2Controls}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
      />
      <motion.div
        animate={blob3Controls}
        className="absolute top-28 left-32 w-72 h-72 bg-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-300/30"
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 30 - 15],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Back Button with hover effect */}
      <div className="fixed top-6 left-6 z-50">
        <motion.a
          href="/"
          className="inline-flex items-center gap-3 py-3 pl-4 pr-6 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-lg shadow-indigo-100/50 font-medium relative overflow-hidden group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 25px -5px rgba(99, 102, 241, 0.3)",
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
                    className="absolute rounded-full bg-indigo-400/70"
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
              className="h-6 w-6 text-indigo-600"
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
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-medium">
            Back to Home
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </span>
        </motion.a>
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-50"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2 }}
      />

      {/* Table of Contents for larger screens */}
      {!isMobile && (
        <motion.div
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-5 border border-indigo-100">
            <h3 className="font-semibold text-indigo-600 mb-3 text-sm uppercase tracking-wider">
              Sections
            </h3>
            <ul className="space-y-3">
              {sectionTitles.map((title, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <button
                    onClick={() => scrollToSection(index)}
                    className={`text-sm transition-all duration-300 flex items-center justify-end text-right ${
                      activeSection === index
                        ? "text-indigo-600 font-bold"
                        : "text-gray-600 hover:text-indigo-500"
                    }`}
                  >
                    <span className="mr-2">{title}</span>
                    {activeSection === index && (
                      <motion.div
                        className="w-2 h-2 bg-indigo-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator for mobile */}
      {isMobile && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-indigo-100 shadow-sm">
          <p className="text-xs text-gray-600">Scroll to read</p>
          <motion.div
            className="w-6 h-6 border-r-2 border-b-2 border-indigo-500 rotate-45 mx-auto mt-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      )}

      {/* Terms of Service Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 text-gray-800 mt-10 mb-16 border border-indigo-100"
        ref={containerRef}
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-30">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent"
            animate={{ x: [-500, 500] }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>

        {/* Glowing edges */}
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl blur-xl opacity-50 -z-10"></div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Terms of Service
        </motion.h1>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 mx-auto"></div>
        </motion.div>

        <div className="space-y-10 text-lg leading-relaxed">
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center italic border-l-4 border-indigo-400 pl-4 py-3 bg-indigo-50/50 rounded-r-lg"
          >
            Welcome to{" "}
            <span className="font-semibold text-indigo-600">NovaLabs</span>. By
            accessing or using our website and services, you agree to comply
            with and be bound by these Terms of Service. Please read them
            carefully.
          </motion.p>

          {[
            {
              title: "1. Use of Our Services",
              content:
                "You agree to use our services only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use of the website. Any misuse of our platform, including attempts to disrupt service, is strictly prohibited.",
            },
            {
              title: "2. Project Requests",
              content:
                "When you submit a request for a custom project, you agree to provide accurate information. We reserve the right to decline projects that violate our policies or ethical standards.",
            },
            {
              title: "3. Payments",
              content:
                "Payments for services must be made through the approved payment methods on our website. All fees are non-refundable unless otherwise stated in writing.",
            },
            {
              title: "4. Intellectual Property",
              content:
                "Unless agreed otherwise, completed projects are the intellectual property of the client once full payment has been received. NovaLabs retains the right to showcase completed work in our portfolio unless the client explicitly requests otherwise.",
            },
            {
              title: "5. Limitation of Liability",
              content:
                "We strive to deliver high-quality services but cannot guarantee that our website will always be error-free or uninterrupted. NovaLabs is not liable for any indirect or consequential damages resulting from the use of our services.",
            },
            {
              title: "6. Changes to Terms",
              content:
                "We may update these Terms of Service at any time. Updates will be posted on this page with a new effective date.",
            },
            {
              title: "7. Contact Us",
              content:
                "If you have any questions about these Terms of Service, please contact us at support@novalabs.com.",
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="bg-white p-7 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-500 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              whileHover={{ y: -5, borderColor: "rgba(99, 102, 241, 0.3)" }}
            >
              <div className="flex items-start">
                <motion.div
                  className="mr-4 mt-1 bg-indigo-100 p-2 rounded-lg border border-indigo-200"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="text-indigo-600 font-bold text-xl">
                    {index + 1}
                  </div>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-600 mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                    {section.title}
                  </h2>
                  <p className="text-gray-700">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="mt-16 pt-10 border-t border-indigo-100 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm mb-8">
              By using our services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </motion.div>
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
