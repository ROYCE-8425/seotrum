<!-- Updated: 2026-10-21 -->
# KẾ HOẠCH HÀNH ĐỘNG ĐẨY TOP TỪ KHOÁ `"DỊCH VỤ TỰ ĐỘNG HOÁ AUTOMATION"` (PRIORITIZED ACTION PLAN)

Tài liệu này sắp xếp toàn bộ các hạng mục cần sửa chữa và nâng cấp theo thứ tự ưu tiên (**Immediate Blockers → Quick Wins → Strategic Improvements**) để đưa dự án **Sèo Trum** lên Top 1–3 Google và AI Search cho cụm từ khoá **`"dịch vụ tự động hoá automation"`**.

---

## Giai Đoạn 1: Xử Lý Chốt Chặn Lập Chỉ Mục Tức Thì (Immediate Blockers — Thực hiện trong 30 phút)

### 1.1. Sửa `base_url` trong `src/config/config.json` (Tác động: Rất cao | Độ khó: Rất thấp)
- **Vấn đề**: `src/config/config.json:4` đang để `"base_url": "http://localhost:3000"`.
- **Cách sửa**:
  ```json
  "base_url": "https://seotrum.com",
  ```
- **Kết quả**: Toàn bộ `<link rel="canonical">`, `og:url`, `og:image`, Schema JSON-LD (`Organization`, `WebSite`, `Service`, `BlogPosting`) và `/sitemap.xml` trỏ đúng về tên miền thật `https://seotrum.com`.

### 1.2. Loại bỏ trang rác `/elements` và chuẩn hoá Sitemap
- **Vấn đề**: `src/content/pages/elements.md` đang để `draft: false` với nội dung mẫu tiếng Anh và xuất hiện trong `public/sitemap-0.xml` cùng `/robots.txt` và `/sitemap.xml`.
- **Cách sửa**:
  1. Đổi `draft: true` trong `src/content/pages/elements.md` (hoặc xoá file).
  2. Cập nhật `next-sitemap.config.js` thêm `exclude: ["/elements", "/robots.txt", "/sitemap.xml", "/api/*"]`.

---

## Giai Đoạn 2: Tối Ưu On-Page & Khớp Từ Khoá `"dịch vụ tự động hoá automation"` (Quick Wins — Thực hiện trong 1–2 giờ)

### 2.1. Tối ưu lại Title, Meta Description & H1 cho 3 Trang Tiền Tệ (Money Pages)
Hiện tại cả 3 trang quan trọng nhất đều thiếu cụm `"dịch vụ tự động hoá"` và `"automation"`. Cần cập nhật như sau:

| Trang | Hiện Tại | Đề Xuất Chuẩn SEO Top 1–3 |
| :--- | :--- | :--- |
| **Trang Dịch Vụ (`/services`)** — *Trang đích chính cho từ khoá* | **Title**: `Giải pháp & Phần mềm tự động hoá theo yêu cầu — Sèo Trum`<br>**H1**: `Đúng công cụ. Đúng việc.` | **Title**: `Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu | Sèo Trum`<br>**H1**: `Dịch Vụ Tự Động Hoá (Automation) & Xây Dựng Phần Mềm Theo Yêu Cầu`<br>*(Đưa câu "Đúng công cụ. Đúng việc." lên làm Eyebrow/Slogan phụ)* |
| **Trang Con (`/services/cong-cu-tu-dong-hoa`)** | **Title**: `Xây dựng Công cụ Tự động hoá Quy trình Theo Yêu cầu — Sèo Trum`<br>**H1**: `Xây dựng Công cụ Tự động hoá Quy trình Theo Yêu cầu` | **Title**: `Dịch Vụ Tự Động Hoá Quy Trình (Workflow Automation) Theo Yêu Cầu | Sèo Trum`<br>**H1**: `Dịch Vụ Tự Động Hoá Quy Trình (Automation) & Xây Dựng Công Cụ Riêng` |
| **Trang Chủ (`/`)** | **Title**: `Sèo Trum — Phần mềm tự động hoá & ứng dụng theo yêu cầu`<br>**H1**: `Việc lặp lại, để phần mềm lo.` | **Title**: `Sèo Trum — Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu`<br>**Eyebrow**: `DỊCH VỤ TỰ ĐỘNG HOÁ (AUTOMATION) • CUSTOM DEVELOPMENT`<br>**Subtitle**: Chèn tự nhiên cụm *"dịch vụ tự động hoá (automation), web app, bot và tích hợp API"* |

