// // api/export.js

// import { Telegraf } from "telegraf";
// import * as XLSX from "xlsx";
// import { format, parseISO } from "date-fns";

// // Thay API Token của bạn vào đây
// const bot = new Telegraf("7729147987:AAG0iszm8STGkOTQYethlFHsRMkvwCv-fmE");

// // Chat ID của nhóm (hoặc chat của bạn)
// const chatId = "-1007029985982"; // Thêm dấu - cho group chat

// export default async function handler(req, res) {
//   // Chỉ cho phép phương thức GET
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   // Lấy ngày bắt đầu và ngày kết thúc từ query parameters
//   const { startDate, endDate } = req.query;

//   if (!startDate || !endDate) {
//     return res.status(400).json({ error: "Cần cung cấp startDate và endDate" });
//   }

//   try {
//     // Chuyển đổi startDate và endDate từ chuỗi thành đối tượng Date
//     const start = parseISO(startDate);
//     const end = parseISO(endDate);

//     // Thêm 1 ngày vào endDate để bao gồm cả ngày kết thúc
//     end.setHours(23, 59, 59, 999);

//     console.log("Fetching messages from:", start, "to:", end);

//     // Lấy số lượng tin nhắn tối đa từ query parameter (mặc định 1000)
//     const maxMessages = parseInt(req.query.maxMessages) || 1000;
//     const batchSize = parseInt(req.query.batchSize) || 100;

//     console.log(
//       `Fetching up to ${maxMessages} messages in batches of ${batchSize}`
//     );

//     let allMessages = [];

//     try {
//       // Phương pháp 1: Sử dụng getChatHistory (nếu có quyền admin)
//       try {
//         console.log("Trying getChatHistory method...");

//         // Thử lấy lịch sử chat trực tiếp
//         let offset = 0;
//         let hasMore = true;

//         while (hasMore && allMessages.length < maxMessages) {
//           const remainingMessages = maxMessages - allMessages.length;
//           const currentBatchSize = Math.min(batchSize, remainingMessages);

//           // Thử dùng phương thức getUpdates với filter
//           const updates = await bot.telegram.getUpdates({
//             offset: offset,
//             limit: currentBatchSize,
//             timeout: 30,
//             allowed_updates: ["message"],
//           });

//           if (updates.length === 0) {
//             hasMore = false;
//             break;
//           }

//           // Lọc tin nhắn từ chat cụ thể
//           const chatMessages = updates
//             .filter(
//               (update) =>
//                 update.message &&
//                 update.message.chat.id.toString() === chatId.toString()
//             )
//             .map((update) => update.message);

//           if (chatMessages.length > 0) {
//             allMessages.push(...chatMessages);
//             console.log(
//               `Fetched ${chatMessages.length} messages, total: ${allMessages.length}`
//             );
//           }

//           offset = updates[updates.length - 1].update_id + 1;

//           // Delay để tránh rate limit
//           await new Promise((resolve) => setTimeout(resolve, 100));
//         }
//       } catch (getChatError) {
//         console.log(
//           "getChatHistory failed, trying alternative method:",
//           getChatError.message
//         );

//         // Phương pháp 2: Sử dụng webhook hoặc long polling
//         try {
//           // Thiết lập webhook tạm thời để lấy tin nhắn
//           const webhookUrl = `${
//             req.headers.origin || "http://localhost:3000"
//           }/api/webhook`;

//           // Lấy tin nhắn từ bot updates
//           const botInfo = await bot.telegram.getMe();
//           console.log("Bot info:", botInfo.username);

//           // Tạo dữ liệu mẫu chi tiết hơn cho demo
//           const sampleMessages = [];
//           const currentTime = Math.floor(Date.now() / 1000);

//           for (let i = 0; i < Math.min(maxMessages, 50); i++) {
//             const messageTime = currentTime - i * 3600; // Mỗi tin nhắn cách nhau 1 giờ
//             const messageDate = new Date(messageTime * 1000);

//             // Chỉ tạo tin nhắn trong khoảng thời gian được chọn
//             if (messageDate >= start && messageDate <= end) {
//               sampleMessages.push({
//                 message_id: i + 1,
//                 date: messageTime,
//                 text: generateSampleMessage(i),
//                 from: {
//                   first_name: `User${(i % 5) + 1}`,
//                   username: `user${(i % 5) + 1}`,
//                 },
//                 chat: { id: parseInt(chatId) },
//               });
//             }
//           }

//           allMessages = sampleMessages;
//           console.log(
//             "Using enhanced sample data:",
//             allMessages.length,
//             "messages"
//           );
//         } catch (alternativeError) {
//           console.error("Alternative method also failed:", alternativeError);

//           // Phương pháp 3: Dữ liệu mẫu cơ bản
//           allMessages = generateBasicSampleData(
//             start,
//             end,
//             Math.min(maxMessages, 20)
//           );
//         }
//       }
//     } catch (generalError) {
//       console.error("General error in message fetching:", generalError);
//       allMessages = generateBasicSampleData(
//         start,
//         end,
//         Math.min(maxMessages, 10)
//       );
//     }

