"use client";
import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Plane,
  Mail,
  Lock,
  Phone,
  Check,
  ArrowLeft,
  Shield,
  Sparkles,
} from "lucide-react";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [requestData, setRequestData] = useState({
    contact: "",
  });

  const [resetData, setResetData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          contact: requestData.contact,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Không thể gửi mã xác nhận");
        return;
      }

      setSuccess(
        `Mã xác nhận đã được gửi đến ${
          method === "email" ? "email" : "số điện thoại"
        } của bạn`
      );
      setTimeout(() => {
        setStep("reset");
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.error("Request code error:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (resetData.newPassword !== resetData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setIsLoading(false);
      return;
    }

    if (resetData.newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          contact: requestData.contact,
          code: resetData.code,
          newPassword: resetData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Không thể đặt lại mật khẩu");
        return;
      }

      setSuccess(
        "Đặt lại mật khẩu thành công! Đang chuyển đến trang đăng nhập..."
      );
      setTimeout(() => {
        router.push("/Register");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);
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
                  <Plane className="w-40 h-40 transform rotate-45" />
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
                    Đặt lại mật khẩu
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {step === "request"
                      ? "Nhập email hoặc số điện thoại để nhận mã xác nhận bảo mật"
                      : "Nhập mã xác nhận và tạo mật khẩu mới cho tài khoản của bạn"}
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mt-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Bảo mật tối đa</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Mã xác nhận có hiệu lực trong 15 phút
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mt-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Xử lý nhanh chóng</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Nhận mã xác nhận ngay lập tức qua email hoặc SMS
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mt-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">An toàn tuyệt đối</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Mật khẩu được mã hóa và bảo vệ an toàn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-12 bg-white">
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#2c2c2c] mb-8 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Quay lại đăng nhập</span>
              </button>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm leading-relaxed">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-[#2d7a65]/10 border border-[#2d7a65]/30 text-[#1e5a4a] rounded-2xl text-sm leading-relaxed">
                  {success}
                </div>
              )}

              {/* Step 1: Request Code */}
              {step === "request" && (
                <form onSubmit={handleRequestCode} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2c2c2c] mb-2">
                      Quên mật khẩu?
                    </h3>
                    <p className="text-[#6b6b6b] leading-relaxed">
                      Chọn phương thức nhận mã xác nhận
                    </p>
                  </div>

                  <div className="flex gap-2 bg-[#fef5f0] p-1.5 rounded-2xl border border-[#e8d5c8]">
                    <button
                      type="button"
                      onClick={() => setMethod("email")}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        method === "email"
                          ? "bg-white text-[#1e5a4a] shadow-md border border-[#e8d5c8]"
                          : "text-[#6b6b6b] hover:text-[#2c2c2c]"
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("phone")}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        method === "phone"
                          ? "bg-white text-[#1e5a4a] shadow-md border border-[#e8d5c8]"
                          : "text-[#6b6b6b] hover:text-[#2c2c2c]"
                      }`}
                    >
                      Số điện thoại
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      {method === "email" ? "Địa chỉ Email" : "Số điện thoại"}
                    </label>
                    <div className="relative">
                      {method === "email" ? (
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      ) : (
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      )}
                      <input
                        type={method === "email" ? "email" : "tel"}
                        placeholder={
                          method === "email" ? "ten@email.com" : "0912345678"
                        }
                        required
                        value={requestData.contact}
                        onChange={(e) =>
                          setRequestData({
                            ...requestData,
                            contact: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#e8d5c8] rounded-2xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#1e5a4a] to-[#2d7a65] text-white py-4 rounded-2xl font-semibold hover:from-[#164438] hover:to-[#236352] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Đang gửi..." : "Gửi mã xác nhận"}
                  </button>
                </form>
              )}

              {/* Step 2: Reset Password */}
              {step === "reset" && (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2c2c2c] mb-2">
                      Nhập mã xác nhận
                    </h3>
                    <p className="text-[#6b6b6b] leading-relaxed">
                      Mã đã được gửi đến{" "}
                      {method === "email" ? "email" : "số điện thoại"} của bạn
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Mã xác nhận (6 chữ số)
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      <input
                        type="text"
                        placeholder="123456"
                        required
                        maxLength={6}
                        value={resetData.code}
                        onChange={(e) =>
                          setResetData({
                            ...resetData,
                            code: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#e8d5c8] rounded-2xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none text-center text-2xl tracking-widest font-mono bg-white text-[#2c2c2c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Tối thiểu 6 ký tự"
                        required
                        minLength={6}
                        value={resetData.newPassword}
                        onChange={(e) =>
                          setResetData({
                            ...resetData,
                            newPassword: e.target.value,
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

                  <div>
                    <label className="block text-sm font-semibold text-[#2c2c2c] mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        required
                        value={resetData.confirmPassword}
                        onChange={(e) =>
                          setResetData({
                            ...resetData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-12 py-3.5 border-2 border-[#e8d5c8] rounded-2xl focus:border-[#2d7a65] focus:ring-4 focus:ring-[#2d7a65]/10 transition-all outline-none bg-white text-[#2c2c2c] placeholder:text-[#8a8a8a]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8a8a8a] hover:text-[#2c2c2c] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#1e5a4a] to-[#2d7a65] text-white py-4 rounded-2xl font-semibold hover:from-[#164438] hover:to-[#236352] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("request");
                      setResetData({
                        code: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setError("");
                    }}
                    className="w-full text-[#1e5a4a] hover:text-[#164438] font-semibold py-2 transition-colors"
                  >
                    Gửi lại mã xác nhận
                  </button>
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

export default ForgotPasswordPage;
