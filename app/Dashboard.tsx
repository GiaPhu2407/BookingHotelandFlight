 "use client";
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Hotel, Plane, Users, DollarSign, TrendingUp, Star, Settings, FileText, MessageSquare, Calendar, CreditCard, Package } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const bookingData = [
    { month: 'T1', hotel: 420, flight: 280 },
    { month: 'T2', hotel: 380, flight: 320 },
    { month: 'T3', hotel: 520, flight: 410 },
    { month: 'T4', hotel: 480, flight: 380 },
    { month: 'T5', hotel: 590, flight: 450 },
    { month: 'T6', hotel: 640, flight: 520 },
  ];

  const pieData = [
    { name: 'Khách sạn', value: 60, color: '#3b82f6' },
    { name: 'Máy bay', value: 40, color: '#8b5cf6' },
  ];

  const revenueData = [
    { date: '1/10', revenue: 45000 },
    { date: '5/10', revenue: 52000 },
    { date: '10/10', revenue: 48000 },
    { date: '15/10', revenue: 61000 },
    { date: '20/10', revenue: 58000 },
    { date: '25/10', revenue: 67000 },
  ];

  const hotels = [
    { id: 1, name: 'Luxury Hotel Da Nang', location: 'Đà Nẵng', stars: 5, status: 'Hoạt động', rooms: 45 },
    { id: 2, name: 'Grand Saigon Hotel', location: 'TP.HCM', stars: 4, status: 'Hoạt động', rooms: 32 },
    { id: 3, name: 'Hanoi Paradise', location: 'Hà Nội', stars: 5, status: 'Tạm ngưng', rooms: 28 },
  ];

  const flights = [
    { id: 'VN123', airline: 'Vietnam Airlines', route: 'SGN → HAN', time: '06:00', price: '1.500.000đ', status: 'Đúng giờ' },
    { id: 'VJ456', airline: 'VietJet Air', route: 'HAN → DAD', time: '08:30', price: '980.000đ', status: 'Đúng giờ' },
    { id: 'BB789', airline: 'Bamboo Airways', route: 'DAD → SGN', time: '14:15', price: '1.200.000đ', status: 'Chậm 30p' },
  ];

  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Customer', bookings: 12, spent: '25.000.000đ' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Customer', bookings: 8, spent: '18.500.000đ' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', role: 'Partner', bookings: 45, spent: '120.000.000đ' },
  ];

  const transactions = [
    { id: 'TXN001', user: 'Nguyễn Văn A', type: 'Hotel', amount: '3.500.000đ', method: 'Visa', status: 'Thành công' },
    { id: 'TXN002', user: 'Trần Thị B', type: 'Flight', amount: '1.980.000đ', method: 'MoMo', status: 'Thành công' },
    { id: 'TXN003', user: 'Lê Văn C', type: 'Hotel', amount: '5.200.000đ', method: 'Banking', status: 'Hoàn tiền' },
  ];

  const reviews = [
    { id: 1, user: 'Nguyễn Văn A', service: 'Luxury Hotel Da Nang', rating: 5, comment: 'Tuyệt vời, dịch vụ xuất sắc!', date: '12/10/2025' },
    { id: 2, user: 'Trần Thị B', service: 'Vietnam Airlines VN123', rating: 4, comment: 'Tốt, bay đúng giờ', date: '10/10/2025' },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }:any) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold mb-1">{value}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Calendar}
          title="Tổng đơn đặt"
          value="3,254"
          subtitle="Tháng này"
          color="bg-blue-500"
        />
        <StatCard 
          icon={DollarSign}
          title="Doanh thu"
          value="₫67M"
          subtitle="+12.5% so với tháng trước"
          color="bg-green-500"
        />
        <StatCard 
          icon={Users}
          title="Khách hàng"
          value="1,847"
          subtitle="482 khách mới"
          color="bg-purple-500"
        />
        <StatCard 
          icon={TrendingUp}
          title="Tỉ lệ hủy"
          value="2.3%"
          subtitle="-0.5% so với tháng trước"
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Xu hướng đặt chỗ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hotel" fill="#3b82f6" name="Khách sạn" />
              <Bar dataKey="flight" fill="#8b5cf6" name="Máy bay" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Phân loại đặt chỗ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Doanh thu theo ngày</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toLocaleString()}đ`} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Doanh thu" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderHotels = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quản lý khách sạn</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Thêm khách sạn
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên khách sạn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vị trí</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hạng sao</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phòng trống</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{hotel.name}</td>
                <td className="px-6 py-4">{hotel.location}</td>
                <td className="px-6 py-4">
                  <div className="flex">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">{hotel.rooms}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${hotel.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {hotel.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-3">Sửa</button>
                  <button className="text-red-600 hover:underline">Ẩn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFlights = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quản lý chuyến bay</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Thêm chuyến bay
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã chuyến</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hãng bay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành trình</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giờ bay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá vé</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{flight.id}</td>
                <td className="px-6 py-4">{flight.airline}</td>
                <td className="px-6 py-4">{flight.route}</td>
                <td className="px-6 py-4">{flight.time}</td>
                <td className="px-6 py-4">{flight.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${flight.status.includes('Đúng giờ') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {flight.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-3">Sửa</button>
                  <button className="text-red-600 hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
          
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vai trò</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số đơn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng chi tiêu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${user.role === 'Partner' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.bookings}</td>
                <td className="px-6 py-4">{user.spent}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-3">Xem</button>
                  <button className="text-gray-600 hover:underline mr-3">Chỉnh sửa</button>
                  <button className="text-red-600 hover:underline"> Khoá </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quản lý thanh toán</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Xuất báo cáo
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã GD</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phương thức</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{txn.id}</td>
                <td className="px-6 py-4">{txn.user}</td>
                <td className="px-6 py-4">{txn.type}</td>
                <td className="px-6 py-4 font-semibold">{txn.amount}</td>
                <td className="px-6 py-4">{txn.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    txn.status === 'Thành công' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline">Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Đánh giá & Hỗ trợ</h2>
      </div>
      <div className="p-6 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{review.user}</p>
                <p className="text-sm text-gray-600">{review.service}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{review.date}</span>
              <button className="text-blue-600 text-sm hover:underline">Phản hồi</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Báo cáo & Thống kê chi tiết</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Top khách hàng</p>
            <p className="text-2xl font-bold">Nguyễn Văn A</p>
            <p className="text-sm text-gray-500">25.000.000đ chi tiêu</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Điểm đến phổ biến</p>
            <p className="text-2xl font-bold">Đà Nẵng</p>
            <p className="text-sm text-gray-500">1.247 lượt đặt</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Tỉ lệ chuyển đổi</p>
            <p className="text-2xl font-bold">32.5%</p>
            <p className="text-sm text-green-600">+5.2% so với tháng trước</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hotel" stroke="#3b82f6" name="Khách sạn" strokeWidth={2} />
            <Line type="monotone" dataKey="flight" stroke="#8b5cf6" name="Máy bay" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Cấu hình hệ thống</h2>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-3">Banner & Khuyến mãi</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Quản lý banner
          </button>
        </div>
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-3">Kết nối API</h3>
          <p className="text-gray-600 mb-2">Cấu hình API với hãng bay và khách sạn đối tác</p>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cấu hình API
          </button>
        </div>
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-3">Thuế & Phí dịch vụ</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Thuế VAT (%)</label>
              <input type="number" defaultValue="10" className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phí dịch vụ (%)</label>
              <input type="number" defaultValue="5" className="border rounded px-3 py-2 w-full" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Thông báo</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span>Email xác nhận đặt chỗ</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span>Push notification</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>SMS nhắc nhở</span>
            </label>
          </div>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          Lưu cài đặt
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
    { id: 'hotels', label: 'Khách sạn', icon: Hotel },
    { id: 'flights', label: 'Chuyến bay', icon: Plane },
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'payments', label: 'Thanh toán', icon: CreditCard },
    { id: 'reviews', label: 'Đánh giá', icon: Star },
    { id: 'reports', label: 'Báo cáo', icon: FileText },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-0 overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Travel Booking</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <span className="text-sm font-medium">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'hotels' && renderHotels()}
          {activeTab === 'flights' && renderFlights()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;