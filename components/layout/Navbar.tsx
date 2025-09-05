import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-[#f3f4f6] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <Image 
                src="/logo2.png" 
                alt="MyERAS Reviewer Logo" 
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-lg text-gray-900">MyERAS Reviewer</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/guides" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Guides
            </Link>
            <Link href="/timeline" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Timeline
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/auth/signin" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}