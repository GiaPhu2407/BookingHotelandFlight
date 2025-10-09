// function ProfileForm({
//   profile,
//   onSave,
//   onCancel,
// }: {
//   profile: PersonalInfo | null;
//   onSave: (data: Omit<PersonalInfo, "id" | "createdAt" | "updatedAt">) => void;
//   onCancel: () => void;
// }) {
//   const [formData, setFormData] = useState({
//     fullName: profile?.fullName || "",
//     email: profile?.email || "",
//     phone: profile?.phone || "",
//     dateOfBirth: profile?.dateOfBirth || "",
//     address: profile?.address || "",
//     idNumber: profile?.idNumber || "",
//     nationality: profile?.nationality || "Việt Nam",
//     occupation: profile?.occupation || "",
//     emergencyContact: profile?.emergencyContact || "",
//     emergencyPhone: profile?.emergencyPhone || "",
//     profileImage: profile?.profileImage || "",
//     idFrontImage: profile?.idFrontImage || "",
//     idBackImage: profile?.idBackImage || "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-medium text-gray-900">
//             {profile ? "Chỉnh Sửa Profile" : "Tạo Profile Mới"}
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Họ Tên Đầy Đủ *
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Số Điện Thoại *
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Ngày Sinh
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Số CMND/CCCD *
//               </label>
//               <input
//                 type="text"
//                 name="idNumber"
//                 value={formData.idNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Quốc Tịch
//               </label>
//               <input
//                 type="text"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Nghề Nghiệp
//               </label>
//               <input
//                 type="text"
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Liên Hệ Khẩn Cấp
//               </label>
//               <input
//                 type="text"
//                 name="emergencyContact"
//                 value={formData.emergencyContact}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 SĐT Khẩn Cấp
//               </label>
//               <input
//                 type="tel"
//                 name="emergencyPhone"
//                 value={formData.emergencyPhone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Địa Chỉ Thường Trú
//             </label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
//             >
//               Hủy
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
//             >
//               {profile ? "Cập Nhật" : "Tạo Profile"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
