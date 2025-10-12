"use client";
import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Plane,
  Hotel,
  Mail,
  Lock,
  User,
  Phone,
  Check,
  Sparkles,
} from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const requestBody = {
        identifier: loginData.identifier,
        password: loginData.password,
      };

      console.log("=== FRONTEND LOGIN REQUEST ===");
      console.log("loginData state:", loginData);
      console.log("Request body:", requestBody);
      console.log("Request body JSON:", JSON.stringify(requestBody));

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        setError(
          data.error || data.details?.[0]?.message || "Đăng nhập thất bại"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending register request");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          phoneNumber: registerData.phoneNumber,
          password: registerData.password,
        }),
      });

      const data = await response.json();
      console.log("Register response:", data);

      if (!response.ok) {
        setError(
          data.error || data.details?.[0]?.message || "Đăng ký thất bại"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Register error:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef5f0] via-[#fff9f5] to-[#fef0e8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4a574]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#2d7a65]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-[#1e5a4a]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8d5c8]">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#1e5a4a] to-[#2d7a65] p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10">
                  <Sparkles className="w-32 h-32" />
                </div>
                <div className="absolute bottom-10 right-10">
                  <Hotel className="w-40 h-40" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Plane className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight">FlyStay</h1>
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl font-bold leading-tight text-balance">
                    {currentPage === "login"
                      ? "Chào mừng trở lại!"
                      : "Bắt đầu hành trình"}
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {currentPage === "login"
                      ? "Đăng nhập để khám phá những chuyến bay và khách sạn tuyệt vời nhất"
                      : "Tạo tài khoản để trải nghiệm dịch vụ du lịch đẳng cấp"}
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mt-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Giá tốt nhất</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      So sánh và đặt vé với giá ưu đãi nhất
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mt-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Đặt chỗ dễ dàng</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Xác nhận ngay, thanh toán linh hoạt
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mt-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hỗ trợ 24/7</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Đội ngũ chăm sóc luôn sẵn sàng hỗ trợ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-12 bg-white">
              <div className="flex gap-2 mb-8 bg-[#fef5f0] p-1.5 rounded-2xl border border-[#e8d5c8]">
                <button
                  onClick={() => {
                    setCurrentPage("login");
                    setError("");
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    currentPage === "login"
                      ? "bg-white text-[#1e5a4a] shadow-md border border-[#e8d5c8]"
                      : "text-[#6b6b6b] hover:text-[#2c2c2c]"
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("register");
                    setError("");
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    currentPage === "register"
                      ? "bg-white text-[#1e5a4a] shadow-md border border-[#e8d5c8]"
                      : "text-[#6b6b6b] hover:text-[#2c2c2c]"
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm leading-relaxed">
                  {error}
                </div>
              )}

              {/* Login Form */}
              {currentPage === "login" && (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Email hoặc Số điện thoại
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      <input
                        type="text"
                        placeholder="ten@email.com hoặc 0912345678"
                        required
                        value={loginData.identifier}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            identifier: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#e8d5c8] rounded-2xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        required
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-12 py-3.5 border-2 border-[#e8d5c8] rounded-2xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] hover:text-[#2c2c2c] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#e8d5c8] text-[#1e5a4a] focus:ring-[#2d7a65]"
                      />
                      <span className="text-sm text-[#6b6b6b] group-hover:text-[#2c2c2c]">
                        Ghi nhớ đăng nhập
                      </span>
                    </label>
                    <a
                      href="/Profile/forgotpass"
                      className="text-sm text-[#1e5a4a] hover:text-[#164438] font-semibold transition-colors"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#1e5a4a] to-[#2d7a65] text-white py-4 rounded-2xl font-semibold hover:from-[#164438] hover:to-[#236352] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e8d5c8]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#8a8a8a]">
                        Hoặc đăng nhập với
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 border-2 border-[#e8d5c8] rounded-2xl hover:bg-[#fef5f0] hover:border-[#d4a574] transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="font-medium text-[#2c2c2c]">Google</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 border-2 border-[#e8d5c8] rounded-2xl hover:bg-[#fef5f0] hover:border-[#d4a574] transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span className="font-medium text-[#2c2c2c]">GitHub</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Register Form */}
              {currentPage === "register" && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                        Họ
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Nguyễn"
                          required
                          value={registerData.firstName}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-[#e8d5c8] rounded-xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-sm bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                        Tên
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Văn A"
                          required
                          value={registerData.lastName}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-[#e8d5c8] rounded-xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-sm bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-4 h-4" />
                      <input
                        type="email"
                        placeholder="ten@email.com"
                        required
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-[#e8d5c8] rounded-xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-sm bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-4 h-4" />
                      <input
                        type="tel"
                        placeholder="0912345678"
                        value={registerData.phoneNumber}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-[#e8d5c8] rounded-xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-sm bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-4 h-4" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Tối thiểu 8 ký tự"
                        required
                        minLength={8}
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-10 py-2.5 border-2 border-[#e8d5c8] rounded-xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-sm bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] hover:text-[#2c2c2c] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-4 h-4" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-10 py-2.5 border-2 border-[#e8d5c8] rounded-xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-sm bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] hover:text-[#2c2c2c] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        required
                        className="w-4 h-4 mt-0.5 rounded border-[#e8d5c8] text-[#1e5a4a] focus:ring-[#2d7a65]"
                      />
                      <span className="text-sm text-[#6b6b6b] group-hover:text-[#2c2c2c] leading-relaxed">
                        Tôi đồng ý với{" "}
                        <a
                          href="#"
                          className="text-[#1e5a4a] hover:underline font-semibold"
                        >
                          Điều khoản dịch vụ
                        </a>{" "}
                        và{" "}
                        <a
                          href="#"
                          className="text-[#1e5a4a] hover:underline font-semibold"
                        >
                          Chính sách bảo mật
                        </a>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mt-0.5 rounded border-[#e8d5c8] text-[#1e5a4a] focus:ring-[#2d7a65]"
                      />
                      <span className="text-sm text-[#6b6b6b] group-hover:text-[#2c2c2c] leading-relaxed">
                        Nhận thông tin khuyến mãi và ưu đãi đặc biệt
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#1e5a4a] to-[#2d7a65] text-white py-3.5 rounded-2xl font-semibold hover:from-[#164438] hover:to-[#236352] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                  </button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e8d5c8]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#8a8a8a]">
                        Hoặc đăng ký với
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border-2 border-[#e8d5c8] rounded-2xl hover:bg-[#fef5f0] hover:border-[#d4a574] transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="font-medium text-[#2c2c2c] text-sm">
                        Google
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border-2 border-[#e8d5c8] rounded-2xl hover:bg-[#fef5f0] hover:border-[#d4a574] transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span className="font-medium text-[#2c2c2c] text-sm">
                        GitHub
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#6b6b6b]">
          <p className="leading-relaxed">
            Bảo mật với mã hóa SSL • Được tin dùng bởi hàng ngàn khách hàng
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