### 2.2. Hiển thị đầy đủ 4 nhóm giải pháp và Bảng so sánh trong HTML tĩnh của `/services`
- **Vấn đề**: `src/app/services/page.tsx` chỉ render chi tiết của `activePillar` (1/4 giải pháp), còn file `src/content/services/_index.md` chứa bảng so sánh và nội dung rất giàu từ khoá lại không được render.
- **Cách sửa**:
  1. Render cả 4 khối giải pháp trong DOM (sử dụng class CSS `hidden` cho các tab không active hoặc hiển thị danh sách chi tiết bên dưới) để Googlebot đọc được 100% nội dung của cả 4 trụ cột.
  2. Đưa bảng so sánh *"Phần Mềm Đóng Gói / SaaS Rời Rạc vs. Dịch Vụ Tự Động Hoá (Automation) May Đo Tại Sèo Trum"* (từ `src/content/services/_index.md`) lên trang `/services`.

### 2.3. Nâng cấp Menu Header & Footer (`src/config/menu.json`) sang URL thật
- **Vấn đề**: Menu hiện chỉ trỏ tới `#phan-mem`, `#giai-phap`, `#du-an`, `#goc-chia-se`.
- **Cách sửa**: Cập nhật `src/config/menu.json` trỏ thẳng tới các trang đích:
  - `Dịch vụ Automation` → `/services`
  - `Mô phỏng luồng` → `/automation-studio`
  - `Dự án mẫu` → `/case-studies`
  - `Góc chia sẻ` → `/blog`
  - `Về Sèo Trum` → `/about`

---

## Giai Đoạn 3: Chuẩn Hoá Kiến Trúc Kỹ Thuật, Schema & GEO (Strategic Technical — Thực hiện trong 2–4 giờ)

### 3.1. Chuyển Metadata từ `<SeoMeta />` (Client) sang Next.js Server Metadata API
- Chuyển các file `page.tsx` (`src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/case-studies/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/automation-studio/page.tsx`) sang Server Component có `export const metadata` / `generateMetadata()`, và tách riêng phần state tương tác vào Client Component.

### 3.2. Chuẩn hoá JSON-LD Schema theo quy chuẩn mới nhất của Google
- **Gỡ `FAQPage` Schema** khỏi `src/app/services/[slug]/page.tsx` và `src/app/case-studies/[slug]/page.tsx` (vẫn giữ nguyên phần hiển thị câu hỏi FAQ bằng HTML cho người đọc).
- **Bổ sung `sameAs`** (liên kết Facebook, GitHub, LinkedIn, X từ `src/config/social.json`) vào `Organization` Schema.
- **Bổ sung `datePublished`, `dateModified`, `image`** vào `BlogPosting` Schema tại `src/app/blog/[single]/page.tsx`.

### 3.3. Sửa lỗi `scripts/llmsGenerator.mjs` để tạo `public/llms.txt` đầy đủ cho AI Search (GEO)
- Trong `scripts/llmsGenerator.mjs:106`, chuẩn hoá đường dẫn glob bằng `.replace(/\\/g, "/")` hoặc thêm `windowsPathsNoEscape: true` để script thu thập đầy đủ tất cả các trang khi chạy trên Windows.

---

## Giai Đoạn 4: Mở Rộng Cụm Chủ Đề (Topical Authority) Cho Từ Khoá `"dịch vụ tự động hoá automation"`

Để vượt qua các đối thủ cạnh tranh trên SERP Việt Nam cho từ khoá `"dịch vụ tự động hoá automation"`, cần bổ sung tối thiểu 3 bài viết Cluster chuyên sâu (1.500–2.000 từ/bài) trong `src/content/blog/` và trỏ internal link với anchor text chính xác về `/services` và `/services/cong-cu-tu-dong-hoa`:
1. **Bài Cluster 1 (Bắt trúng intent so sánh công cụ Automation)**:  
   `so-sanh-n8n-make-zapier-va-custom-code-automation.md` — *So sánh n8n, Make, Zapier và Dịch vụ xây dựng hệ thống Automation riêng: Doanh nghiệp nên chọn hướng nào?*
2. **Bài Cluster 2 (Bắt trúng intent báo giá & quy trình thuê dịch vụ)**:  
   `bang-gia-va-quy-trinh-thue-dich-vu-tu-dong-hoa-automation-doanh-nghiep.md` — *Kinh nghiệm thuê dịch vụ tự động hoá (Automation) cho doanh nghiệp: Quy trình, chi phí và tiêu chí chọn đối tác.*
3. **Bài Cluster 3 (Bắt trúng intent ứng dụng thực tế CRM/Bán hàng/Bot)**:  
   `tu-dong-hoa-quy-trinh-ban-hang-va-dong-bo-crm-api.md` — *Tự động hoá quy trình bán hàng, đồng bộ CRM & Bot Telegram/Zalo 24/7.*
