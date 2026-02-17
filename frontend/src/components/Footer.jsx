import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-500 text-center py-4">
      &copy; {new Date().getFullYear()} SheVerse. All rights reserved.
    </footer>
  );
}

export default Footer;