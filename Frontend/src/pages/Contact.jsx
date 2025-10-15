import React from 'react';

function Contact() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Details
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Get in touch with us through the following channels.
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-900">Our Office</h3>
              <p className="mt-4 text-lg text-gray-500">
                123 Fashion Street, Mumbai, Maharashtra, India
              </p>
              <p className="mt-2 text-lg text-gray-500">
                <strong>Phone:</strong> +91 123 456 7890
              </p>
              <p className="mt-2 text-lg text-gray-500">
                <strong>Email:</strong> support@yourbrand.com
              </p>
            </div>
            <div className="relative">
              <img
                src="../public/office.jpg"
                alt="Our Office"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-gray-900">Follow Us</h3>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <img src="../public/fb.png" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <img src="../public/insta.png" alt="Instagram" className="w-8 h-8" />
            </a>
            <a href="https://twitter.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <img src="../public/twitter.png" alt="Twitter" className="w-8 h-8 " />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
