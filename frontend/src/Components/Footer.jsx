import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold text-xl inline-block mb-4">
              LaganiLens
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered NEPSE market analysis for academic research and learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-400 transition-colors text-sm">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Project Info</h3>
            <p className="text-gray-400 text-sm mb-2">
              Academic AI/ML Project
            </p>
            <p className="text-gray-400 text-sm">
              NEPSE Data Analysis & Prediction
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LaganiLens. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            For educational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
