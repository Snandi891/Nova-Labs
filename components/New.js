{
  /* Products Section */
}
<section
  id="products"
  className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30 relative overflow-hidden"
  data-aos="fade-up"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header */}
    <div className="text-center mb-12 md:mb-16">
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
        Custom-built websites and mobile applications designed to elevate your
        digital presence.
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
              activeTab === "websites" ? "text-indigo-600" : "text-gray-400"
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
</section>;
