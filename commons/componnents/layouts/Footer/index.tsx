import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20 pt-10 px-6 md:px-16 pb-6 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Logo */}
        <div>
          <div className="flex space-x-4 items-center">
            <Image
              src="/logo-oucru-dark.png"
              alt="OUCRU"
              width={60}
              height={60}
              className="object-cover w-14 h-14"
            />
            <Image
              src="/logo-dart.png"
              alt="DART"
              width={60}
              height={60}
              className="object-cover w-14 h-14"
            />
          </div>
          <p className="text-secondary text-2xl font-bold my-4">
            Ready to get started?
          </p>
          <p className="text-gray-300">
            The fastest and simple way to generate growing business solutions
            with our products
          </p>
          <div className="mt-12 flex flex-col gap-2 text-gray-300">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>hello@dhuhaCreative.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Follow our updates</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-16 md:mt-16">
          {/* Dashboard */}
          <div>
            <h4 className="font-semibold text-secondary mb-2">Dashboard</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Forecast Map</li>
              <li>Reported Cases</li>
              <li>Data Sources</li>
              <li>How It Works</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-secondary mb-2">About</h4>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Partners</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-secondary mb-2">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Guides and resources</li>
              <li>Blog</li>
              <li>Tools</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs gap-3">
        <p>© 2025 OUCRU x DART. All Rights Reserved</p>
        <div className="flex space-x-4 text-lg">
          <Instagram className="cursor-pointer hover:text-white" size={16} />
          <Twitter className="cursor-pointer hover:text-white" size={16} />
          <Linkedin className="cursor-pointer hover:text-white" size={16} />
        </div>
      </div>
    </footer>
  );
}
