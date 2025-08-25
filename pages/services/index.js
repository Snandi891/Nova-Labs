import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import SocialButtons from "../sample";

const ProductsPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { scrollY } = useViewportScroll();

  // Parallax offsets
  const blob1Y = useTransform(scrollY, [0, 1000], [0, -50]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, 70]);
  const blob3Y = useTransform(scrollY, [0, 1000], [0, -30]);

  // Parallax effects
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.9]);
  const headerScale = useTransform(scrollY, [0, 200], [1, 0.98]);

  // Sample product data
  const productsData = [
    {
      id: 1,
      type: "web",
      title: "E-commerce Platform",
      description: "Complete online store solution with inventory management",
      price: 999,
      features: [
        "Product Catalog",
        "Shopping Cart",
        "Payment Gateway",
        "Admin Dashboard",
        "Inventory Management",
      ],
      icon: "🛒",
      popularity: 95,
      delivery: "14 days",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      type: "web",
      title: "Corporate Website",
      description:
        "Professional business website with CMS and SEO optimization",
      price: 499,
      features: [
        "Responsive Design",
        "Content Management",
        "SEO Optimization",
        "Contact Forms",
        "Analytics Integration",
      ],
      icon: "🏢",
      popularity: 85,
      delivery: "10 days",
      tech: ["Next.js", "Tailwind CSS", "Strapi"],
    },
    {
      id: 3,
      type: "app",
      title: "Mobile E-commerce App",
      description:
        "Native iOS/Android shopping experience with push notifications",
      price: 699,
      features: [
        "Push Notifications",
        "Payment Integration",
        "User Profiles",
        "Order Tracking",
        "Wishlists",
      ],
      icon: "📱",
      popularity: 92,
      delivery: "21 days",
      tech: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 4,
      type: "app",
      title: "Fitness Tracking App",
      description:
        "Activity monitoring with health integration and personalized plans",
      price: 499,
      features: [
        "Workout Plans",
        "Progress Tracking",
        "Health Data Sync",
        "Custom Goals",
        "Social Sharing",
      ],
      icon: "💪",
      popularity: 88,
      delivery: "18 days",
      tech: ["Flutter", "GraphQL", "AWS"],
    },
    {
      id: 5,
      type: "web",
      title: "Portfolio Website",
      description: "Elegant showcase for creative work with custom animations",
      price: 299,
      features: [
        "Gallery Layouts",
        "Custom Animations",
        "Project Filtering",
        "Testimonial Section",
        "Contact Form",
      ],
      icon: "🎨",
      popularity: 78,
      delivery: "7 days",
      tech: ["GSAP", "Three.js", "Framer Motion"],
    },
    {
      id: 6,
      type: "app",
      title: "Restaurant Ordering App",
      description: "Food ordering and reservation system with table management",
      price: 899,
      features: [
        "Menu Management",
        "Table Booking",
        "Order Tracking",
        "Loyalty Program",
        "Admin Dashboard",
      ],
      icon: "🍽️",
      popularity: 90,
      delivery: "16 days",
      tech: ["React Native", "Node.js", "MongoDB"],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 25 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Filter products
  const filteredProducts = productsData
    .filter((p) => (filterType === "all" ? true : p.type === filterType))
    .filter((p) => (priceFilter ? p.price <= priceFilter : true))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.features.some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      if (sortOrder === "popular") return b.popularity - a.popularity;
      return 0;
    });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update active filters
  useEffect(() => {
    const filters = [];
    if (filterType !== "all") filters.push(`${filterType} products`);
    if (priceFilter) filters.push(`under $${priceFilter}`);
    if (searchQuery) filters.push(`"${searchQuery}"`);

    setActiveFilters(filters);
  }, [filterType, priceFilter, searchQuery]);

  const clearFilters = () => {
    setFilterType("all");
    setPriceFilter("");
    setSortOrder("");
    setSearchQuery("");
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
      {/* Background animated blobs with parallax */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
      ></motion.div>
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"
      ></motion.div>
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-28 left-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"
      ></motion.div>
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
      ></motion.div>
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"
      ></motion.div>
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-28 left-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"
      ></motion.div>

      {/* Header */}
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative z-10 text-center pt-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Premium Digital Projects
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Discover websites and applications for your business needs
          </p>
        </motion.div>

        <div className="fixed top-6 left-6 z-50">
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

        {/* Mobile filter toggle */}
        <div className="mt-6 block lg:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-6 py-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-shadow"
          >
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </motion.button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`mt-8 flex flex-wrap justify-center gap-4 items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white max-w-4xl mx-auto ${
            isFilterOpen ? "block" : "hidden lg:flex"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <select
              className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="web">Websites</option>
              <option value="app">Apps</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="number"
              placeholder="Max Price"
              className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-36 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
            </div>
            <select
              className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {(filterType !== "all" ||
            priceFilter ||
            searchQuery ||
            sortOrder) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Clear Filters
            </motion.button>
          )}
        </motion.div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex justify-center flex-wrap gap-2 max-w-4xl mx-auto"
          >
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {filter}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Products Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-96"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.1 },
                  }}
                >
                  <div className="animate-pulse">
                    <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded mt-6"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`${filterType}-${priceFilter}-${sortOrder}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    layout
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transform transition-all duration-500 flex flex-col h-full group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="p-6 flex-grow">
                      {/* Icon with gradient background */}
                      <div className="flex justify-center mb-4">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-3xl text-transparent bg-clip-text hover:drop-shadow-lg transition duration-300"
                        >
                          {product.icon}
                        </motion.div>
                      </div>

                      {/* Product Type Badge */}
                      <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 bg-blue-100 text-blue-800">
                        {product.type === "web" ? "Website" : "Mobile App"}
                      </div>

                      {/* Title with gradient text */}
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-gray-600 text-center text-sm mb-4">
                        {product.description}
                      </p>

                      {/* Price and Delivery */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Delivery: {product.delivery}
                        </div>
                      </div>

                      {/* Popularity Meter */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Popularity</span>
                          <span>{product.popularity}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${product.popularity}%` }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
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
                              <span className="ml-2 text-gray-600 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                          {product.features.length > 3 && (
                            <li className="text-sm text-blue-600 font-medium">
                              +{product.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">
                      {selectedProduct.type === "web"
                        ? "Website"
                        : "Mobile App"}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProduct.title}
                    </h2>
                    <p className="text-gray-600">
                      {selectedProduct.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="text-blue-600 font-bold">
                          ${selectedProduct.price}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Time:</span>
                        <span className="text-gray-800">
                          {selectedProduct.delivery}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Popularity:</span>
                        <span className="text-gray-800">
                          {selectedProduct.popularity}%
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
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
                          <span className="ml-2 text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <a
                    href={`https://wa.me/917865089698?text=${encodeURIComponent(
                      `Hello 👋, I am interested in your ${
                        selectedProduct.type === "web" ? "website" : "app"
                      } product: ${selectedProduct.title}\n\n💰 Price: $${
                        selectedProduct.price
                      }\n⚡ Delivery: ${
                        selectedProduct.delivery
                      }\n⭐ Popularity: ${
                        selectedProduct.popularity
                      }%\n\nCould you share more details?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all flex items-center gap-3"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                    </svg>
                    <span className="text-lg">Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-400 overflow-hidden justify-end">
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

export default ProductsPage;
