<!-- Updated: 2026-10-21 -->
# BÁO CÁO KIỂM TOÁN SEO TOÀN DIỆN (FULL SEO AUDIT REPORT)
**Dự án**: Sèo Trum (`seotrum`)  
**Từ khoá mục tiêu trọng tâm**: `"dịch vụ tự động hoá automation"` (và cụm `"dịch vụ tự động hoá"`, `"dịch vụ automation doanh nghiệp"`)  
**Phạm vi kiểm toán (Scope)**: `full-site` (Kiểm toán toàn bộ mã nguồn Next.js 16 App Router, cấu trúc On-Page, Technical SEO, Schema JSON-LD, Sitemap, Internal Linking, Content E-E-A-T & GEO/AI Search)

---

## A) Tóm Tắt Đánh Giá (Audit Summary)

### Kết Luận Trực Tiếp: Đã lên được Top SEO cho từ khoá `"dịch vụ tự động hoá automation"` chưa?
> 🔴 **CHƯA THỂ LÊN TOP (VÀ ĐANG CÓ CHỐT CHẶN KỸ THUẬT NGĂN GOOGLE INDEX).**  
> Hiện tại dự án có **thiết kế UI/UX rất tốt**, có sẵn **kiến trúc trang đích theo mô hình Silo** (`/services`, `/services/[slug]`, `/case-studies/[slug]`, `/blog/[single]`) và bản quy hoạch chiến lược (`SEO-STRATEGY.md`). Tuy nhiên, ở trạng thái code hiện tại, dự án **chưa thể lên Top Google** cho từ khoá `"dịch vụ tự động hoá automation"` vì **3 nguyên nhân chí mạng**:
> 1. **Lỗi chặn Index nghiêm trọng (`localhost:3000`)**: `base_url` trong `src/config/config.json` đang là `http://localhost:3000`, khiến toàn bộ thẻ `<link rel="canonical">`, `og:url`, JSON-LD `@id` và Sitemap động khai báo với Googlebot rằng tên miền gốc là `localhost:3000`.
> 2. **Đứt gãy từ khoá mục tiêu trên Money Pages (`0` lần xuất hiện)**: Cụm từ `"dịch vụ tự động hoá"` và `"dịch vụ tự động hoá automation"` xuất hiện **0 lần** trên Trang chủ (`/`), Trang Dịch vụ (`/services`) và Trang Dịch vụ con (`/services/cong-cu-tu-dong-hoa`). Các file markdown chuẩn SEO (`src/content/services/_index.md`, `src/content/homepage/_index.md`) đã được viết nhưng **không được nạp vào code giao diện mới** (trở thành file chết / dead content).
> 3. **Thẻ `<title>` và `<h1>` dùng khẩu hiệu (Slogan) thay vì từ khoá tìm kiếm**: Trang `/services` đặt `<h1>` là *"Đúng công cụ. Đúng việc."*, Trang chủ `/` đặt `<h1>` là *"Việc lặp lại, để phần mềm lo."* — làm mất hoàn toàn tín hiệu ngữ nghĩa (Semantic Signal) chính cho từ khoá `"dịch vụ tự động hoá automation"`.

---

### Bảng Điểm Định Hướng Theo Từng Hạng Mục (Directional Score)

