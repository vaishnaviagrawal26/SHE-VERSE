import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="SheVerse Logo" className="h-10 w-10" />
        <span className="font-bold text-xl text-purple-700">SheVerse</span>
      </div>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-purple-700 hover:underline">
          Dashboard
        </Link>
        <Link to="/forum" className="text-purple-700 hover:underline">
          Community
        </Link>
        <Link to="/profile" className="text-purple-700 hover:underline">
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;