// app/page.jsx
import Head from "next/head";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WebsiteAppSellingPlatform() {
  const [activeTab, setActiveTab] = useState("websites");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Mock data for products
  const products = {
    websites: [
      {
        id: 1,
        title: "E-commerce Website",
        description:
          "Fully responsive online store with payment gateway integration",
        price: 1999,
        features: [
          "Product Catalog",
          "Shopping Cart",
          "Payment Processing",
          "Order Management",
        ],
        image: "/ecommerce.svg",
      },
      {
        id: 2,
        title: "Corporate Website",
        description: "Professional business website with CMS integration",
        price: 1499,
        features: [
          "Responsive Design",
          "Content Management",
          "Contact Forms",
          "SEO Optimized",
        ],
        image: "/corporate.svg",
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "Elegant showcase for your creative work",
        price: 899,
        features: [
          "Gallery Layouts",
          "Custom Animations",
          "Social Integration",
          "Contact Section",
        ],
        image: "/portfolio.svg",
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
        image: "/blog.svg",
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
        image: "/mobile-ecommerce.svg",
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
          "Health API Integration",
        ],
        image: "/fitness.svg",
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
        image: "/restaurant.svg",
      },
      {
        id: 8,
        title: "Task Management App",
        description: "Productivity tool for teams and individuals",
        price: 1799,
        features: [
          "Project Boards",
          "Team Collaboration",
          "Calendar Sync",
          "Reporting",
        ],
        image: "/task.svg",
      },
    ],
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "The e-commerce website they built increased our sales by 45% in the first quarter. Highly professional and responsive team!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, FitLife",
      content:
        "Our fitness app exceeded all expectations. The development process was smooth and they delivered ahead of schedule.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, TasteBuds",
      content:
        "The restaurant ordering app transformed our business during the pandemic. Customer engagement is at an all-time high.",
      rating: 4,
    },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>DevSolutions - Premium Websites & Apps</title>
        <meta
          name="description"
          content="Get custom websites and mobile applications built by professionals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-lg">
                  DevSolutions
                </div>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a
                  href="#"
                  className="text-gray-900 border-b-2 border-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Portfolio
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none relative"
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
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="ml-2 hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                Get Started
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none md:hidden"
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
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              >
                Portfolio
              </a>
              <a
                href="#"
                className="text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Premium <span className="text-indigo-600">Websites</span> &{" "}
                <span className="text-indigo-600">Apps</span> for Your Business
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                We build custom, high-performance websites and mobile
                applications that help your business grow and stand out from the
                competition.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Explore Our Products
                </button>
                <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  View Portfolio
                </button>
              </div>
              <div className="mt-12 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt=""
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt=""
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt=""
                  />
                </div>
                <p className="text-gray-600">
                  Trusted by <span className="font-semibold">500+</span>{" "}
                  businesses worldwide
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-0 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-white text-2xl font-bold">
                      Custom Solutions
                    </h3>
                    <p className="text-indigo-100 mt-2">
                      Tailored to your business needs
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Starting at $899
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex space-x-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Premium Products
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose from our professionally crafted websites and applications
            </p>
          </div>

          <div className="mt-12">
            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setActiveTab("websites")}
                  className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                    activeTab === "websites"
                      ? "bg-indigo-600 text-white"
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
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Mobile Apps
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
              {products[activeTab].map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex justify-center mb-6">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{product.description}</p>
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
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
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
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
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
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
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

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your business?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Let's build something amazing together. Get in touch with us today
              for a free consultation.
            </p>
            <div className="mt-10">
              <form onSubmit={handleSubscribe} className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full sm:mt-0 sm:ml-3 sm:flex-shrink-0 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                >
                  Get Started
                </button>
              </form>
              {subscribed && (
                <p className="mt-3 text-sm text-green-300">
                  Thank you for subscribing! We'll be in touch soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="bg-indigo-600 text-white font-bold text-xl px-3 py-2 rounded-lg inline-block">
                DevSolutions
              </div>
              <p className="mt-4 text-gray-400">
                Professional website and app development services for businesses
                of all sizes.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Products
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Websites
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    E-commerce
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Custom Solutions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 DevSolutions. All rights reserved.
            </p>
            <div className="mt-6 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsCartOpen(false)}
            ></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className=" max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </h2>
                      <button
                        type="button"
                        className="ml-3 h-7 flex items-center"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <svg
                          className="h-6 w-6 text-gray-500 hover:text-gray-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
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

                    <div className="mt-8">
                      <div className="flow-root">
                        {cartItems.length === 0 ? (
                          <div className="text-center py-12">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              Your cart is empty
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Start adding some products to your cart
                            </p>
                          </div>
                        ) : (
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((product) => (
                              <li key={product.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                                </div>
                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.title}</h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                      {activeTab === "websites"
                                        ? "Website"
                                        : "Mobile App"}
                                    </div>
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => removeFromCart(product.id)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          $
                          {cartItems.reduce((sum, item) => sum + item.price, 0)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none">
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text-indigo-600 font-medium hover:text-indigo-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  );
}