| Hạng Mục (Category) | Trọng Số | Điểm Hiện Tại | Xếp Loại | Giải Thích Ngắn Gọn (Chain-of-Thought) |
| :--- | :---: | :---: | :---: | :--- |
| **1. Technical SEO** | 25% | **45 / 100** | Poor | Có cấu trúc App Router, `robots.txt` và `sitemap.ts` (+), nhưng bị phạt nặng do `base_url: "http://localhost:3000"` làm hỏng Canonical toàn site (Critical, -15), render `<SeoMeta />` bằng Client Component trong `<body>` (Critical, -15) và lọt trang rác `/elements`, `/robots.txt` vào `public/sitemap-0.xml` (Warning, -5). |
| **2. Content Quality & E-E-A-T** | 20% | **65 / 100** | Needs Improvement | Có 4 bài Blog chuyên sâu, trang `/about` định danh Founder rõ ràng (+), nhưng 3/4 nội dung giải pháp trên `/services` bị ẩn do render có điều kiện theo `useState` (Warning, -5), các file `_index.md` giàu từ khoá bị bỏ quên không render (Warning, -5), và độ dài bài Blog (909–1.300 từ) chưa đạt ngưỡng 1.500 từ (Warning, -5). |
| **3. On-Page SEO & Keyword Targeting** | 15% | **40 / 100** | Poor | Có phân tách URL `/services/cong-cu-tu-dong-hoa` (+), nhưng từ khoá `"dịch vụ tự động hoá automation"` xuất hiện **0 lần** trên mọi Money Page (Critical, -15), thẻ `<h1>` trên `/` và `/services` không chứa từ khoá chính (Warning, -5), và menu Header/Footer chỉ gắn link `#hash` (Warning, -5). |
| **4. Schema / Structured Data** | 15% | **68 / 100** | Needs Improvement | Đã có `Organization`, `WebSite`, `Service`, `ProfilePage`, `BlogPosting`, `BreadcrumbList` (+), nhưng URL trong Schema đang trỏ về `http://localhost:3000` (Critical, -15), dùng `FAQPage` bị Google hạn chế trên trang thương mại (Warning, -5), và `BlogPosting` thiếu `datePublished`/`image` (Warning, -5). |
| **5. Performance (CWV Architecture)** | 10% | **82 / 100** | Good | Giao diện nhẹ, không cài script bên thứ ba nặng, ảnh mascot dùng `next/image` (+), nhưng việc đặt `"use client"` ở cấp cao nhất của hầu hết các trang (`/services`, `/case-studies`, `/about`, `/contact`) làm tăng JS hydration bundle không cần thiết (Warning, -5). |
| **6. Image Optimization** | 10% | **85 / 100** | Good | Có `alt` mô tả chi tiết bằng tiếng Việt cho ảnh Mascot, có định dạng `.webp` trong `public/images/` (+), nhưng `Header.tsx`, `Footer.tsx`, `SeoTrumHome.tsx` vẫn đang gọi file `.png` thay vì `.webp` đã nén sẵn (Warning, -5). |
| **7. AI Search Readiness (GEO)** | 5% | **60 / 100** | Needs Improvement | Đã mở quyền cho `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` trong `robots.txt` (+), nhưng tệp `public/llms.txt` hiện chỉ có 5 dòng và **0 đường dẫn** do lỗi `glob` backslash trên Windows trong `scripts/llmsGenerator.mjs` (Warning, -5). |
| **TỔNG ĐIỂM TRUNG BÌNH CÓ TRỌNG SỐ** | **100%** | **58 / 100** | **Needs Improvement** | **Nền tảng kiến trúc tốt nhưng đang bị kìm hãm bởi lỗi cấu hình `localhost` và thiếu từ khoá trực diện trên Money Pages.** |

---

### Top 3 Vấn Đề Nghiêm Trọng Nhất (Top 3 Blockers)
1. 🔴 **Canonical & Schema toàn trang trỏ về `http://localhost:3000`** (`src/config/config.json:4`) — Chặn khả năng Google lập chỉ mục đúng tên miền thật `https://seotrum.com`.
2. 🔴 **Mất hoàn toàn từ khoá `"dịch vụ tự động hoá automation"` trên các trang chuyển đổi (`/`, `/services`, `/services/cong-cu-tu-dong-hoa`)** — Nội dung chuẩn SEO trong `src/content/services/_index.md` không được sử dụng; `<h1>` và `<title>` hiện tại chỉ dùng khẩu hiệu chung chung.
3. 🔴 **Thẻ SEO Metadata (`<SeoMeta />`) chạy ở Client (`"use client"`) bên trong thẻ `<main>`** và **Menu Header/Footer chỉ dùng `#hash` anchor** (`/#phan-mem`, `/#giai-phap`) — Làm suy yếu tín hiệu thu thập dữ liệu và triệt tiêu dòng chảy PageRank nội bộ tới các trang `/services` và `/blog`.

