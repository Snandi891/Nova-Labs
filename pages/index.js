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
import SocialButtons from "./sample";

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
    "Static Website & App",
    "Dynamic Website & App",
    "Admin Panel Web & App",
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

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const handleCheckout = () => {
    setIsCheckoutOpen(true);

    // ✅ Play success audio
    const audio = new Audio("/song/sucess.mp3");
    audio.play();

    // ✅ Prepare order details
    const orderSummary = cartItems
      .map((item, index) => `   ${index + 1}. ${item.title} - ₹${item.price}`)
      .join("\n");

    // ✅ Format date & time
    const now = new Date();
    const orderDate = now.toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
    });

    // ✅ WhatsApp Message with Unicode emojis & professional formatting
    const message = `
[Cart] New Order Received!

[Customer Details]
- Name: ${userName}
- Email: ${userEmail}
- Phone: ${userPhone}

[Order Items]
${orderSummary}

[Summary]
- Subtotal: ₹${subtotal}
- Discount: ${discount}%
- Total: ₹${total}

[Order Date & Time]
${orderDate}

Thank you for shopping with us!
`;

    // ✅ Wait 3s → close cart → open WhatsApp
    setTimeout(() => {
      setIsCartOpen(false);
      setIsCheckoutOpen(false);

      // Clear cart
      setCartItems([]);
      localStorage.removeItem("cartItems");

      // Open WhatsApp with proper UTF-8 encoding
      const whatsappUrl = `https://wa.me/917865089698?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
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
        price: 999,
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
        price: 499,
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
        description:
          "Elegant showcase for creative work and make your portfolio shine",
        price: 299,
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
        price: 799,
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
        price: 699,
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
        price: 499,
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
        price: 899,
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
        description: "Productivity tool for teams and task app",
        price: 799,
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
    { name: "sample", path: "/sample" },
  ];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    projectType: "Website",
    siteType: "Static",
    price: "",
    name: "",
    location: "",
    email: "",
    phone: "",
    lastDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const message = `New Project Request 🚀
      
  Type: ${form.projectType}
  Site: ${form.siteType}
  Price Range: ${form.price}
  Name: ${form.name}
  Location: ${form.location}
  Email: ${form.email}
  Phone: ${form.phone}
  Last Date: ${form.lastDate}`;

    const whatsappUrl = `https://wa.me/917865089689?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100  ">
      <Head>
        <title>DevSolutions - Premium Websites & Apps</title>
        <meta
          name="description"
          content="Get custom websites and mobile applications built by professionals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation */}

      <nav className="bg-white/40 backdrop-blur-xl fixed w-full z-50 shadow-lg border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center">
              {/* Brand Name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-shrink-0 flex items-center"
              >
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-xl px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    NovaLabs
                  </span>
                </div>
              </motion.div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:ml-12 md:flex md:space-x-10">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className="relative text-slate-700 hover:text-indigo-600 font-medium text-sm transition-colors duration-300 group py-2"
                    >
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-white/50 transition-all duration-300 relative group"
                aria-label="Shopping cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-white/50 transition-colors duration-300"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/90 backdrop-blur-2xl shadow-xl border-t border-white/30 overflow-hidden"
            >
              <div className="pt-2 pb-4 space-y-1">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className="block pl-4 pr-6 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-md transition-colors duration-300 font-medium mx-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Card (Heading + Content) */}
            <div className="animate-fade-in -mt-36 text-center md:text-left">
              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
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
                className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0"
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
                className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#products"
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-transform text-sm sm:text-base"
                >
                  Explore Our Products
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/about"
                  className="px-6 sm:px-8 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:border-indigo-600 hover:shadow-md transition-all text-sm sm:text-base"
                >
                  View Portfolio
                </motion.a>
              </motion.div>

              {/* Typing Effect Heading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 sm:mt-10"
              >
                <h2
                  className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 relative"
                  style={{ minHeight: "2rem" }}
                >
                  {text}
                  {/* Blinking cursor */}
                  <span
                    className="absolute inline-block w-[2px] h-6 sm:h-7 bg-indigo-500 ml-1 animate-blink"
                    style={{ top: "0" }}
                  ></span>
                </h2>
              </motion.div>

              {/* Blink Animation */}
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
                className="mt-10 flex  items-center justify-center md:justify-start space-x-4"
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
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-sm sm:text-lg font-bold shadow-lg"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                  Trusted by{" "}
                  <span className="font-bold text-indigo-600">
                    10+ businesses
                  </span>{" "}
                  worldwide 🌍
                </p>
              </motion.div>
              <div className="text-center lg:text-left">
                <div className="flex pl-33.5 items-center justify-center lg:justify-start gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 text-sm ml-1">5.0</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative animate-float">
              {/* Background Blobs */}
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full filter blur-3xl opacity-60 animate-blob bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full filter blur-3xl opacity-60 animate-blob animation-delay-2000 bg-gradient-to-tr from-purple-500 to-pink-500"></div>
              <div className="absolute top-12 left-12 w-40 h-40 rounded-full filter blur-3xl opacity-60 animate-blob animation-delay-4000 bg-gradient-to-tr from-pink-500 to-indigo-500"></div>

              {/* Card */}
              <div className="relative max-w-lg mx-auto md:mr-5 bg-white/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-[1.03] transition-all duration-500 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center relative py-10">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="text-center relative z-10 px-6">
                    <h3 className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                      🚀 Custom Solutions
                      <span className="block h-1 mt-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 rounded-full animate-pulse"></span>
                    </h3>
                    <p className="text-indigo-100 mt-3 text-lg md:text-xl">
                      Tailored to your business needs
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Browser Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Starting at{" "}
                      <span className="font-bold text-indigo-600">₹ 299</span>
                    </div>
                  </div>
                  {/* Features */}
                  <div className="grid gap-4 mb-6 sm:grid-cols-2">
                    {[
                      {
                        icon: "💡",
                        title: "Innovative Ideas",
                        desc: "Fresh & modern",
                      },
                      {
                        icon: "⚡",
                        title: "Fast & Scalable",
                        desc: "Future-proof tech",
                      },
                      {
                        icon: "🎨",
                        title: "Beautiful Design",
                        desc: "Eye-catching UI",
                      },
                    ].map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition"
                      >
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-2xl font-bold">
                          {f.icon}
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold">
                            {f.title}
                          </p>
                          <p className="text-gray-500 text-sm">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Buttons */}
                  <div className="px-8  text-center">
                    <motion.button
                      onClick={() => setOpen(true)}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 25px #9333ea",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl border border-purple-400/40 relative overflow-hidden group"
                    >
                      <span className="relative z-10">✨ Get Started</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal */}
            {open && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(8px)",
                  padding: "1rem",
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "1.5rem",
                    boxShadow: "0 0 25px rgba(168,85,247,0.4)",
                    padding: "2rem",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE & Edge
                  }}
                >
                  {/* Hide scrollbar for WebKit */}
                  <style>
                    {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
                  </style>

                  {/* Close button */}
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      fontSize: "1.2rem",
                      color: "#d1d5db",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#d1d5db")
                    }
                  >
                    ✖
                  </button>

                  {/* Heading */}
                  <h2
                    style={{
                      fontSize: "1.875rem",
                      fontWeight: "800",
                      marginBottom: "1.5rem",
                      textAlign: "center",
                      background:
                        "linear-gradient(to right, #818cf8, #a855f7, #ec4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                    }}
                  >
                    🚀 Project Details
                  </h2>

                  {/* Form */}
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    {/* Select Fields */}
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        borderRadius: "0.75rem",
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "0.75rem",
                        outline: "none",
                      }}
                    >
                      <option style={{ color: "#111" }}>Website</option>
                      <option style={{ color: "#111" }}>App</option>
                    </select>

                    <select
                      name="siteType"
                      value={form.siteType}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        borderRadius: "0.75rem",
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "0.75rem",
                        outline: "none",
                      }}
                    >
                      <option style={{ color: "#111" }}>Static</option>
                      <option style={{ color: "#111" }}>Dynamic</option>
                    </select>

                    {/* Input Fields */}
                    {[
                      { type: "text", name: "price", label: "Price Range" },
                      { type: "text", name: "name", label: "Your Name" },
                      { type: "text", name: "location", label: "Location" },
                      { type: "email", name: "email", label: "Email" },
                      { type: "tel", name: "phone", label: "Phone Number" },
                      { type: "date", name: "lastDate", label: "Last Date" },
                    ].map((field) => (
                      <div key={field.name} style={{ position: "relative" }}>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.label}
                          style={{
                            width: "100%",
                            borderRadius: "0.75rem",
                            background: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.2)",
                            padding: "0.75rem",
                            outline: "none",
                          }}
                        />
                        <label
                          style={{
                            position: "absolute",
                            left: "0.75rem",
                            top: "-0.6rem",
                            fontSize: "0.85rem",
                            color: "#d1d5db",
                            background: "rgba(0,0,0,0.4)",
                            padding: "0 0.25rem",
                            borderRadius: "0.25rem",
                          }}
                        >
                          {field.label}
                        </label>
                      </div>
                    ))}

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      style={{
                        marginTop: "1.5rem",
                        width: "100%",
                        borderRadius: "0.75rem",
                        padding: "0.75rem",
                        fontWeight: "600",
                        color: "#fff",
                        background:
                          "linear-gradient(to right, #6366f1, #9333ea, #ec4899)",
                        boxShadow: "0 0 20px rgba(236,72,153,0.6)",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      Submit on WhatsApp
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section
        id="products"
        className="py-12 md:py-10 bg-gradient-to-br from-slate-50 to-indigo-50/30 relative overflow-hidden"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 mr-1.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Our Products
            </span>
            <h2 className="mt-4 text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
              Premium Digital Solutions
            </h2>
            <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto md:text-lg md:mt-4">
              Custom-built websites and mobile applications designed to elevate
              your digital presence.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10 md:mb-14">
            <div
              className="inline-flex bg-gray-100 p-1 rounded-lg md:p-1.5 md:rounded-xl shadow-sm"
              role="group"
            >
              <button
                type="button"
                onClick={() => setActiveTab("websites")}
                className={`flex items-center px-4 py-2 md:px-6 md:py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "websites"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-2 ${
                    activeTab === "websites"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
                <span className="hidden xs:inline">Websites</span>
                <span className="xs:hidden">Web</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("apps")}
                className={`flex items-center px-4 py-2 md:px-6 md:py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "apps"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-2 ${
                    activeTab === "apps" ? "text-indigo-600" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="hidden xs:inline">Mobile Apps</span>
                <span className="xs:hidden">Apps</span>
              </button>
            </div>
          </div>

          {/* Product Grid with Animations */}
          <div className="mt-8 md:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {products[activeTab].map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    className="group bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 relative"
                  >
                    <div className="absolute top-3 right-3 md:top-4 md:right-4">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="p-4 md:p-6">
                      {/* Icon */}
                      <div className="flex justify-center mb-4 md:mb-6">
                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl md:rounded-2xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center">
                        {product.title}
                      </h3>
                      <p className="mt-2 md:mt-3 text-sm text-gray-600 text-center md:leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
                        <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3 flex items-center">
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-indigo-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Key Features
                        </h4>
                        <ul className="space-y-1.5 md:space-y-2.5">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                className="h-3 w-3 md:h-4 md:w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-gray-600 text-xs md:text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price & Button */}
                      <div className="mt-6 md:mt-8 flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-3 xs:space-y-0">
                        <div>
                          <span className="text-xl md:text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <span className="text-xs text-gray-500 block">
                            one-time payment
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs md:text-sm font-medium rounded-lg shadow-md shadow-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
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
        className="py-10 bg-gradient-to-br from-slate-50 to-indigo-50/30"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium tracking-wider uppercase shadow-lg shadow-indigo-500/10">
              Premium Features
            </span>
            <h2 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl">
              Cutting-Edge Technology
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Our innovative solutions incorporate the latest technologies for
              unmatched performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Optimized for maximum speed with modern frameworks and performance enhancements",
              },
              {
                icon: "🔒",
                title: "Secure by Design",
                description:
                  "Enterprise-grade security with end-to-end encryption and regular security audits",
              },
              {
                icon: "📱",
                title: "Fully Responsive",
                description:
                  "Flawless experience across all devices with adaptive design principles",
              },
              {
                icon: "🔍",
                title: "SEO Optimized",
                description:
                  "Built with SEO best practices to ensure better rankings and online visibility",
              },
              {
                icon: "🔄",
                title: "Regular Updates",
                description:
                  "Continuous improvements and feature enhancements to keep you ahead of competition",
              },
              {
                icon: "🛟",
                title: "24/7 Support",
                description:
                  "Dedicated support team available around the clock to assist with any issues",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300 mb-6">
                  <span className="text-2xl text-white">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16  bg-transparent" data-aos="zoom-in">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium tracking-wider uppercase shadow-lg shadow-indigo-500/20 mb-4">
              Testimonials
            </span>
            <h2 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              Don't just take our word for it — hear from our satisfied
              customers
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3 ml-16">
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
              target={10}
              inView={inView}
            />
            <AchievementCard
              icon={UsersIcon}
              title="Happy Clients"
              target={8}
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
        <div className="max-w-7xl  py-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
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

            {/* User Info Inputs */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
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
