// Site footer with links, contact details and social icons.
import React from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding & Description */}
        <div>
          <h2 className="text-xl font-bold text-white">Shuke Isse</h2>
          <p className="mt-2 text-sm">
            "Dhaqan Soomaaliyeed, hal-abuur dijitaal ah, Fikrad cajiib iyo xiriir heersare ah — mar walba."
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Get in Touch</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm">jaabirshuuke26@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="h-4 w-4" />
            <span className="text-sm">+252 61 4468620</span>
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com/jaabir_shuuke" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-white" />
            </a>
            <a href="https://instagram.com/jaabirahme" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 hover:text-white" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 hover:text-white" />
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/share/1YVCWABFLc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} All rights reserved by Shuke Isse.
      </div>
    </footer>
  );
};

export default Footer;
