"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullname: string;
  phoneNumber?: string | null;
  loyaltyPoints: number;
  isVerified: boolean;
}

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-[#07202d] w-full h-14 flex items-center justify-between px-8">
      {/* Left: Logo / Name */}
      <div className="flex items-center space-x-2">
        <Link
          href="/"
          className="text-white font-semibold text-lg hover:text-yellow-400 transition-colors"
        >
          FlyStay
        </Link>
      </div>

      {/* Right: Navigation Links */}
      <nav className="flex items-center space-x-6 text-yellow-400">
        <Link
          href="/shopping"
          className="hover:text-yellow-300 transition-colors"
        >
          Shopping
        </Link>
        <Link href="/" className="hover:text-yellow-300 transition-colors">
          Việt Nam - Tiếng Việt
        </Link>

        {isLoading ? (
          <span className="text-sm">Đang tải...</span>
        ) : user ? (
          <>
            <Link
              href="/users"
              className="hover:text-yellow-300 transition-colors"
            >
              Quản lý người dùng
            </Link>
            <span className="text-white">Xin chào, {user.fullname}</span>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition-colors"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link
            href="/Register"
            className="hover:text-yellow-300 transition-colors"
          >
            Đăng nhập / Đăng ký
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
