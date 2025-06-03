import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo_plusplus.jpg"
              alt="Plusplus"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <div>
            <Link 
              href="/help" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
