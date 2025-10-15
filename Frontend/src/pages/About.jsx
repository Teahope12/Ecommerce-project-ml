import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 mt-10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover our story and what makes us unique.
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src="../assets/images/model.jpg"
                alt="Clothing Product"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-900">
                Our Products
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                We offer a diverse range of high-quality clothing designed to suit every style and occasion. Our collection is crafted with attention to detail and a commitment to excellence.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-gray-900">
            Our Mission
          </h3>
          <p className="mt-4 text-lg text-gray-500">
            To provide stylish and affordable clothing that empowers individuals to express themselves confidently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