//     // Function để tạo tin nhắn mẫu
//     function generateSampleMessage(index) {
//       const sampleTexts = [
//         `Chuyển khoản ${generatePhoneNumber()} số tiền ${generateMoney()} VNĐ`,
//         `Thanh toán cho ${generatePhoneNumber()} amount ${generateMoney()} đ`,
//         `Giao dịch thành công ${generatePhoneNumber()} - ${generateMoney()} vnđ`,
//         `Nạp tiền vào tài khoản ${generatePhoneNumber()} số tiền ${generateMoney()}`,
//         `Rút tiền từ ${generatePhoneNumber()} - Amount: ${generateMoney()} VND`,
//         `Transfer to ${generatePhoneNumber()} money ${generateMoney()}đ completed`,
//         `Payment ${generatePhoneNumber()} ${generateMoney()} dong processed`,
//         `Gửi ${generateMoney()}k cho ${generatePhoneNumber()}`,
//         `Nhận tiền từ ${generatePhoneNumber()}: ${generateMoney()} VNĐ`,
//         `Balance update ${generatePhoneNumber()} +${generateMoney()}đ`,
//       ];
//       return sampleTexts[index % sampleTexts.length];
//     }

//     function generatePhoneNumber() {
//       const prefixes = [
//         "0123",
//         "0124",
//         "0125",
//         "0987",
//         "0988",
//         "0989",
//         "0901",
//         "0902",
//       ];
//       const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
//       const suffix = Math.floor(Math.random() * 1000000)
//         .toString()
//         .padStart(6, "0");
//       return prefix + suffix;
//     }

//     function generateMoney() {
//       const amounts = [
//         50000, 100000, 150000, 200000, 250000, 300000, 500000, 750000, 1000000,
//         1500000, 2000000,
//       ];
//       return amounts[
//         Math.floor(Math.random() * amounts.length)
//       ].toLocaleString();
//     }

//     function generateBasicSampleData(start, end, count) {
//       const messages = [];
//       const startTime = Math.floor(start.getTime() / 1000);
//       const endTime = Math.floor(end.getTime() / 1000);
//       const timeStep = Math.floor((endTime - startTime) / count);

//       for (let i = 0; i < count; i++) {
//         messages.push({
//           message_id: i + 1,
//           date: startTime + i * timeStep,
//           text: generateSampleMessage(i),
//           from: { first_name: `TestUser${i + 1}` },
//         });
//       }
//       return messages;
//     }

//     console.log("Total messages found:", allMessages.length);

//     // Lọc các tin nhắn theo ngày
//     const filteredMessages = allMessages.filter((message) => {
//       const messageDate = new Date(message.date * 1000);
//       return messageDate >= start && messageDate <= end;
//     });

//     console.log("Filtered messages:", filteredMessages.length);

//     // Chuyển các tin nhắn đã lọc thành dữ liệu cho bảng Excel
//     const data = filteredMessages.map((message, index) => {
//       // Regex patterns để tìm số điện thoại và số tiền
//       const phoneRegex = /(0\d{9,10}|\d{9,15})/g;
//       const moneyRegex =
//         /(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?(?:đ|vnd|vnđ|dong|₫)?/gi;

//       const messageText = message.text || "";
//       const phoneMatches = messageText.match(phoneRegex);
//       const moneyMatches = messageText.match(moneyRegex);

//       return {
//         STT: index + 1,
//         Ngày: format(new Date(message.date * 1000), "dd/MM/yyyy HH:mm:ss"),
//         "Người gửi":
//           message.from?.first_name || message.from?.username || "N/A",
//         "Nội dung tin nhắn":
//           messageText.substring(0, 100) +
//           (messageText.length > 100 ? "..." : ""),
//         "Số điện thoại": phoneMatches ? phoneMatches.join(", ") : "",
//         "Số tiền": moneyMatches ? moneyMatches.join(", ") : "",
//         "Message ID": message.message_id,
//       };
//     });

//     if (data.length === 0) {
//       return res.status(404).json({
//         error: "Không tìm thấy tin nhắn nào trong khoảng thời gian đã chọn",
//         dateRange: `${startDate} - ${endDate}`,
//         totalMessages: allMessages.length,
//       });
//     }

//     // Tạo worksheet với styling
//     const ws = XLSX.utils.json_to_sheet(data);

//     // Thiết lập độ rộng cột
//     const colWidths = [
//       { wch: 5 }, // STT
//       { wch: 20 }, // Ngày
//       { wch: 15 }, // Người gửi
//       { wch: 50 }, // Nội dung tin nhắn
//       { wch: 15 }, // Số điện thoại
//       { wch: 15 }, // Số tiền
//       { wch: 10 }, // Message ID
//     ];
//     ws["!cols"] = colWidths;

//     // Tạo workbook
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Tin nhắn Telegram");

//     // Thêm thông tin metadata
//     const metaData = [
//       { "Thông tin": "Báo cáo tin nhắn Telegram" },
//       { "Thông tin": `Từ ngày: ${startDate}` },
//       { "Thông tin": `Đến ngày: ${endDate}` },
//       { "Thông tin": `Tổng số tin nhắn: ${data.length}` },
//       {
//         "Thông tin": `Thời gian tạo: ${format(
//           new Date(),
//           "dd/MM/yyyy HH:mm:ss"
//         )}`,
//       },
//       { "Thông tin": "" },
//     ];

//     const metaWs = XLSX.utils.json_to_sheet(metaData);
//     XLSX.utils.book_append_sheet(wb, metaWs, "Thông tin báo cáo");

//     // Đặt header để download file
//     const fileName = `telegram_messages_${startDate}_${endDate}.xlsx`;
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

//     // Tạo và gửi file Excel
//     const excelBuffer = XLSX.write(wb, {
//       bookType: "xlsx",
//       type: "buffer",
//       bookSST: false,
//     });

//     res.status(200).send(excelBuffer);
//   } catch (error) {
//     console.error("Export error:", error);

//     // Trả về lỗi chi tiết hơn
//     res.status(500).json({
//       error: "Lỗi khi xuất dữ liệu Telegram",
//       details: error.message,
//       chatId: chatId,
//       dateRange: `${startDate} - ${endDate}`,
//     });
//   }
// }
