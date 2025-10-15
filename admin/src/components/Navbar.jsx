import React from "react";

function Navbar({ setToken }) {
  return (
    <>
      <nav className="bg-gray-100 sticky top-0 w-screen text-center items-center">
        <div className="container flex flex-wrap justify-around items-center p-5 h-auto">
          {/* Branding */}
          <h1 className="text-2xl font-semibold font-serif">Tiyasha Admin</h1>

          {/* Logout Button */}
          <button
            onClick={() => {
              setToken("");
            }}
            className="bg-slate-600 rounded-lg p-2 text-white hover:bg-slate-700" // Added hover effect
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
