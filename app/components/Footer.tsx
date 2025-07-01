import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-navy py-12 text-neutral-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <p className="text-lg">© Plusplus AG 2025 | Zug, Switzerland</p>
            <Link
              href="/privacy-policy"
              className="text-sm text-neutral-white transition-colors hover:text-primary-teal underline"
            >
              Privacy Policy
            </Link>
          </div>
          <a
            href="https://linkedin.com/company/plusplusag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-neutral-white transition-colors hover:text-primary-teal"
          >
            <Mail className="h-6 w-6" />
            <span className="text-lg">Follow us on LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
