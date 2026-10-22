# Prompt triển khai website Sèo Trum cho Gemini

Dùng nội dung bên dưới sau khi đã đặt toàn bộ design kit vào workspace mà Gemini có thể đọc. Nếu dùng chat chỉ hỗ trợ file đính kèm, đính kèm riêng design spec, ảnh homepage, logo và mascot; không chỉ đưa đường dẫn trên máy khác.

---

Bạn là người phụ trách thiết kế giao diện và triển khai frontend cho Sèo Trum. Hãy xây **trang chủ hoàn chỉnh có thể chạy và kiểm tra**, bám ảnh được cung cấp và `SEO_TRUM_DESIGN_SPEC.md`. Tôi cần bạn thực hiện, tự xem giao diện và sửa sai, không chỉ trả về kế hoạch hay một đoạn code minh hoạ.

## Đọc đầu vào trước

Trong thư mục design kit:

- `SEO_TRUM_DESIGN_SPEC.md`: yêu cầu và cổng nghiệm thu đầy đủ.
- `assets/homepage-reference.png`: ảnh chuẩn trang chủ khủng long vàng.
- `assets/brand-logo.png`: logo thật đã chọn, có nền trong suốt.
- `assets/brand-mascot.png`: mascot khủng long vàng cùng nhận diện.

Mở xem trực tiếp cả ba ảnh. Đọc spec từ đầu đến cuối. Nếu các file được đính kèm riêng, đối chiếu theo tên/ảnh thay cho đường dẫn. Không giả vờ đã xem nếu công cụ không đọc được ảnh. Không dùng lại các concept chrome trừu tượng, xanh lime hoặc logo chữ st từ các phương án cũ.

## Định vị không thay đổi

Sèo Trum vừa là thương hiệu cá nhân của người trực tiếp xây phần mềm, vừa là studio. Chuyên môn chính: phần mềm tự động hoá, custom web/app, API, bot, tool và hệ thống vận hành. SEO là nhánh kiến thức/hướng mở rộng, không được chiếm hero hoặc biến thành cam kết thứ hạng.

Nhận diện: trắng chủ đạo, vàng `#FFC62A`, than đậm `#202326`, khủng long vàng mặc hoodie dùng laptop. Font ưu tiên Be Vietnam Pro có đủ tiếng Việt. Logo giữ hình, màu, dấu “Sèo”, tỷ lệ; chỉ trim alpha/tối ưu asset nếu cần. Không tạo lại bằng emoji hoặc font khác.

Tinh thần: một studio phần mềm gần gũi, làm thật, có gu thiết kế. Sự nổi bật đến từ **workspace tự động hoá có thể thử**, độ chính xác của bố cục và phản hồi khi thao tác. Không đến từ nhồi effect, cảnh 3D hay nội dung marketing giả.

## Những phần bắt buộc hoàn thành

1. Header và menu responsive có đích điều hướng thật.
2. Hero “Việc lặp lại, để phần mềm lo.”, CTA rõ, mascot và workspace đúng ảnh.
3. Demo ba bước “Nhận dữ liệu → Xử lý theo quy tắc → Đồng bộ hệ thống”. Chỉ chạy khi khách bấm; có tiến trình, kết quả, chạy lại; luôn ghi “Mô phỏng quy trình — dữ liệu mẫu”. Không request mạng hoặc giả kết nối khách hàng.
4. Ba nhóm giải pháp với mini UI có ý nghĩa, chọn được nhóm nhu cầu.
5. Hai preview dự án có nhãn minh hoạ và mô tả mở được; không bịa kết quả triển khai thật.
6. Founder + hai lối vào kiến thức Tự động hoá/SEO.
7. Section vàng với form nhận yêu cầu; validation, pending, error và mode preview/thật rõ ràng.
8. Footer, copyright năm hiện hành, mọi link có hành vi.

Không tự dựng thanh toán, license, admin, CMS, hệ thống SEO, chatbot LLM hoặc backend CRM. Nếu repo đã có endpoint nhận lead thì tích hợp theo contract thực. Nếu chưa có, hoàn thành `preview` form theo spec và báo rõ chưa gửi dữ liệu; tuyệt đối không hiện thông báo “đã nhận yêu cầu” bằng timeout.

## Hướng triển khai

Trước hết xác định workspace/repo đích. Đọc hướng dẫn repository, manifest và cấu trúc hiện tại; xem các module/motion/form đã có để tái sử dụng. Không nâng cấp dependency hàng loạt hoặc thay router chỉ để làm homepage. Nếu workspace trống, khởi tạo một ứng dụng frontend nhỏ với cấu trúc render tĩnh/SSR phù hợp, TypeScript và hệ token gọn; giải thích lựa chọn ngắn rồi làm. Không khởi tạo ứng dụng ngay trong thư mục chỉ chứa tài sản design kit nếu đã có repo đích riêng.

Hãy làm theo thứ tự:

### Bước 1 — Khóa hướng thiết kế

Tóm tắt 6–8 dòng bạn hiểu về ảnh, bố cục, palette, logo, demo, phạm vi và phần còn thiếu. Đây là cập nhật để tôi nắm tiến độ, không phải cớ để dừng hỏi lại các lựa chọn đã ghi. Tự giải quyết chi tiết thường lệ theo spec. Chỉ hỏi khi thiếu dữ kiện thật sự chặn công việc; tiếp tục phần độc lập.

### Bước 2 — Hình tĩnh có chất lượng trước

