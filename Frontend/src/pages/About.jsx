import React from 'react';

function About() {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 mt-10 py-12 rounded-3xl shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center animate-slide-up">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl transition duration-300">
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our story and what makes us unique.
          </p>
        </div>

        <div className="mt-10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative group">
              <img
                src="../public/R.jpg"
                alt="Clothing Product"
                className="w-full h-auto object-cover rounded-xl shadow-xl transform transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center animate-slide-up">
              <h3 className="text-2xl font-semibold text-gray-800">
                Our Products
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                We offer a diverse range of high-quality clothing designed to suit every style and occasion. Our collection is crafted with attention to detail and a commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-slide-up">
          <h3 className="text-2xl font-semibold text-gray-800">
            Our Mission
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            To provide stylish and affordable clothing that empowers individuals to express themselves confidently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
