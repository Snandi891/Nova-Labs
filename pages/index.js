// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  AcademicCapIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

// Counter animation component
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let duration = 2000;
    let incrementTime = Math.abs(Math.floor(duration / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

// Achievement Card
const AchievementCard = ({ icon: Icon, title, target, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center"
    >
      <div className="flex justify-center mb-4">
        <Icon className="h-12 w-12 text-indigo-500" />
      </div>
      <h3 className="text-4xl font-bold text-indigo-600">
        {inView && <Counter target={target} />}+
      </h3>
      <p className="text-gray-700 mt-2">{title}</p>
    </motion.div>
  );
};

const App = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("websites");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  const roles = [
    "Ethical Hacking",
    "Network Security",
    "Bug Bounty",
    "Malware Analysis",
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!deleting && charIndex <= currentRole.length) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 120);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, 80);
    } else {
      setDeleting(!deleting);
      if (!deleting) {
        timeout = setTimeout(() => {}, 1000);
      } else {
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);

    const audio = new Audio("/song/sucess.mp3");
    audio.play();

    setTimeout(() => {
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
      setCartItems([]);
      localStorage.removeItem("cartItems"); // 🟢 Clear cart from localStorage
    }, 3000);
  };

  // Example coupons
  const validCoupons = {
    SAVE10: 10,
    SAVE20: 20,
    SAVE50: 50,
  };

  // 🟢 Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 🟢 Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const applyCoupon = () => {
    if (couponCode.trim() === "") {
      setCouponError("⚠️ Please enter a coupon code.");
      setDiscount(0);
      return;
    }

    const upperCode = couponCode.toUpperCase();

    if (validCoupons[upperCode]) {
      setDiscount(validCoupons[upperCode]);
      setCouponError("");
    } else {
      setCouponError("❌ Invalid coupon code.");
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = (subtotal - (subtotal * discount) / 100).toFixed(2);

  // Product data
  const products = {
    websites: [
      {
        id: 1,
        title: "E-commerce Website",
        description: "Fully responsive online store with payment gateway",
        price: 1999,
        features: [
          "Product Catalog",
          "Shopping Cart",
          "Payment Processing",
          "Order Management",
        ],
        icon: "🛒",
      },
      {
        id: 2,
        title: "Corporate Website",
        description: "Professional business website with CMS",
        price: 1499,
        features: [
          "Responsive Design",
          "Content Management",
          "Contact Forms",
          "SEO Optimized",
        ],
        icon: "🏢",
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "Elegant showcase for creative work",
        price: 899,
        features: [
          "Gallery Layouts",
          "Custom Animations",
          "Social Integration",
          "Contact Section",
        ],
        icon: "🎨",
      },
      {
        id: 4,
        title: "Blog Platform",
        description: "Content-focused website with authoring tools",
        price: 1299,
        features: [
          "User Management",
          "Comment System",
          "SEO Tools",
          "Analytics",
        ],
        icon: "📝",
      },
    ],
    apps: [
      {
        id: 5,
        title: "Mobile E-commerce App",
        description: "Native iOS/Android shopping experience",
        price: 2999,
        features: [
          "Push Notifications",
          "Payment Integration",
          "User Profiles",
          "Product Search",
        ],
        icon: "📱",
      },
      {
        id: 6,
        title: "Fitness Tracking App",
        description: "Activity monitoring with health integration",
        price: 2499,
        features: [
          "Workout Plans",
          "Progress Tracking",
          "Social Sharing",
          "Health API",
        ],
        icon: "💪",
      },
      {
        id: 7,
        title: "Restaurant Ordering App",
        description: "Food ordering and reservation system",
        price: 2199,
        features: [
          "Menu Management",
          "Table Booking",
          "Order Tracking",
          "Loyalty Program",
        ],
        icon: "🍽️",
      },
      {
        id: 8,
        title: "Task Management App",
        description: "Productivity tool for teams",
        price: 1799,
        features: [
          "Project Boards",
          "Team Collaboration",
          "Calendar Sync",
          "Reporting",
        ],
        icon: "✅",
      },
    ],
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "The e-commerce website increased our sales by 45% in the first quarter. Highly professional team!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, FitLife",
      content:
        "Our fitness app exceeded all expectations. Delivered ahead of schedule.",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, TasteBuds",
      content:
        "The restaurant app transformed our business during the pandemic.",
      rating: 4,
      avatar: "👩‍🍳",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // 👈 animation plays every time section enters view
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between each card
      },
    },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Head>
        <title>DevSolutions - Premium Websites & Apps</title>
        <meta
          name="description"
          content="Get custom websites and mobile applications built by professionals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation */}

      <nav className="bg-white/30 backdrop-blur-lg fixed w-full z-50 shadow-md border-b border-white/20">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center">
              {/* Brand Name */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 flex items-center"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-2xl px-4 py-2 rounded-xl shadow-md tracking-wide">
                  NovaLabs
                </div>
              </motion.div>

              {/* Desktop Links */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                  >
                    <Link
                      href={item.path}
                      className="relative text-gray-700 hover:text-indigo-600 font-medium tracking-wide text-sm transition-colors duration-300 group"
                    >
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center">
              {/* Cart */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-1 rounded-full text-gray-600 hover:text-indigo-600 transition duration-300 relative"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 md:hidden"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white/80 backdrop-blur-lg shadow-lg border-t border-white/20"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className="block pl-4 pr-6 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* card1 */}

            <div className="animate-fade-in mt-[-50px]  text-center md:text-left">
              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
              >
                Premium{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-lg">
                  Websites
                </span>{" "}
                &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 drop-shadow-lg">
                  Apps
                </span>{" "}
                for Your Business
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              >
                We craft high-performance websites & mobile apps that help your
                business grow, stand out, and succeed in today’s competitive
                market.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#products"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-transform"
                >
                  Explore Our Products
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/about"
                  className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:border-indigo-600 hover:shadow-md transition-all"
                >
                  View Portfolio
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-10"
              >
                <h2
                  className="font-bold text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 relative"
                  style={{ minHeight: "2.5rem" }}
                >
                  {text}
                  {/* Blinking cursor */}
                  <span
                    className="absolute inline-block w-[2px] h-7 bg-indigo-500 ml-1 animate-blink"
                    style={{ top: "0" }}
                  ></span>
                </h2>
              </motion.div>

              {/* Add this in your global CSS or Tailwind config */}
              <style>
                {`
                  @keyframes blink {
                    0%, 50%, 100% { opacity: 1; }
                    25%, 75% { opacity: 0; }
                  }
                  .animate-blink {
                    animation: blink 1s step-start infinite;
                  }
                  `}
              </style>

              {/* Avatars + Trusted */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="mt-12 flex items-center justify-center md:justify-start space-x-4"
              >
                <div className="flex -space-x-3">
                  {["A", "B", "C"].map((item, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="h-12 w-12 rounded-full ring-2 ring-white bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-lg font-bold shadow-lg"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-700 text-lg">
                  Trusted by{" "}
                  <span className="font-bold text-indigo-600">
                    500+ businesses
                  </span>{" "}
                  worldwide 🌍
                </p>
              </motion.div>
            </div>

            {/* card2 */}

            <div className="relative animate-float">
              {/* Animated background blobs */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-12 left-24 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

              {/* Card */}
              <div className="relative max-w-lg ml-auto mr-5 bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl hover:shadow-[0_0_50px_rgba(99,102,241,0.4)] transform hover:scale-105 transition-all duration-500 overflow-hidden">
                {/* Header with gradient */}
                <div className="h-64 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="text-center p-6 relative z-10">
                    <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                      🚀 Custom Solutions
                    </h3>
                    <p className="text-indigo-100 mt-3 text-lg md:text-xl">
                      Tailored to your business needs
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Browser-style top bar */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm md:text-base font-medium text-gray-600">
                      Starting at{" "}
                      <span className="font-semibold text-indigo-600">
                        $899
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="grid gap-4 mb-6">
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 md:p-5 rounded-xl hover:shadow-lg transition">
                      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-xl md:text-2xl font-bold">
                        💡
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold md:text-lg">
                          Innovative Ideas
                        </p>
                        <p className="text-gray-500 text-sm md:text-base">
                          Fresh and modern solutions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 md:p-5 rounded-xl hover:shadow-lg transition">
                      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 text-white text-xl md:text-2xl font-bold">
                        ⚡
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold md:text-lg">
                          Fast Delivery
                        </p>
                        <p className="text-gray-500 text-sm md:text-base">
                          Quick turnaround time
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons with gradient shimmer */}
                  <div className="flex justify-center space-x-4">
                    <button className="px-6 py-3 md:px-8 md:py-4 font-semibold rounded-lg text-white relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-lg hover:scale-105 transition transform duration-300">
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-50 animate-gradient-shimmer"></span>
                      <span className="relative">Learn More</span>
                    </button>
                    <button className="px-6 py-3 md:px-8 md:py-4 font-semibold rounded-lg text-indigo-600 relative overflow-hidden border border-indigo-600 bg-white shadow hover:scale-105 transition transform duration-300">
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white/50 to-indigo-100 opacity-30 animate-gradient-shimmer"></span>
                      <span className="relative">Get Started</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section
        id="products"
        className="py-16 bg-gradient-to-b from-white to-indigo-50"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium">
              Our Products
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Premium Websites & Apps
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose from our professionally crafted solutions
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setActiveTab("websites")}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                  activeTab === "websites"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Websites
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("apps")}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                  activeTab === "apps"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Mobile Apps
              </button>
            </div>
          </div>

          {/* Product Grid with Animations */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4"
              >
                {products[activeTab].map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="p-6">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-2xl">
                          {product.icon}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-gray-900">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          Features:
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="ml-2 text-gray-600">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price & Button */}
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-md hover:opacity-90"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div
        className="py-16 bg-gradient-to-b from-white to-indigo-50"
        data-aos="fade-right"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium">
              Features
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Cutting-Edge Technology
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our solutions incorporate the latest technologies for maximum
              performance
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Optimized for maximum speed with modern frameworks",
              },
              {
                icon: "🔒",
                title: "Secure by Design",
                description:
                  "Enterprise-grade security with encryption and audits",
              },
              {
                icon: "📱",
                title: "Fully Responsive",
                description: "Flawless experience on all devices",
              },
              {
                icon: "🔍",
                title: "SEO Optimized",
                description:
                  "Built with SEO best practices for better rankings",
              },
              {
                icon: "🔄",
                title: "Regular Updates",
                description: "Continuous improvements to keep you competitive",
              },
              {
                icon: "🛟",
                title: "24/7 Support",
                description:
                  "Dedicated support team available around the clock",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16  bg-transparent" data-aos="zoom-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-6">
                  <p className="text-lg text-gray-600">
                    "{testimonial.content}"
                  </p>
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* achivements */}
      <div>
        <section
          ref={ref}
          className="py-16 px-4 text-center bg-transparent"
          id="achievements"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            Our Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-gray-600 mb-12"
          >
            Numbers that show our trust and excellence
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AchievementCard
              icon={AcademicCapIcon}
              title="Websites Built"
              target={50}
              inView={inView}
            />
            <AchievementCard
              icon={UsersIcon}
              title="Happy Clients"
              target={10}
              inView={inView}
            />
            <AchievementCard
              icon={ClockIcon}
              title="24/7 Support"
              target={24}
              inView={inView}
            />
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-400 overflow-hidden">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="flex flex-col items-start sm:items-center md:items-start">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-2xl px-4 py-2 rounded-xl shadow-lg mb-4 animate-pulse">
                NovaLabs
              </div>
              <p className="text-gray-400 text-center sm:text-center md:text-left">
                Professional website and app development services for businesses
                of all sizes.
              </p>
              <div className="mt-4 flex space-x-4">
                {/* Social Icons */}
                {[
                  {
                    name: "Facebook",
                    icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                  },
                  {
                    name: "Twitter",
                    icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                  },
                  {
                    name: "LinkedIn",
                    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-gray-800 hover:bg-indigo-600 transition-colors duration-300 p-3 rounded-full shadow-lg hover:shadow-indigo-400 hover:scale-110 transform"
                    aria-label={social.name}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                Products
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                {[
                  "Websites",
                  "Mobile Apps",
                  "E-commerce",
                  "Custom Solutions",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a className="relative hover:text-white transition-colors duration-200 cursor-pointer">
                      {item}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                {["About Us", "Careers", "Blog", "Contact"].map((item, idx) => (
                  <li key={idx}>
                    <a className="relative hover:text-white transition-colors duration-200 cursor-pointer">
                      {item}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a className="relative hover:text-white transition-colors duration-200 cursor-pointer">
                        {item}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2023 NovaLabs. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    className="relative hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Optional subtle gradient overlay for extra premium effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 opacity-10 pointer-events-none"></div>
      </footer>

      {/* Cart Section */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-white/90 backdrop-blur-2xl shadow-2xl z-50 flex flex-col"
          >
            {/* Cart Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✖
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  🛍️ Your cart is empty
                </p>
              ) : (
                cartItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-center bg-white shadow-sm p-3 rounded-xl border border-gray-100"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-500">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Coupon Input */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm">{couponError}</p>
              )}
              {discount > 0 && (
                <p className="text-green-600 text-sm">
                  ✅ {discount}% discount applied
                </p>
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </p>
              {discount > 0 && (
                <p className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-{discount}%</span>
                </p>
              )}
              <p className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total:</span>
                <span>₹{total}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-cream-100 to-blue-200 animate-gradient-x"></div>
          <div className="absolute inset-0 backdrop-blur-md"></div>

          {/* Success Card */}
          <div className="relative bg-white/30 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 border border-white/40 shadow-2xl animate-fadeIn">
            {/* Check Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-bounce">
                <svg
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              🎉 Order Successful!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Your order has been placed successfully. <br /> We’ll contact you
              shortly.
            </p>

            {/* Loader */}
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:opacity-90"
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-indigo-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