### Top 3 Cơ Hội Bứt Phá Nhanh Nhất (Top 3 Quick-Win Opportunities)
1. 🟢 **Khôi phục và hợp nhất bộ từ khoá `"Dịch vụ tự động hoá (Automation)"` vào `<title>`, `<h1>`, `<h2>` của `/services`, `/services/cong-cu-tu-dong-hoa` và `/`** — Tận dụng ngay nội dung đã viết sẵn trong `src/content/services/_index.md` để khớp 100% Search Intent thương mại.
2. 🟢 **Chuyển Menu Header & Footer sang liên kết URL thật (`/services`, `/case-studies`, `/blog`, `/about`, `/contact`) & hiển thị toàn bộ 4 giải pháp trong HTML của `/services`** — Giúp Googlebot thu thập đủ 100% nội dung và dồn sức mạnh liên kết nội bộ về Money Page.
3. 🟢 **Sửa `base_url` thành `https://seotrum.com`, chuyển sang Next.js Server Metadata API và sửa lỗi `llmsGenerator.mjs`** — Đưa điểm Technical SEO & GEO từ 45–60 lên **95+/100** ngay lập tức.

---

## B) Bảng Chi Tiết Các Phát Hiện Kiểm Toán (Verified Findings Table)

| Khu Vực (Area) | Mức Độ (Severity) | Độ Tin Cậy (Confidence) | Phát Hiện (Finding) | Bằng Chứng Mã Nguồn (Evidence) | Giải Pháp Khắc Phục (Fix) |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **Technical SEO** | 🔴 **Critical** | `Confirmed` | `base_url` đang cấu hình là `http://localhost:3000`, làm hỏng toàn bộ `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD `@id` và `/sitemap.xml` động. | `src/config/config.json:4` (`"base_url": "http://localhost:3000"`); `src/layouts/partials/SeoMeta.tsx:33` (`currentUrl`); `src/app/sitemap.ts:9`. | Đổi `config.site.base_url` thành `"https://seotrum.com"` (hoặc đọc từ `process.env.NEXT_PUBLIC_SITE_URL \|\| "https://seotrum.com"`). |
| **On-Page SEO & Keyword** | 🔴 **Critical** | `Confirmed` | Cụm từ khoá mục tiêu `"dịch vụ tự động hoá automation"` và `"dịch vụ tự động hoá"` xuất hiện **0 lần** trên các trang được render (`/`, `/services`, `/services/cong-cu-tu-dong-hoa`). | `src/app/page.tsx:8-10`, `src/layouts/components/SeoTrumHome.tsx:449` (`<h1>Việc lặp lại, để phần mềm lo.</h1>`), `src/app/services/page.tsx:186,207` (`<h1>Đúng công cụ. Đúng việc.</h1>`). File `src/content/services/_index.md` bị bỏ trống không import. | Đưa cụm `"Dịch vụ tự động hoá (Automation)"` vào `<title>`, `<meta description>`, `<h1>`, `<h2>`, đoạn sapo đầu trang và bảng so sánh trên `/services`, `/services/cong-cu-tu-dong-hoa` và `/`. |
| **Technical SEO & Rendering** | 🔴 **Critical** | `Confirmed` | Toàn bộ thẻ `<title>`, `<meta>`, `<link rel="canonical">` và JSON-LD đang được render qua Client Component `<SeoMeta />` đặt trong `<main>` thay vì Server `<head>`. | `src/layouts/partials/SeoMeta.tsx:1` (`"use client"`); `src/app/services/page.tsx:1,185`, `src/app/about/page.tsx:1,101`, `src/app/contact/page.tsx:1,95`. | Sử dụng `export const metadata` / `generateMetadata` chuẩn Next.js 16 App Router ở Server Component để đảm bảo metadata luôn nằm trong `<head>` ngay từ phản hồi SSR đầu tiên. |
| **Internal Linking** | ⚠️ **Warning** | `Confirmed` | Menu chính trên Header và Footer chỉ trỏ tới các `#hash` trên trang chủ (`/#phan-mem`, `/#giai-phap`, `/#du-an`, `/#goc-chia-se`, `/#tu-van`). | `src/config/menu.json:2-37`; `src/layouts/partials/Header.tsx:112`. Hơn nữa `#phan-mem` và `#giai-phap` cùng trỏ vào 1 section (`SeoTrumHome.tsx:967-970`). | Cập nhật `src/config/menu.json` để trỏ trực tiếp tới URL thật: `/services`, `/case-studies`, `/blog`, `/about`, `/contact` nhằm phân phối PageRank toàn site. |
| **Content & DOM Visibility** | ⚠️ **Warning** | `Confirmed` | Trên trang `/services`, nội dung chi tiết của 3/4 giải pháp bị ẩn hoàn toàn khỏi HTML ban đầu do render phụ thuộc vào state `selectedPillarId`. | `src/app/services/page.tsx:162-167,350-492` chỉ render `activePillar` (mặc định là `SOL-01`), khiến Googlebot không thấy nội dung chi tiết của `SOL-02`, `SOL-03`, `SOL-04` trên `/services`. | Render toàn bộ 4 trụ cột giải pháp vào DOM (hoặc dùng class CSS `hidden`/`block` thay vì loại bỏ khỏi cây React) và tích hợp thêm phần nội dung so sánh từ `src/content/services/_index.md`. |
| **Sitemap & Indexability** | ⚠️ **Warning** | `Confirmed` | Tồn tại song song 2 cơ chế Sitemap (`src/app/sitemap.ts` và `public/sitemap-0.xml` của `next-sitemap`), trong đó `public/sitemap-0.xml` chứa URL rác `/elements`, `/robots.txt`, `/sitemap.xml`. | `public/sitemap-0.xml:3,28,34`; `src/content/pages/elements.md:6` (`draft: false` chứa văn bản mẫu tiếng Anh). | Đặt `draft: true` (hoặc xoá) `src/content/pages/elements.md`, cấu hình `exclude: ['/elements', '/robots.txt', '/sitemap.xml']` trong `next-sitemap.config.js` hoặc dùng thống nhất `src/app/sitemap.ts`. |
| **Schema Markup** | ⚠️ **Warning** | `Confirmed` | Chèn `FAQPage` Schema trên các trang thương mại `/services/[slug]` và `/case-studies/[slug]`, và thiếu `datePublished`/`image`/`sameAs` trong `BlogPosting` & `Organization`. | `src/app/services/[slug]/page.tsx:55-66`; `src/app/case-studies/[slug]/page.tsx:54-65`; `src/app/blog/[single]/page.tsx:38-58`; `src/layouts/partials/SeoMeta.tsx:45-68`. | Gỡ `FAQPage` khỏi JSON-LD thương mại (tuân thủ quy định Google 08/2023), bổ sung `datePublished`, `dateModified`, `image` vào `BlogPosting` và `sameAs` (từ `social.json`) vào `Organization`. |
| **AI Search (GEO)** | ⚠️ **Warning** | `Confirmed` | File `public/llms.txt` bị trống danh sách URL (chỉ có 5 dòng mở đầu) khiến các AI Engine (ChatGPT, Perplexity, Claude) không đọc được danh mục trang. | `public/llms.txt:1-6`; `scripts/llmsGenerator.mjs:106` dùng `path.join(inputDir, "**/*.html")` sinh dấu `\` trên Windows làm `glob` v13 trả về 0 file. | Sửa `scripts/llmsGenerator.mjs` dùng `.replace(/\\/g, "/")` hoặc `windowsPathsNoEscape: true` khi gọi `glob`, đồng thời bật `generate_llms_full_txt: true` trong `config.json`. |
| **Topical Authority (Blog)** | ⚠️ **Warning** | `Confirmed` | Độ dài 4 bài Blog hiện tại (909–1.300 từ) thấp hơn chuẩn Pillar Page (1.500+ từ) và chưa có bài viết đánh trúng từ khoá `"dịch vụ tự động hoá automation"`. | `src/content/blog/*.md` (909, 972, 1.002, 1.300 từ); 10 bài Cluster trong `SEO-STRATEGY.md:38-50` chưa được tạo. | Mở rộng bài Pillar lên >1.500 từ và xuất bản các bài Cluster so sánh công cụ Automation (`n8n`, `Make`, `Zapier`, `Custom Code Automation`) trỏ internal link về `/services`. |
| **Conversion / UX Trust** | ℹ️ **Info** | `Confirmed` | Form tư vấn trên `/` và `/contact` hiện chỉ kiểm tra hợp lệ ở Client (chế độ xem trước) chứ chưa gọi `fetch('/api/consultation')`, và Footer đang ghi `© 2024 Sèo Trum`. | `src/layouts/components/SeoTrumHome.tsx:325-374`; `src/app/contact/page.tsx:34-91,346`; `src/layouts/partials/Footer.tsx:65`. | Kết nối hàm submit của cả 2 form tới endpoint `POST /api/consultation` đã viết sẵn tại `src/app/api/consultation/route.ts` và đồng bộ năm bản quyền `2026`. |

---

## C) Phân Tích Chuyên Sâu Cho Từ Khoá `"dịch vụ tự động hoá automation"`

### 1. Giải Mã Ý Định Tìm Kiếm (Search Intent Breakdown)
Khi khách hàng doanh nghiệp (B2B, SME, Chủ shop, Đội vận hành/Marketing) gõ từ khoá **"dịch vụ tự động hoá automation"** (hoặc *"dịch vụ tự động hoá"*, *"dịch vụ làm automation"*, *"thuê viết phần mềm tự động hoá"*), Google phân loại đây là truy vấn **Commercial / Transactional (Ý định mua hàng / thuê dịch vụ)**.
Để xếp hạng **Top 1–3**, trang đích (Money Page) bắt buộc phải thoả mãn đồng thời 4 tín hiệu:
1. **Khớp ngữ nghĩa trực diện (Exact & Semantic Match)**: Cụm *"Dịch vụ tự động hoá (Automation)"* phải nằm ở đầu thẻ `<title>`, trong thẻ `<h1>`, `<h2>` và trong 100 chữ đầu tiên của trang `/services` (hoặc `/services/cong-cu-tu-dong-hoa`).
2. **Độ sâu giải pháp (Service Depth >= 800–1.200 từ hiển thị tĩnh)**: Liệt kê rõ các hình thức dịch vụ Automation mà khách hàng đang tìm:
   - *Workflow Automation* (n8n, Make, Zapier kết hợp Webhook/API)
   - *Custom Software & Web App Automation* (Node.js, Python, Next.js)
   - *Browser Automation & Data Scraping* (Playwright, Puppeteer)
   - *ChatOps & Bot Automation* (Bot Telegram, Zalo, Slack báo cáo & duyệt lệnh)
   - *AI Agent & SEO Automation*
3. **Bằng chứng thực thi & Bảng so sánh (E-E-A-T Proof)**: Bảng so sánh *Làm thủ công vs. Thuê ngoài SaaS rời rạc vs. Dịch vụ Automation may đo tại Sèo Trum*, quy trình bàn giao, cam kết bảo mật và liên kết tới các mô hình dự án thực tế (`/case-studies`).
4. **Sức mạnh cụm chủ đề (Topical Authority & Internal Link)**: Các bài Blog chuyên sâu dùng anchor text chứa từ khoá *"dịch vụ tự động hoá automation"*, *"dịch vụ tự động hoá quy trình"* trỏ thẳng về trang đích.

### 2. Khoảng Trống Giữa Thiết Kế Hiện Tại Và Yêu Cầu Top Google
| Yếu Tố Trên Trang Đích (`/services`) | Hiện Tại Trong Code (`src/app/services/page.tsx`) | Chuẩn Cần Đạt Để Lên Top `"dịch vụ tự động hoá automation"` |
| :--- | :--- | :--- |
| **URL đích chính** | `/services` (và `/services/cong-cu-tu-dong-hoa`) | Giữ nguyên `/services` làm Hub Dịch vụ chung và `/services/cong-cu-tu-dong-hoa` làm trang chuyên sâu. |
| **Thẻ `<title>`** | `Giải pháp & Phần mềm tự động hoá theo yêu cầu — Sèo Trum` (Thiếu từ *"Dịch vụ"* và *"Automation"*) | `Dịch Vụ Tự Động Hoá (Automation) & Xây Dựng Phần Mềm Theo Yêu Cầu | Sèo Trum` |
| **Thẻ `<h1>`** | `Đúng công cụ. Đúng việc.` (Không có bất kỳ từ khoá nào!) | `Dịch Vụ Tự Động Hoá (Automation) & Phần Mềm Theo Yêu Cầu Cho Doanh Nghiệp` (Giữ câu *"Đúng công cụ. Đúng việc."* làm Eyebrow hoặc khẩu hiệu phụ). |
| **Mật độ từ khoá chính** | `0` lần xuất hiện `"dịch vụ tự động hoá"`, `0` lần xuất hiện `"automation"` trong nội dung văn bản. | Xuất hiện tự nhiên 4–6 lần (bao gồm biến thể: *dịch vụ tự động hoá automation*, *dịch vụ tự động hoá quy trình*, *giải pháp automation doanh nghiệp*). |
| **Nội dung HTML tĩnh** | Ẩn 3/4 trụ cột dịch vụ sau sự kiện click chuột (`useState`). | Hiển thị đầy đủ cả 4 nhóm dịch vụ + Bảng so sánh giải pháp + Câu hỏi thường gặp ngay trong HTML tĩnh. |

---

## D) Những Điểm Chưa Xác Định & Cần Kiểm Tra Thêm Khi Lên Production (Unknowns & Follow-ups)

Theo nguyên tắc chống suy diễn (Anti-Hallucination Guardrails), các yếu tố dưới đây phụ thuộc vào môi trường Production thực tế (`https://seotrum.com`) và cần được xác minh sau khi deploy:
1. **Dữ liệu thực tế từ Google Search Console (GSC)**: Cần xác minh trạng thái xác thực tên miền `seotrum.com`, lịch sử gửi Sitemap và báo cáo Coverage/Indexing thực tế.
2. **Chỉ số CrUX / PageSpeed Insights thực tế trên mạng Internet**: Mã nguồn hiện tại rất nhẹ (kiến trúc đạt chuẩn CWV), nhưng điểm LCP/INP thực tế trên môi trường Production sẽ phụ thuộc vào hạ tầng lưu trữ (Vercel/VPS/Cloudflare CDN) và cấu hình nén Brotli/Cache-Control.
3. **Hồ sơ Backlink & Tín hiệu Thực thể bên ngoài (Off-Page Entity)**: Cần kiểm tra các trang mạng xã hội khai báo trong `src/config/social.json` (`facebook.com/seotrum`, `github.com/seotrum`, `linkedin.com/in/seotrum`, `x.com/seotrum`) đã được tạo thật và trỏ link ngược về `https://seotrum.com` hay chưa.
