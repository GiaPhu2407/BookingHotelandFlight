import React from "react";
import {
  Plane,
  Hotel,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Award,
  Shield,
  Clock,
} from "lucide-react";

export default function TravelFooter() {
  return (
    <footer className="relative bg-slate-950 text-gray-300 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Trust Badges Section */}
      <div className="relative border-b border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Đáng Tin Cậy</h4>
                <p className="text-xs text-gray-400">
                  Được hơn 2 triệu khách hàng tin tưởng
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Bảo Mật Tuyệt Đối
                </h4>
                <p className="text-xs text-gray-400">Thanh toán an toàn 100%</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Hỗ Trợ 24/7</h4>
                <p className="text-xs text-gray-400">
                  Luôn sẵn sàng phục vụ bạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info - Larger Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl">
                  <Plane className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                TravelBooking
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Nền tảng đặt vé máy bay và khách sạn hàng đầu Việt Nam. Chúng tôi
              cam kết mang đến những trải nghiệm du lịch tuyệt vời với giá cả
              cạnh tranh và dịch vụ chất lượng cao.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3">
                🎁 Nhận ưu đãi đặc biệt
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-sm focus:outline-none focus:border-blue-500 transition-all duration-300 pr-12 backdrop-blur-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">
                Kết nối với chúng tôi
              </p>
              <div className="flex gap-3">
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Facebook className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </a>
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-pink-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 hover:border-pink-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                </a>
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </a>
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-red-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Youtube className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              Dịch Vụ
            </h4>
            <ul className="space-y-3">
              {[
                { icon: Plane, text: "Vé máy bay" },
                { icon: Hotel, text: "Khách sạn" },
                { text: "Combo tiết kiệm" },
                { text: "Tour du lịch" },
                { text: "Thuê xe" },
                { text: "Visa" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-3">
              {[
                "Câu hỏi thường gặp",
                "Hướng dẫn đặt vé",
                "Chính sách hoàn tiền",
                "Điều khoản sử dụng",
                "Chính sách bảo mật",
                "Quy chế hoạt động",
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              Liên Hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Địa chỉ</p>
                  <span className="text-sm text-gray-300">
                    123 Đường Lê Lợi, Q.1
                    <br />
                    TP. Hồ Chí Minh
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-green-500 transition-colors">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Hotline</p>
                  <a
                    href="tel:1900xxxx"
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors font-semibold"
                  >
                    1900 xxxx
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-purple-500 transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <a
                    href="mailto:support@travelbooking.vn"
                    className="text-sm text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    support@travelbooking.vn
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-sm text-gray-500">
                © 2024 TravelBooking. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-600">
                  Phương thức thanh toán:
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-8 px-3 rounded-lg bg-white flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                      alt="Visa"
                      className="h-4"
                    />
                  </div>
                  <div className="h-8 px-3 rounded-lg bg-white flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="Mastercard"
                      className="h-4"
                    />
                  </div>
                  <div className="h-8 px-3 rounded-lg bg-white flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="PayPal"
                      className="h-4"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700">
                <span className="text-xs text-gray-400">
                  ⭐ 4.8/5 từ 50,000+ đánh giá
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Designer Credit Section */}
      <div className="relative border-t border-slate-800/50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-6 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p
            className="text-sm flex flex-col md:flex-row items-center justify-center gap-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="text-gray-500 font-light tracking-wide">
              Website được thiết kế bởi
            </span>
            <span className="relative inline-flex items-center gap-2">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-30 animate-pulse"></span>
              <span
                className="relative text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                CEO Cao Ngô Gia Phú
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
