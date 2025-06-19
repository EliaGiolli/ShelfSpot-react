import { Home, BookOpen, Phone, Twitter, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-amber-700 text-amber-100 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Logo & Branding */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-2xl font-extrabold tracking-wide">ShelfSpot</h2>
          <p className="text-sm max-w-xs text-amber-200">
            Your gateway to fantasy worlds. Discover, save, and enjoy your favorite books.
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="flex flex-col md:flex-row gap-6 md:gap-12">
          <Link to="/home" className="flex items-center gap-2 hover:text-amber-300 transition">
            <Home size={20} />
            Home
          </Link>
          <Link to="/books" className="flex items-center gap-2 hover:text-amber-300 transition">
            <BookOpen size={20} />
            Books
          </Link>
          <Link to="/loans" className="flex items-center gap-2 hover:text-amber-300 transition">
            <Phone size={20} />
            Contact
          </Link>
        </nav>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-amber-300 transition"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-amber-300 transition"
          >
            <Github size={24} />
          </a>
          <a
            href="mailto:contact@shelfspot.com"
            aria-label="Email"
            className="hover:text-amber-300 transition"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-amber-600 my-8" />

      {/* Copyright */}
      <p className="text-center text-sm text-amber-300">
        © {new Date().getFullYear()} ShelfSpot. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer