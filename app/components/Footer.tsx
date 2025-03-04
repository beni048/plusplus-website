import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-lg">© PA Finance 2025 | Zug, Switzerland</p>
          <a
            href="https://linkedin.com/company/pa-finance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white transition-colors hover:text-gray-300"
          >
            <Mail className="h-6 w-6" />
            <span className="text-lg">Follow us on LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
