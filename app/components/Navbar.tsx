import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo_plusplus.png"
              alt="Plusplus"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              href="/help" 
              className="text-primary-navy hover:text-primary-blue font-medium"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
