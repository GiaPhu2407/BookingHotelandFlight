// app/profile/page.tsx (CẬP NHẬT)
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
import prisma from "@/prisma/client";
import { getSession } from "../lib/session";
import { UserDropdown } from "../component/user-dropdown";
import { VerifyEmailButton } from "../component/verify-email-button";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/Register");
  }

  const customer = await prisma.customer.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      dateOfBirth: true,
      nationality: true,
      passportNumber: true,
      address: true,
      city: true,
      country: true,
      loyaltyPoints: true,
      isVerified: true,
      createdAt: true,
    },
  });

  if (!customer) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">FlyStay</h1>
          <UserDropdown
            user={{
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
            }}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Hồ sơ của tôi</h2>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        <div className="grid gap-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">
                    {customer.firstName.charAt(0)}
                    {customer.lastName.charAt(0)}
                  </span>
                </div>
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Họ
                  </label>
                  <p className="text-base font-medium mt-1">
                    {customer.firstName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Tên
                  </label>
                  <p className="text-base font-medium mt-1">
                    {customer.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-base font-medium">{customer.email}</p>
                </div>
              </div>

              {customer.phoneNumber && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Số điện thoại
                    </label>
                    <p className="text-base font-medium">
                      {customer.phoneNumber}
                    </p>
                  </div>
                </div>
              )}

              {customer.dateOfBirth && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Ngày sinh
                    </label>
                    <p className="text-base font-medium">
                      {new Date(customer.dateOfBirth).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address Information Card */}
          {(customer.address || customer.city || customer.country) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Địa chỉ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {customer.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Địa chỉ
                    </label>
                    <p className="text-base font-medium mt-1">
                      {customer.address}
                    </p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  {customer.city && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Thành phố
                      </label>
                      <p className="text-base font-medium mt-1">
                        {customer.city}
                      </p>
                    </div>
                  )}
                  {customer.country && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Quốc gia
                      </label>
                      <p className="text-base font-medium mt-1">
                        {customer.country}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Travel Information Card */}
          {(customer.nationality || customer.passportNumber) && (
            <Card>
              <CardHeader>
                <CardTitle>Thông tin du lịch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {customer.nationality && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Quốc tịch
                      </label>
                      <p className="text-base font-medium mt-1">
                        {customer.nationality}
                      </p>
                    </div>
                  )}
                  {customer.passportNumber && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Số hộ chiếu
                      </label>
                      <p className="text-base font-medium mt-1">
                        {customer.passportNumber}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loyalty Points Card */}
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5" />
                Điểm thưởng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  {customer.loyaltyPoints.toLocaleString()}
                </span>
                <span className="text-blue-100">điểm</span>
              </div>
              <p className="text-blue-100 mt-2">
                Sử dụng điểm để nhận ưu đãi đặc biệt
              </p>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Xác thực email</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      customer.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {customer.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                  </span>
                  {!customer.isVerified && (
                    <VerifyEmailButton email={customer.email} />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ngày tạo tài khoản</span>
                <span className="text-gray-900 font-medium">
                  {new Date(customer.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
