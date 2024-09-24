"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Heart, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-red-600 text-3xl font-bold tracking-tight"
            >
              NETFLIX
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {session ? (
                <>
                  <Link
                    href="/favorites"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Favorite Movies
                  </Link>
                  <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-150 ease-in-out flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-150 ease-in-out"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {session ? (
              <>
                <Link
                  href="/favorites"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorite Movies
                  </div>
                </Link>
                <span className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {session.user?.email}
                  </div>
                </span>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                >
                  <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </div>
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition duration-150 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
