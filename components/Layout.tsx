import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-white">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-display font-bold">
              Workout Buddy
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/workouts" className="hover:text-accent">
                  Workouts
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-accent">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>

      <footer className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 Workout Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
