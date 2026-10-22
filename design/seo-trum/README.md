# Bộ bàn giao thiết kế Sèo Trum

## Dùng với Gemini có quyền đọc file trong workspace

1. Giải nén cả thư mục này vào workspace, ví dụ `design/seo-trum/`, giữ nguyên `assets/` và tên file.
2. Nếu có repository website riêng, cho Gemini biết repo đích; bộ này là đầu vào thiết kế, không phải mã nguồn ứng dụng.
3. Yêu cầu Gemini đọc `SEO_TRUM_DESIGN_SPEC.md`, mở ba ảnh trong `assets/`, rồi thực hiện nội dung từ `GEMINI_BUILD_PROMPT.md`.

Câu mở đầu có thể dùng:

> Hãy đọc toàn bộ `GEMINI_BUILD_PROMPT.md` trong thư mục design kit tôi cung cấp, mở các ảnh tham chiếu và triển khai trang chủ theo `SEO_TRUM_DESIGN_SPEC.md`. Thực hiện đến khi có giao diện chạy được và bằng chứng kiểm tra; không chỉ trả kế hoạch.

## Dùng trong chat Gemini chỉ có file đính kèm

Đính kèm riêng `SEO_TRUM_DESIGN_SPEC.md`, `assets/homepage-reference.png`, `assets/brand-logo.png` và `assets/brand-mascot.png`; dán phần prompt triển khai trong `GEMINI_BUILD_PROMPT.md`. Nếu môi trường không hỗ trợ MD, dán nội dung văn bản. Không giả định Gemini truy cập được một đường dẫn Windows hoặc tự đọc ZIP khi môi trường không hỗ trợ.

## Có gì trong bộ này

| File | Mục đích |
|---|---|
| `SEO_TRUM_DESIGN_SPEC.md` | Định vị, asset, token, bố cục/copy, 12 effect, responsive, demo, form, SEO, hiệu năng và gate kiểm tra |
| `GEMINI_BUILD_PROMPT.md` | Prompt để Gemini thực hiện đặc tả và tự kiểm tra |
| `assets/homepage-reference.png` | Ảnh trang chủ vàng–trắng–than đậm đã chọn |
| `assets/brand-logo.png` | Logo có tên thương hiệu, PNG nền trong suốt |
| `assets/brand-mascot.png` | Mascot khủng long riêng, PNG nền trong suốt |

Ảnh dự án và dữ liệu dashboard là minh hoạ. Thông tin founder chi tiết, sản phẩm thương mại, bảng giá, domain và backend chưa được cung cấp. Không dùng các ví dụ này làm bằng chứng đã có kết quả kinh doanh hoặc đã tích hợp thật.
