import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import SocialButtons from "../sample";

const ProfessionalAboutPage = () => {
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
  const blob4Controls = useAnimation(); // ✅ New blob control
  const [isMobile, setIsMobile] = useState(false);

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
      blob4Controls.start({ y: scrollY * 0.15 }); // ✅ Scroll effect for blob4
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [blob1Controls, blob2Controls, blob3Controls, blob4Controls]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const playSuccessSound = () => {
      const audio = new Audio("/success2.mp3"); // put file in /public
      audio.play();
    };

    emailjs
      .sendForm(
        "service_u9hg18n", // 🔹 replace with your EmailJS Service ID
        "template_e4pbhxi", // 🔹 replace with your EmailJS Template ID
        form.current,
        "VulgCpmxOjNs5JrE2" // 🔹 replace with your EmailJS Public Key
      )
      .then(
        () => {
          playSuccessSound();
          toast.success("Message sent successfully 🚀", {
            icon: "🎶", // optional custom icon
          });
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message ❌");
          console.error("EmailJS Error:", error.text);
        }
      );
  };

  const [isHovered, setIsHovered] = useState(false);
  const rippleRef = useRef(null);

  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    ripple.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    ripple.classList.add("ripple");

    rippleRef.current.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Background animated blobs */}
      <motion.div
        animate={blob1Controls}
        className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
        style={{ animationDuration: "20s" }}
      ></motion.div>

      <motion.div
        animate={blob2Controls}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-300 via-pink-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"
        style={{ animationDuration: "25s" }}
      ></motion.div>

      <motion.div
        animate={blob3Controls}
        className="absolute top-32 left-40 w-72 h-72 bg-gradient-to-tr from-pink-400 via-red-300 to-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"
        style={{ animationDuration: "22s" }}
      ></motion.div>

      <motion.div
        animate={blob4Controls}
        className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-tr from-cyan-300 via-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-6000"
        style={{ animationDuration: "28s" }}
      ></motion.div>

      {/* Back Button with hover effect */}
      <div className="relative z-30 pt-8 px-6 sm:px-8">
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
      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 md:py-4">
        <div className="text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight"
          >
            Crafting Digital Excellence
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-3xl mx-auto text-xl text-gray-600"
          >
            At TechSolutions, we transform ideas into exceptional digital
            products that drive business growth and innovation.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#story"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Story
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-indigo-600 text-base font-medium rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
      {/* Our Story Section */}
      <section id="story" className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={slideIn}
            >
              <div className="absolute -top-6 -left-6 w-full h-full bg-indigo-100 rounded-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/nova.jpg" // rename your uploaded file & move to /public
                  alt="Nova Labs Logo"
                  className="object-cover w-full h-80 md:h-96"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <span className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
                Our Journey
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                From Vision to Impact
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Founded in 2022, TechSolutions began as a small team of
                passionate developers and designers with a shared vision: to
                create digital experiences that transform businesses.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
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
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      Our Mission
                    </h4>
                    <p className="mt-2 text-gray-600">
                      To empower businesses with cutting-edge digital solutions
                      that drive growth, innovation, and exceptional user
                      experiences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
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
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      Our Vision
                    </h4>
                    <p className="mt-2 text-gray-600">
                      To be the most trusted digital partner for businesses
                      worldwide, recognized for our innovation, integrity, and
                      impact.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900">
                Our Evolution
              </h3>
              <p className="text-gray-600">
                Over the past eight years, we've grown from a garage startup to
                a team of 10+ professionals serving clients across 2+ countries.
                Our journey has been marked by continuous innovation and a
                commitment to excellence.
              </p>
              <p className="text-gray-600">
                We've had the privilege of partnering with industry leaders and
                startups alike, delivering over 15+ successful projects that
                have transformed digital experiences and driven measurable
                business results.
              </p>
              <p className="text-gray-600">
                What sets us apart is our holistic approach - we don't just
                build websites and apps; we craft digital experiences that solve
                real business challenges and delight users.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="relative z-10 py-6 bg-transparent ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="p-6">
              <p className="text-4xl font-bold">15+</p>
              <p className="mt-2 text-black">Projects Delivered</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <p className="text-4xl font-bold">10+</p>
              <p className="mt-2 text-black">Team Members</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <p className="text-4xl font-bold">3+</p>
              <p className="mt-2 text-black">Years Experience</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <p className="text-4xl font-bold">98%</p>
              <p className="mt-2 text-black">Client Satisfaction</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Values Section */}
      <section className="relative z-10 py-1 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              Our Core Values
            </span>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Principles That Guide Us
            </h3>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              The foundation of everything we do at TechSolutions
            </p>
          </div>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
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
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Excellence
              </h3>
              <p className="mt-4 text-gray-600">
                We pursue mastery in our craft, constantly pushing boundaries to
                deliver exceptional quality in every project.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Collaboration
              </h3>
              <p className="mt-4 text-gray-600">
                We believe in the power of partnership - with our clients and
                within our team - to achieve extraordinary results.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Innovation
              </h3>
              <p className="mt-4 text-gray-600">
                We embrace emerging technologies and creative thinking to solve
                complex challenges in novel ways.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-10 py-20 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-sm text-indigo-600 font-semibold tracking-widest uppercase">
              Get in Touch
            </h2>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Let’s Build Something Great 🚀
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">
              Have a project in mind? We'd love to hear from you.
            </p>
          </div>

          <div className="mt-12 relative max-w-5xl mx-auto">
            {/* Gradient glow border wrapper */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-30 animate-pulse"></div>

            <div className="relative bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Form */}
                <div className="p-10">
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="mt-2 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="mt-2 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="4"
                        className="mt-2 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition-all duration-300"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
                      >
                        ✉️ Send Message
                      </button>
                    </div>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white flex flex-col justify-center">
                  <h3 className="text-2xl font-bold tracking-wide">
                    Contact Information
                  </h3>
                  <div className="mt-6 space-y-4 text-lg">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-4 shadow-sm">
                        📞
                      </span>
                      +91 (7865089698)
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-4 shadow-sm">
                        📧
                      </span>
                      sayannath8888@gmail.com
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-4 shadow-sm">
                        📍
                      </span>
                      Remote - India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10  bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-400 overflow-hidden justify-end">
        <div className="max-w-7xl  py-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            {/* Brand Section */}
            <div className="flex flex-col space-y-4 text-center sm:text-left">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-2xl px-6 py-3 rounded-2xl shadow-lg animate-pulse inline-block">
                NovaLabs
              </div>
              <p className="text-gray-400 max-w-md mx-auto sm:mx-0">
                Professional website and app development services for businesses
                of all sizes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">Services</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a
                    href="services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    UI/UX Design
                  </a>
                </li>

                <li>
                  <a
                    href="services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Web Apps
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact / Social Section */}
            <div className="flex mt-20 mr-8 justify-center sm:justify-end">
              <SocialButtons />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-5 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2022 NovaLabs. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              {[
                { name: "Contact Us", href: "/about" },
                { name: "Privacy Policy", href: "/privecy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookie" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Optional subtle gradient overlay for extra premium effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 opacity-10 pointer-events-none"></div>
      </footer>
    </div>
  );
};

export default ProfessionalAboutPage;
