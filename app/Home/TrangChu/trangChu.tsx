getSession;

import {
  Plane,
  Hotel,
  Calendar,
  Users,
  CreditCard,
  Menu,
  Heart,
  MapPin,
  Bell,
  User,
  Search,
} from "lucide-react";

import { getSession } from "@/app/lib/session";
import { UserDropdown } from "@/app/component/user-dropdown";
import { NavbarClient } from "@/app/component/navbar-client";

export default async function TrangChu() {
  const session = await getSession();

  const mainMenuItems = [
    { id: "home", label: "Trang Chủ" },
    { id: "flights", label: "Vé Máy Bay", icon: "Plane" },
    { id: "hotels", label: "Khách Sạn", icon: "Hotel" },
    { id: "combo", label: "Combo Tiết Kiệm" },
    { id: "destinations", label: "Điểm Đến", icon: "MapPin" },
    { id: "New", label: "Tin Tức", icon: "Newspaper" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform -rotate-12 shadow-lg">
                  <Plane className="w-6 h-6 text-white transform rotate-12" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkyBooking
                </h1>
                <p className="text-xs text-gray-500">Travel with confidence</p>
              </div>
            </div>

            {/* Main Menu - needs client component for state */}
            <NavbarClient mainMenuItems={mainMenuItems} />

            {/* Right Menu */}
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-700" />
              </button>

              {session ? (
                <UserDropdown
                  user={{
                    firstName: session.firstName,
                    lastName: session.lastName,
                    email: session.email,
                  }}
                />
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Đăng nhập</span>
                </a>
              )}

              <button className="md:hidden p-2.5 hover:bg-gray-100 rounded-full">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Đặt chuyến đi{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              mơ ước
            </span>{" "}
            của bạn
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá thế giới với giá tốt nhất - Vé máy bay & Khách sạn
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg">
              <Plane className="w-5 h-5" />
              <span>Vé Máy Bay</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              <Hotel className="w-5 h-5" />
              <span>Khách Sạn</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              <span>Vé + Khách Sạn</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="text-sm text-gray-600 mb-2 block">Từ</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  placeholder="Hà Nội (HAN)"
                  className="bg-transparent outline-none font-medium text-gray-800 w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="text-sm text-gray-600 mb-2 block">Đến</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <input
                  type="text"
                  placeholder="TP. Hồ Chí Minh (SGN)"
                  className="bg-transparent outline-none font-medium text-gray-800 w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="text-sm text-gray-600 mb-2 block">
                Ngày đi
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <input
                  type="date"
                  className="bg-transparent outline-none font-medium text-gray-800 w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="text-sm text-gray-600 mb-2 block">
                Hành khách
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                <select className="bg-transparent outline-none font-medium text-gray-800 w-full">
                  <option>1 người lớn</option>
                  <option>2 người lớn</option>
                  <option>3 người lớn</option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            <span>Tìm Kiếm Chuyến Bay</span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Giá Tốt Nhất
            </h3>
            <p className="text-gray-600">
              So sánh hàng triệu chuyến bay để tìm mức giá tốt nhất cho bạn
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Hotel className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Khách Sạn Ưu Đãi
            </h3>
            <p className="text-gray-600">
              Đặt phòng khách sạn với giá ưu đãi và dịch vụ tốt nhất
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Thanh Toán Linh Hoạt
            </h3>
            <p className="text-gray-600">
              Nhiều hình thức thanh toán an toàn và tiện lợi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
