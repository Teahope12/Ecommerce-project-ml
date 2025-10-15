import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-rose-100 py-12 mt-10 rounded-3xl shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Reach Out to Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Whether you have a question, feedback, or just want to say hello — we're always happy to hear from you.
          </p>
        </motion.div>

        {/* Contact Info */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">Brand Headquarters</h3>
              <p className="mt-4 text-lg text-gray-600">
                45 Bloom Avenue, Indiranagar, Bengaluru, Karnataka, India
              </p>
              <p className="mt-2 text-lg text-gray-600">
                <strong>Phone:</strong> +91 9382284686
              </p>
              <p className="mt-2 text-lg text-gray-600">
                <strong>Email:</strong> hello@tiyashastudio.com
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/office.jpg"
                alt="Studio Office"
                className="w-full h-auto object-cover rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          className="mt-10 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800">Connect With Us</h3>
          <p className="mt-2 text-lg text-gray-600">
            Follow our journey and stay inspired through our social channels.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            {[
              { href: "https://facebook.com/yourbrand", src: "/fb.png", alt: "Facebook" },
              { href: "https://instagram.com/yourbrand", src: "/insta.png", alt: "Instagram" },
              { href: "https://twitter.com/yourbrand", src: "/twitter.png", alt: "Twitter" },
            ].map((icon, index) => (
              <motion.a
                key={index}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="transition duration-300"
              >
                <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
