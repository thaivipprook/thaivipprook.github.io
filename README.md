Tài Xỉu Sòng Bạc
Đây là một ứng dụng trò chơi tài xỉu đơn giản được xây dựng bằng HTML, CSS, và JavaScript. Người dùng có thể đăng ký, đăng nhập, nạp tiền (mô phỏng), đặt cược Tài hoặc Xỉu, và xem kết quả dựa trên số ngẫu nhiên từ 3 xúc xắc.

Tính năng chính
Đăng ký và đăng nhập: Tạo tài khoản mới và lưu vào localStorage, đăng nhập để vào game.
Nạp tiền (mô phỏng): Hiển thị thông tin ngân hàng Agribank (số tài khoản: 0359220370) để nạp tiền giả lập.
Đặt cược: Chọn "Tài" (11-18) hoặc "Xỉu" (3-10), cộng dồn tiền cược trước và sau khi xác nhận.
Xúc xắc: Hiển thị số 1-6 thay vì ảnh, tự động tung mỗi 60 giây.
Đăng xuất: Quay lại màn hình đăng nhập bất kỳ lúc nào.
Yêu cầu
Trình duyệt web hiện đại (Chrome, Firefox, Edge, v.v.).
Không cần server backend (chạy cục bộ).
Cài đặt
Tải mã nguồn:
Tải toàn bộ thư mục dự án hoặc sao chép các tệp index.html, styles.css, script.js.
Chuẩn bị tài nguyên:
Hình nền: Tải tệp casino-bg.jpg (hình nền sòng bạc) và đặt vào cùng thư mục với index.html.
Âm thanh:
dice-shake.mp3: Tiếng lắc xúc xắc.
win.mp3: Tiếng thắng.
lose.mp3: Tiếng thua.
dealer-start.mp3: "Đặt cược đi nào!".
Đặt các tệp âm thanh vào cùng thư mục.
Chạy ứng dụng:
Mở tệp index.html trong trình duyệt (nhấp đúp hoặc kéo vào trình duyệt).
Cách sử dụng
1. Đăng ký tài khoản
Từ màn hình đăng nhập, nhấn "Đăng ký ngay".
Nhập tên người dùng và mật khẩu (ví dụ: "user1" / "pass123").
Nhấn "Đăng Ký" -> Thông báo "Đăng ký thành công!" -> Nhấn "Đăng nhập" để quay lại.
2. Đăng nhập
Nhập tài khoản đã tạo hoặc dùng tài khoản mặc định: "admin" / "123456".
Nhấn "Đăng Nhập" để vào game.
3. Nạp tiền (mô phỏng)
Trong game, nhấn "Nạp Tiền".
Xem thông tin ngân hàng:
Ngân hàng: Agribank
Số tài khoản: 0359220370
Nhập số tiền muốn nạp (ví dụ: 500000 VND), nhấn "Xác Nhận Nạp".
Số dư tăng, quay lại game sau 2 giây.
4. Đặt cược
Chọn "Tài" hoặc "Xỉu" (nút được chọn đổi sang đỏ, nút kia giữ xanh lá).
Nhấn các nút số tiền (10.000, 50.000, 100.000, 500.000 VND) để cộng dồn.
Nhấn "Xác nhận" để khóa lựa chọn (vẫn có thể thêm tiền sau đó).
Chờ 60 giây để xúc xắc tự động tung và hiển thị kết quả.
5. Đăng xuất
Nhấn "Đăng Xuất" trong game để quay lại màn hình đăng nhập.
Cấu trúc tệp
text

Collapse

Wrap

Copy
tai-xiu/
├── index.html         # Giao diện chính
├── styles.css         # Kiểu dáng CSS
├── script.js          # Logic JavaScript
├── casino-bg.jpg      # Hình nền sòng bạc
├── dice-shake.mp3     # Âm thanh lắc xúc xắc
├── win.mp3            # Âm thanh thắng
├── lose.mp3           # Âm thanh thua
└── dealer-start.mp3   # Âm thanh dealer
Hạn chế
Nạp tiền: Chỉ là mô phỏng, không kết nối với ngân hàng thực tế (cần API và backend để xử lý).
Lưu trữ: Tài khoản lưu trong localStorage, sẽ mất nếu xóa dữ liệu trình duyệt.
Bảo mật: Không mã hóa mật khẩu (chỉ dùng cho demo).
Phát triển thêm
Tích hợp backend: Dùng server (Node.js, PHP, v.v.) để lưu tài khoản và xử lý nạp tiền.
API ngân hàng: Kết nối với Agribank để kiểm tra giao dịch thực tế.
Xác thực: Thêm mã hóa mật khẩu (ví dụ: bcrypt) và phiên đăng nhập.
Tác giả
Thái