Xây token và toàn bộ section, font, spacing, logo, mascot, mini UI và copy. Dùng HTML/component thật cho nội dung và dashboard; dùng SVG cho đường nối. Không lấy toàn screenshot làm website, không dùng ảnh screenshot có chữ nhỏ thay cho form thật. Bám ảnh ở tỷ lệ thị giác, không sao chép lỗi chữ, số liệu demo hoặc năm copyright.

Mở preview tại 1440px và 390px. Sửa tỷ lệ hero, H1, mascot, panel và khoảng trắng trước. Kiểm tra 360/768/1024px. Đừng dùng overflow hidden toàn trang để giấu lỗi.

### Bước 3 — Làm tương tác thống nhất

Một state machine cho workflow: idle → receiving → processing → syncing → complete. Timer, connector, progress, check và log phải cùng trạng thái. Không autoplay; không nhân timer khi click nhanh; tab ẩn thì tạm dừng, giữ thời gian còn lại và tiếp tục đúng thứ tự khi quay lại; cleanup khi unmount. Nhãn mô phỏng luôn rõ. Mobile dùng node dọc, ít panel phụ.

Menu mobile dùng được bằng keyboard; Escape đóng và trả focus. Nút giải pháp chọn trước nhu cầu trong form. Dự án chưa có dữ liệu thật mở mô tả minh hoạ, không tạo case study giả. Form validate đủ, lỗi giữ dữ liệu, không gửi trùng. Áp dụng quy tắc accessibility của spec.

### Bước 4 — Thêm motion có chủ đích

Thực hiện bảng E01–E12 trong spec; ưu tiên effect cốt lõi. Những effect tùy chọn có thể bỏ nếu làm chậm hoặc rối. Phần quan trọng:

- Một nhịp vào hero ≤800ms, H1/CTA vốn đã hiện để đọc và bấm được.
- Vệt vàng dưới cụm “phần mềm” xuất hiện một lần.
- Workspace tilt tối đa ±2°/4px chỉ fine pointer, không trên touch/reduced motion.
- Tín hiệu vàng chỉ chạy theo connector của bước đang xử lý sau click.
- Mascot chỉ chuyển toàn ảnh nhẹ khi demo chạy; không tự vẽ animation tay/mắt vì asset chỉ là PNG.
- Hover button/card nhẹ, không mọi thứ cùng nhảy. Menu/form chuyển trạng thái ngắn và rõ.
- Không custom cursor, magnetic button, scroll hijack, autoplay video, particle nền, effect vô hạn hoặc WebGL không cần thiết.
- Reduced motion vẫn đầy đủ hành vi; bỏ chuyển động không thiết yếu. CSS transform/opacity, SVG và một nguồn state là ưu tiên. Tận dụng thư viện đã có; không cài nhiều thư viện animation cho cùng việc.

### Bước 5 — Tự đánh giá bằng bằng chứng

Đọc scripts thật; chạy build/typecheck/lint và các test phù hợp của repo. Không bịa tên lệnh hoặc kết quả. Nếu thiếu script, nói rõ. Không sửa lỗi nền ngoài phạm vi mà không cần thiết.

Kiểm tra ít nhất: desktop/mobile screenshot; overflow ở các breakpoint; mọi link/menu/dialog; demo chạy và chạy lại; nhấn nhanh; reduced motion; form invalid/email/điện thoại/pending/error hoặc preview; bàn phím/focus. Không cần test chỉ để chứng minh class CSS tồn tại.

So ảnh screenshot thực với reference, sửa ít nhất các khác biệt có tác động lớn: H1, logo, mascot, tỷ lệ hero, màu, phần vàng liên hệ, độ dày shadow, khoảng cách và vị trí CTA. Nếu công cụ xem browser không có, nói rõ chưa kiểm tra trực quan được, không tuyên bố pixel-perfect.

Tối ưu tài sản và JS theo spec. Mục tiêu LCP/INP/CLS là mục tiêu cần đo, không tự ghi đạt 100 điểm. Lab/local và dữ liệu thực địa phải được phân biệt.

### Bước 6 — Bàn giao thật

Trả về ngắn gọn:

- File và phần giao diện đã hoàn thành.
- Cách chạy/preview theo script thật.
- Ảnh chụp desktop và mobile nếu công cụ hỗ trợ.
- Demo và các tương tác đã kiểm tra.
- Form đang preview hay đã kết nối backend được xác minh.
- Lệnh đã chạy, kết quả và giới hạn chưa kiểm tra.

Hoàn thành phần frontend trong phạm vi trước khi kết thúc. Không dừng sau kế hoạch, không hỏi lại logo/màu đã chọn, không deploy/publish tự phát. Nếu bị chặn ở backend hay tài sản, nêu chính xác phần nào và tiếp tục phần còn làm được.

## Tự rà soát trước khi coi là xong

Khách nhìn 5 giây có hiểu đây là phần mềm tự động hoá không? Logo và mascot có đúng file đã cấp không? Giao diện có bám ảnh vàng–trắng–than đậm không? Demo có phản hồi thật với thao tác không? Mobile có thiết kế lại hợp lý thay vì thu nhỏ desktop không? Form có nói đúng việc đã/chưa gửi không? Chữ tiếng Việt có bị cắt dấu không? Effect có làm người dùng đọc và thao tác dễ hơn không?

Nếu một câu trả lời chưa đạt, sửa phần đó trước khi thêm effect mới.
