import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const ProfessionalAboutPage = () => {
  const blob1Controls = useAnimation();
  const blob2Controls = useAnimation();
  const blob3Controls = useAnimation();
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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [blob1Controls, blob2Controls, blob3Controls]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background animated blobs */}
      <motion.div
        animate={blob1Controls}
        className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
      ></motion.div>
      <motion.div
        animate={blob2Controls}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"
      ></motion.div>
      <motion.div
        animate={blob3Controls}
        className="absolute top-28 left-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"
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
                Founded in 2015, TechSolutions began as a small team of
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
                a team of 50+ professionals serving clients across 12 countries.
                Our journey has been marked by continuous innovation and a
                commitment to excellence.
              </p>
              <p className="text-gray-600">
                We've had the privilege of partnering with industry leaders and
                startups alike, delivering over 300 successful projects that
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
              <p className="text-4xl font-bold">300+</p>
              <p className="mt-2 text-black">Projects Delivered</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <p className="text-4xl font-bold">50+</p>
              <p className="mt-2 text-black">Team Members</p>
            </motion.div>
            <motion.div variants={fadeIn} className="p-6">
              <p className="text-4xl font-bold">8+</p>
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
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-4 shadow-sm">
                        📧
                      </span>
                      contact@digitalworks.com
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-4 shadow-sm">
                        📍
                      </span>
                      123 Innovation Street, Tech City, TC 10101
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-10">
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-6">
                      {["twitter", "instagram", "linkedin"].map((icon) => (
                        <a
                          key={icon}
                          href="#"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 shadow-md hover:shadow-lg transition transform hover:scale-110"
                        >
                          <span className="text-xl">🌐</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TS</span>
                </div>
                <span className="ml-3 text-xl font-bold">TechSolutions</span>
              </div>
              <p className="mt-4 text-gray-400">
                Creating digital experiences that transform businesses and
                delight users.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">Services</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    E-commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Connect</h3>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              <div className="mt-6">
                <p className="text-gray-400">123 Innovation Drive</p>
                <p className="text-gray-400">Tech City, TC 10101</p>
                <p className="text-gray-400 mt-2">contact@techsolutions.com</p>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} TechSolutions. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalAboutPage;
