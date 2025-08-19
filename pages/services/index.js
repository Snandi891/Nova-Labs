import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";

const productsData = [
  {
    id: 1,
    type: "web",
    title: "E-commerce Website",
    description: "Fully responsive online store",
    price: 1999,
    features: ["Product Catalog", "Cart", "Payment"],
    icon: "🛒",
  },
  {
    id: 2,
    type: "web",
    title: "Corporate Website",
    description: "Professional business website",
    price: 1499,
    features: ["Responsive Design", "CMS", "SEO"],
    icon: "🏢",
  },
  {
    id: 3,
    type: "app",
    title: "Mobile E-commerce App",
    description: "Native iOS/Android shopping experience",
    price: 2999,
    features: ["Push Notifications", "Payment Integration"],
    icon: "📱",
  },
  {
    id: 4,
    type: "app",
    title: "Fitness Tracking App",
    description: "Activity monitoring with health integration",
    price: 2499,
    features: ["Workout Plans", "Progress Tracking"],
    icon: "💪",
  },
  {
    id: 5,
    type: "web",
    title: "Portfolio Website",
    description: "Elegant showcase for creative work",
    price: 899,
    features: ["Gallery Layouts", "Custom Animations"],
    icon: "🎨",
  },
  {
    id: 6,
    type: "app",
    title: "Restaurant Ordering App",
    description: "Food ordering and reservation system",
    price: 2199,
    features: ["Menu Management", "Table Booking"],
    icon: "🍽️",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
};

const ProductsPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollY } = useViewportScroll();

  // Parallax offsets
  const blob1Y = useTransform(scrollY, [0, 1000], [0, -50]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, 70]);
  const blob3Y = useTransform(scrollY, [0, 1000], [0, -30]);

  const filteredProducts = productsData
    .filter((p) => (filterType === "all" ? true : p.type === filterType))
    .filter((p) => (priceFilter ? p.price <= priceFilter : true))
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

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
        className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
      ></motion.div>
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"
      ></motion.div>
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-28 left-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"
      ></motion.div>

      {/* Header */}
      <div className="relative z-10 text-center pt-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-block bg-white/30 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg"
        >
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            Premium Websites & Apps
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
            Explore modern, high-quality solutions with neon-style highlights.
          </p>
        </motion.div>
        {/* backbutton */}
        {/* Back Button (Top Left Corner) */}
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

        {/* Filters & Search */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 items-center">
          <select
            className="px-4 py-2 rounded-lg border border-gray-300"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="web">Websites</option>
            <option value="app">Apps</option>
          </select>
          <input
            type="number"
            placeholder="Max Price"
            className="px-4 py-2 rounded-lg border border-gray-300 w-36"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
          <input
            type="text"
            placeholder="Search by title..."
            className="px-4 py-2 rounded-lg border border-gray-300 w-48"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filterType}-${priceFilter}-${sortOrder}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(99,102,241,0.6)",
                }}
                className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 transform transition-all duration-500"
              >
                {/* Neon Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-3xl text-transparent bg-clip-text hover:drop-shadow-lg transition duration-300">
                    {product.icon}
                  </div>
                </div>

                {/* Neon Title */}
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-center drop-shadow-md">
                  {product.title}
                </h3>
                <p className="mt-2 text-gray-700 text-center">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Features:
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-400"
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
                        <span className="ml-2 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* See More WhatsApp Button */}
                <div className="mt-6 flex justify-center">
                  <a
                    href={`https://wa.me/917865089698?text=${encodeURIComponent(
                      `Hello, I am interested in your product: ${product.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white text-sm font-medium rounded-md hover:opacity-90 hover:scale-105 transition transform duration-300"
                  >
                    See More
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsPage;
