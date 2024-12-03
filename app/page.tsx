import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
      <header className="bg-primary-light dark:bg-primary-dark text-white">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-display font-bold">
              Workout Buddy
            </Link>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent-light dark:hover:text-accent-dark"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/workouts"
                  className="hover:text-accent-light dark:hover:text-accent-dark"
                >
                  Workouts
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-accent-light dark:hover:text-accent-dark"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>

      <footer className="bg-secondary-light dark:bg-secondary-dark text-white">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 Workout Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
