export type SolutionOption =
  | "Tự động hoá"
  | "Web & App"
  | "API, Bot & Tích hợp"
  | "SEO"
  | "Chưa rõ, cần tư vấn";

export interface ServiceDetailItem {
  slug: string;
  code: string;
  tag: string;
  shortTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSummary: string;
  formOption: SolutionOption;
  targetKeywords: string[];
  painPoints: {
    title: string;
    detail: string;
  }[];
  deliverables: {
    title: string;
    detail: string;
  }[];
  workflowSteps: {
    step: string;
    name: string;
    detail: string;
  }[];
  useCases: string[];
  techStack: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedCaseStudySlug: string;
}

export interface CaseStudyDetailItem {
  slug: string;
  code: string;
  tag: string;
  tagStyle: "brand" | "dark";
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  formOption: SolutionOption;
  relatedServiceSlug: string;
  problemContext: string;
  manualPainPoints: string[];
  automatedAdvantages: string[];
  architectureNodes: {
    step: string;
    title: string;
    input: string;
    rule: string;
    output: string;
  }[];
  sampleRecords: {
    id: string;
    source: string;
    action: string;
    status: string;
  }[];
  techStack: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICE_CATALOG: ServiceDetailItem[] = [
  {
    slug: "cong-cu-tu-dong-hoa",
    code: "SOL-01",
    tag: "DỊCH VỤ AUTOMATION QUY TRÌNH",
    shortTitle: "Dịch vụ & Công cụ tự động hoá",
    title: "Dịch Vụ Tự Động Hoá Quy Trình (Automation) & Xây Dựng Công Cụ Riêng",
    metaTitle:
      "Dịch Vụ Tự Động Hoá Quy Trình (Workflow Automation) Theo Yêu Cầu | Sèo Trum",
    metaDescription:
      "Dịch vụ tự động hoá (automation) quy trình vận hành theo yêu cầu tại Sèo Trum: xây dựng công cụ tự động nhận dữ liệu, chuẩn hoá quy tắc, đồng bộ CRM/Sheet và chạy ngầm 24/7.",
    heroSummary:
      "Thay thế các thao tác copy-paste, kiểm tra chéo và tổng hợp báo cáo lặp đi lặp lại mỗi ngày bằng dịch vụ tự động hoá (automation) và công cụ phần mềm chạy theo đúng quy tắc nghiệp vụ của bạn.",
    formOption: "Tự động hoá",
    targetKeywords: [
      "dịch vụ tự động hoá automation",
      "dịch vụ tự động hoá quy trình",
      "workflow automation doanh nghiệp",
      "công cụ tự động hoá theo yêu cầu",
      "phần mềm tự động hoá công việc",
    ],
    painPoints: [
      {
        title: "Nhập liệu lặp lại giữa nhiều file và biểu mẫu",
        detail:
          "Nhân sự tốn hàng giờ mỗi ngày chỉ để mở biểu mẫu, bảng tính và phần mềm nội bộ rồi copy-paste từng dòng dữ liệu qua lại.",
      },
      {
        title: "Sai sót khi kiểm tra điều kiện bằng mắt",
        detail:
          "Khi số lượng bản ghi tăng lên, việc dò tìm trùng mã, thiếu số điện thoại hay sai định dạng bằng tay rất dễ bỏ sót.",
      },
      {
        title: "Chậm trễ tổng hợp báo cáo tiến độ cuối ngày",
        detail:
          "Người quản lý phải chờ nhân sự gom dữ liệu thủ công từ nhiều nguồn mới nắm được tình hình xử lý trong ngày.",
      },
    ],
    deliverables: [
      {
        title: "Bộ thu nhận & kiểm tra dữ liệu đầu vào tự động",
        detail:
          "Tự động đọc dữ liệu từ biểu mẫu, file bảng tính hoặc nguồn đầu vào và kiểm tra tính hợp lệ ngay lập tức.",
      },
      {
        title: "Bộ quy tắc xử lý (Rule Engine) thiết kế riêng",
        detail:
          "Chuẩn hoá định dạng, phân loại nhóm yêu cầu, tính toán hoặc gán nhãn tự động theo đúng logic của doanh nghiệp.",
      },
      {
        title: "Cơ chế chạy theo lịch (Cron) hoặc theo sự kiện",
        detail:
          "Cấu hình công cụ tự chạy định kỳ mỗi giờ/mỗi ngày hoặc kích hoạt tức thì khi có dữ liệu mới phát sinh.",
      },
      {
        title: "Nhật ký thực thi (Execution Log) minh bạch",
        detail:
          "Lưu lại toàn bộ lịch sử từng lượt chạy, bản ghi nào thành công, bản ghi nào cần kiểm tra lại để dễ dàng đối soát.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        name: "Nhận dữ liệu (Input)",
        detail:
          "Thu nhận bản ghi mới từ Biểu mẫu, Bảng tính hoặc File dữ liệu đầu vào.",
      },
      {
        step: "02",
        name: "Xử lý theo quy tắc (Rule)",
        detail:
          "Kiểm tra định dạng, lọc trùng lặp, phân loại điều kiện và chuẩn hoá cấu trúc.",
      },
      {
        step: "03",
        name: "Đồng bộ & Báo cáo (Sync)",
        detail:
          "Cập nhật vào hệ thống đích, ghi nhật ký đối soát và gửi thông báo hoàn tất.",
      },
    ],
    useCases: [
      "Tự động gom đơn / yêu cầu từ nhiều biểu mẫu về một bảng điều phối chuẩn hoá",
      "Công cụ tự động kiểm tra, làm sạch và đối soát dữ liệu bảng tính hàng ngày",
      "Tự động tổng hợp báo cáo vận hành định kỳ và gửi thông báo cho quản lý",
      "Công cụ theo dõi thay đổi dữ liệu và cảnh báo khi có bất thường kỹ thuật",
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "Python",
      "Cron / Queue Workers",
      "Google Sheets API",
      "Webhook",
    ],
    faqs: [
      {
        question:
          "Quy trình của tôi đang làm trên Google Sheets / Excel thì có tự động hoá được không?",
        answer:
          "Hoàn toàn được. Rất nhiều bài toán bắt đầu từ việc tự động đọc, chuẩn hoá và đồng bộ dữ liệu trực tiếp trên Google Sheets hoặc file Excel mà không buộc đội ngũ phải thay đổi thói quen đột ngột.",
      },
      {
        question: "Khi dữ liệu đầu vào bị sai định dạng thì công cụ xử lý thế nào?",
        answer:
          "Công cụ sẽ không làm hỏng dữ liệu chung mà tự động tách riêng bản ghi lỗi sang danh sách cần kiểm tra, đồng thời ghi rõ lý do lỗi trong nhật ký thực thi.",
      },
    ],
    relatedCaseStudySlug: "cong-cu-xu-ly-va-dong-bo-du-lieu-da-kenh",
  },
  {
    slug: "thiet-ke-web-app-theo-yeu-cau",
    code: "SOL-02",
    tag: "CUSTOM WEB & INTERNAL APP",
    shortTitle: "Web & App theo yêu cầu",
    title: "Thiết kế Web & Ứng dụng Nội bộ Theo Yêu cầu (Custom Web App)",
    metaTitle:
      "Thiết kế Web & Ứng dụng Nội bộ Theo Yêu cầu — Sèo Trum",
    metaDescription:
      "Xây dựng ứng dụng web nội bộ, dashboard quản lý vận hành và cổng khách hàng theo yêu cầu. Giao diện gọn rõ, phân quyền chặt chẽ, bám sát quy trình thực tế.",
    heroSummary:
      "Khi bảng tính không còn chịu nổi khối lượng dữ liệu và phần mềm đóng gói sẵn không khớp nghiệp vụ riêng, Sèo Trum xây dựng ứng dụng web vừa khít quy trình của bạn.",
    formOption: "Web & App",
    targetKeywords: [
      "thiết kế web app theo yêu cầu",
      "xây dựng ứng dụng nội bộ doanh nghiệp",
      "lập trình web quản lý vận hành",
      "custom web application",
    ],
    painPoints: [
      {
        title: "Bảng tính bị quá tải và rối phân quyền",
        detail:
          "Khi nhiều nhân sự cùng mở và sửa một file dữ liệu lớn, việc nhầm lẫn công thức, xoá nhầm dòng hoặc lộ thông tin nhạy cảm rất dễ xảy ra.",
      },
      {
        title: "Phần mềm có sẵn trên thị trường quá cồng kềnh",
        detail:
          "Doanh nghiệp phải trả phí cho hàng chục tính năng không dùng tới nhưng lại thiếu đúng màn hình xử lý nghiệp vụ đặc thù của mình.",
      },
      {
        title: "Không nhìn thấy bức tranh vận hành trên một màn hình",
        detail:
          "Thông tin nằm rải rác ở nhiều nơi khiến việc tra cứu lịch sử khách hàng và trạng thái công việc mất nhiều thời gian.",
      },
    ],
    deliverables: [
      {
        title: "Giao diện Dashboard vận hành tập trung, sáng rõ",
        detail:
          "Thiết kế tối ưu cho thao tác hàng ngày: chỉ hiển thị đúng trường thông tin, bộ lọc và nút hành động mà nhân sự thực sự cần.",
      },
      {
        title: "Hệ thống quản lý trạng thái & luồng công việc",
        detail:
          "Theo dõi mạch lạc từng đầu việc từ lúc Mới tiếp nhận → Đang xử lý → Chờ duyệt → Hoàn tất kèm lịch sử người thao tác.",
      },
      {
        title: "Phân quyền vai trò (Role-based Access) rõ ràng",
        detail:
          "Mỗi bộ phận chỉ nhìn thấy và thao tác trên đúng phạm vi dữ liệu được cấp quyền, bảo mật thông tin vận hành.",
      },
      {
        title: "Cơ sở dữ liệu chuẩn hoá & Sẵn sàng mở rộng",
        detail:
          "Kiến trúc dữ liệu sạch, tốc độ truy vấn nhanh và có sẵn cổng API để kết nối thêm các công cụ tự động hoá khác.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        name: "Tiếp nhận & Khởi tạo",
        detail:
          "Nhân sự hoặc khách hàng gửi yêu cầu qua biểu mẫu chuẩn hoá trên ứng dụng web.",
      },
      {
        step: "02",
        name: "Điều phối & Xử lý",
        detail:
          "Hệ thống phân luồng theo vai trò, cập nhật trạng thái và kiểm tra điều kiện tại từng bước.",
      },
      {
        step: "03",
        name: "Theo dõi & Lưu trữ",
        detail:
          "Quản lý xem tổng quan tiến độ theo thời gian thực và tra cứu lịch sử bất cứ lúc nào.",
      },
    ],
    useCases: [
      "Hệ thống quản lý công việc, điều phối yêu cầu và theo dõi tiến độ nội bộ",
      "Cổng thông tin khách hàng (Client Portal) tra cứu trạng thái đơn hàng / dịch vụ",
      "Ứng dụng quản lý dữ liệu chuyên biệt thay thế hệ thống file bảng tính phức tạp",
      "Dashboard tổng hợp dữ liệu vận hành từ nhiều bộ phận về một màn hình",
    ],
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL / Prisma",
      "REST API",
    ],
    faqs: [
      {
        question:
          "Ứng dụng web có dùng tốt trên điện thoại cho nhân sự hiện trường không?",
        answer:
          "Có. Mọi giao diện Web App do Sèo Trum xây dựng đều được thiết kế đáp ứng (responsive) chuẩn trên cả màn hình máy tính lớn lẫn điện thoại di động.",
      },
      {
        question: "Doanh nghiệp có toàn quyền sở hữu mã nguồn và dữ liệu không?",
        answer:
          "Có. Hệ thống được thiết kế riêng cho doanh nghiệp của bạn, bàn giao rõ ràng và triển khai trên hạ tầng do bạn kiểm soát.",
      },
    ],
    relatedCaseStudySlug: "he-thong-quan-ly-va-dieu-phoi-van-hanh",
  },
  {
    slug: "tich-hop-api-bot-he-thong",
    code: "SOL-03",
    tag: "API, BOT & SYSTEM INTEGRATION",
    shortTitle: "API, Bot & Tích hợp",
    title: "Phát triển Bot Tự động & Tích hợp API Đa nền tảng",
    metaTitle:
      "Phát triển Bot Tự động & Tích hợp API Đa nền tảng — Sèo Trum",
    metaDescription:
      "Kết nối CRM, bảng tính, website và công cụ chat nội bộ qua API/Webhook. Xây dựng Bot thông báo trạng thái, nhắc việc và đồng bộ dữ liệu tự động.",
    heroSummary:
      "Giúp các phần mềm đang dùng trong doanh nghiệp tự động nói chuyện với nhau qua API và Webhook, kết hợp Bot thông báo tức thì để không bỏ lỡ bất kỳ đầu việc nào.",
    formOption: "API, Bot & Tích hợp",
    targetKeywords: [
      "tích hợp api hệ thống",
      "lập trình bot tự động",
      "đồng bộ dữ liệu webhook crm",
      "xây dựng bot telegram zalo báo cáo",
    ],
    painPoints: [
      {
        title: "Phần mềm rời rạc, dữ liệu không tự thông nhau",
        detail:
          "Khách đăng ký trên website một đằng, bảng theo dõi của sale một nẻo, còn bộ phận kỹ thuật lại dùng công cụ quản lý khác.",
      },
      {
        title: "Thông báo trong nhóm chat bị trôi và thiếu đầu mối",
        detail:
          "Nhắn tin thủ công trong nhóm chat dễ bị trôi mất khi nhiều tin nhắn dồn dập, không rõ ai đã nhận xử lý yêu cầu.",
      },
      {
        title: "Mất thời gian tra cứu trạng thái qua lại giữa các bộ phận",
        detail:
          "Mỗi lần cần kiểm tra một mã đơn hay yêu cầu lại phải nhờ người khác mở phần mềm lên xem hộ.",
      },
    ],
    deliverables: [
      {
        title: "Cầu nối trung gian (API / Webhook Bridge) ổn định",
        detail:
          "Tự động lắng nghe sự kiện từ nền tảng A, biến đổi dữ liệu đúng chuẩn và đẩy sang nền tảng B theo thời gian thực.",
      },
      {
        title: "Bot thông báo & Tương tác ngay trong khung chat",
        detail:
          "Gửi thông báo có cấu trúc rõ ràng khi có yêu cầu mới, thay đổi trạng thái hoặc hỗ trợ gõ lệnh tra cứu nhanh.",
      },
      {
        title: "Cơ chế hàng đợi (Queue) & Tự động thử lại (Retry)",
        detail:
          "Đảm bảo không mất dữ liệu ngay cả khi hệ thống bên thứ ba tạm thời bảo trì hoặc phản hồi chậm.",
      },
      {
        title: "Báo cáo đối soát đồng bộ định kỳ",
        detail:
          "Tự động kiểm tra chéo số lượng bản ghi giữa các hệ thống và gửi tóm tắt trạng thái kết nối mỗi ngày.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        name: "Bắt sự kiện (Webhook / Trigger)",
        detail:
          "Hệ thống ghi nhận ngay khi có bản ghi mới trên Web, CRM hoặc Bảng tính.",
      },
      {
        step: "02",
        name: "Ánh xạ & Biến đổi (Mapping)",
        detail:
          "Chuẩn hoá cấu trúc JSON, kiểm tra mã định danh và lọc theo điều kiện nghiệp vụ.",
      },
      {
        step: "03",
        name: "Đẩy API & Bot báo tin",
        detail:
          "Đồng bộ sang phần mềm đích và gửi thẻ thông báo gọn rõ vào nhóm làm việc.",
      },
    ],
    useCases: [
      "Đồng bộ tự động khách hàng tiềm năng từ Website / Landing Page về CRM & Google Sheets",
      "Bot thông báo đơn mới, nhắc việc tồn đọng và báo cáo tổng kết cuối ngày qua Telegram / Slack / Zalo",
      "Tích hợp hai chiều giữa công cụ quản lý công việc nội bộ và bảng dữ liệu kế toán / vận hành",
      "Bot hỗ trợ nhân sự gõ mã bản ghi để tra cứu nhanh trạng thái ngay trên điện thoại",
    ],
    techStack: [
      "REST API",
      "Webhook",
      "Node.js / Python",
      "Telegram / Slack / Zalo Bot API",
      "Message Queue",
      "JSON Schema",
    ],
    faqs: [
      {
        question:
          "Nếu một phần mềm bên thứ ba bị lỗi mạng tạm thời thì dữ liệu có bị mất không?",
        answer:
          "Không. Cầu nối tích hợp của Sèo Trum luôn có bước lưu đệm và cơ chế tự thử lại (retry) kèm cảnh báo để bạn kiểm soát toàn bộ bản ghi.",
      },
      {
        question: "Có thể giới hạn chỉ những người được phép mới tra cứu được qua Bot không?",
        answer:
          "Có. Bot được phân quyền theo ID người dùng hoặc nhóm chat cụ thể, chỉ phản hồi cho các tài khoản nhân sự đã được xác thực.",
      },
    ],
    relatedCaseStudySlug: "he-thong-bot-thong-bao-va-tra-cuu-nhanh",
  },
  {
    slug: "kien-truc-web-va-tu-dong-hoa-seo",
    code: "SOL-04",
    tag: "TECHNICAL SEO & WEB ARCHITECTURE",
    shortTitle: "Kiến trúc Web & SEO",
    title: "Kiến trúc Website Chuẩn SEO & Hệ thống Tự động hoá SEO",
    metaTitle:
      "Kiến trúc Website Chuẩn SEO & Hệ thống Tự động hoá SEO — Sèo Trum",
    metaDescription:
      "Xây dựng website có cấu trúc thông tin mạch lạc, chuẩn Technical SEO, Schema JSON-LD và kết hợp công cụ tự động hoá hỗ trợ quản trị nội dung bền vững.",
    heroSummary:
      "Kết hợp tư duy kỹ thuật phần mềm vào SEO: xây dựng nền tảng website tải nhanh, phân trang rõ ràng theo đúng chủ đề tìm kiếm và tự động hoá các bước kiểm tra kỹ thuật lặp lại.",
    formOption: "SEO",
    targetKeywords: [
      "kiến trúc website chuẩn seo",
      "tự động hoá seo",
      "technical seo doanh nghiệp",
      "xây dựng web tối ưu seo google",
    ],
    painPoints: [
      {
        title: "Gom mọi dịch vụ vào 1 trang duy nhất khiến khó lên top",
        detail:
          "Khi tất cả dịch vụ và chủ đề bị nhồi chung vào một URL, Google khó xác định trang đích chuyên sâu cho từng nhóm từ khoá cụ thể.",
      },
      {
        title: "Cấu trúc kỹ thuật (Schema, Meta, Heading) thiếu đồng bộ",
        detail:
          "Thiếu dữ liệu có cấu trúc JSON-LD, thẻ tiêu đề trùng lặp hoặc liên kết nội bộ đứt gãy làm giảm khả năng thu thập dữ liệu của bộ máy tìm kiếm.",
      },
      {
        title: "Tốn nhiều công sức kiểm tra lỗi SEO và quản lý nội dung bằng tay",
        detail:
          "Khi số lượng trang tăng lên, việc rà soát thủ công từng bài viết, thẻ meta và trạng thái index rất mất thời gian.",
      },
    ],
    deliverables: [
      {
        title: "Kiến trúc phân tầng trang đích (Silo / Topic Cluster) rõ ràng",
        detail:
          "Mỗi giải pháp, mô hình dự án và chủ đề kiến thức được tách thành một trang chuyên biệt có URL, từ khoá mục tiêu và nội dung sâu riêng.",
      },
      {
        title: "Chuẩn hoá Technical SEO & Dữ liệu có cấu trúc (JSON-LD)",
        detail:
          "Tích hợp tự động Schema Organization, Service, ProfilePage, BlogPosting, FAQPage, BreadcrumbList và Sitemap XML động.",
      },
      {
        title: "Tối ưu tốc độ phản hồi & Trải nghiệm đọc (Core Web Vitals)",
        detail:
          "Giao diện nền sáng kỹ thuật nhẹ, hình ảnh WebP tối ưu và bố cục di động mượt mà giúp giữ chân người dùng thật.",
      },
      {
        title: "Công cụ hỗ trợ kiểm tra cấu trúc & Quản trị nội dung",
        detail:
          "Thiết lập các kịch bản tự động kiểm tra thẻ meta, liên kết nội bộ và cấu trúc tiêu đề trước khi xuất bản nội dung mới.",
      },
    ],
    workflowSteps: [
      {
        step: "01",
        name: "Phân tích chủ đề & Phân trang",
        detail:
          "Xác định nhóm nhu cầu tìm kiếm thật của khách hàng và tách thành các trang đích độc lập.",
      },
      {
        step: "02",
        name: "Chuẩn hoá kỹ thuật & Schema",
        detail:
          "Thiết lập hệ thống Metadata, JSON-LD Schema, Sitemap và mạng lưới liên kết nội bộ chặt chẽ.",
      },
      {
        step: "03",
        name: "Vận hành & Tự động kiểm tra",
        detail:
          "Mở rộng nội dung có chiều sâu kết hợp công cụ tự động rà soát sức khoẻ kỹ thuật định kỳ.",
      },
    ],
    useCases: [
      "Xây dựng mới website thương hiệu & dịch vụ B2B có cấu trúc chuẩn SEO ngay từ gốc",
      "Tái cấu trúc website cũ đang bị dồn trang thành hệ thống các trang đích chuyên biệt theo từng dịch vụ",
      "Xây dựng công cụ nội bộ tự động kiểm tra lỗi thẻ Meta, Heading, Broken Links và Schema",
      "Thiết lập hệ thống quản trị nội dung chuyên đề (Knowledge Base / Blog) chuẩn cấu trúc ngữ nghĩa",
    ],
    techStack: [
      "Next.js App Router",
      "Schema.org JSON-LD",
      "Dynamic Sitemap & Robots",
      "Core Web Vitals",
      "SEO Audit Scripts",
    ],
    faqs: [
      {
        question:
          "Vì sao tách mỗi chức năng / giải pháp thành một trang riêng lại tốt hơn cho SEO Google?",
        answer:
          "Mỗi trang riêng cho phép tối ưu chính xác một nhóm từ khoá (Title, URL, H1, Schema Service, FAQ riêng), giúp Google hiểu rõ chuyên môn của từng trang và xếp hạng đúng trang cho đúng nhu cầu tìm kiếm.",
      },
      {
        question: "Sèo Trum có cam kết thứ hạng ảo trong thời gian ngắn không?",
        answer:
          "Không. Sèo Trum tập trung xây dựng nền tảng kỹ thuật chuẩn, cấu trúc thông tin rõ ràng và nội dung giải quyết đúng vấn đề thật để tạo sức tăng trưởng tự nhiên và bền vững.",
      },
    ],
    relatedCaseStudySlug: "kien-truc-website-dich-vu-toi-uu-seo",
  },
];

export const CASE_STUDY_CATALOG: CaseStudyDetailItem[] = [
  {
    slug: "he-thong-quan-ly-va-dieu-phoi-van-hanh",
    code: "MOD-01",
    tag: "WEB APP / AUTOMATION",
    tagStyle: "brand",
    title: "Hệ thống Quản lý & Điều phối Vận hành Tập trung",
    metaTitle:
      "Mô hình Hệ thống Quản lý & Điều phối Vận hành Tập trung — Sèo Trum",
    metaDescription:
      "Mô hình giải pháp minh hoạ của Sèo Trum: xây dựng Web App quản lý công việc, phân luồng trạng thái xử lý và theo dõi dữ liệu vận hành tập trung trên một màn hình.",
    summary:
      "Theo dõi công việc, trạng thái xử lý và dữ liệu tập trung trên một màn hình duy nhất, giảm chuyển đổi qua lại giữa nhiều bảng tính và nhóm chat.",
    formOption: "Web & App",
    relatedServiceSlug: "thiet-ke-web-app-theo-yeu-cau",
    problemContext:
      "Khi đội ngũ nhận yêu cầu từ nhiều kênh (biểu mẫu web, tin nhắn, bảng tính) nhưng không có một màn hình điều phối chung, người quản lý rất khó biết đầu việc nào đang chờ, đầu việc nào đã xong.",
    manualPainPoints: [
      "Yêu cầu mới nằm rải rác ở nhiều file bảng tính và tin nhắn nhóm",
      "Phải hỏi từng nhân sự để biết trạng thái xử lý hiện tại của một yêu cầu",
      "Không có lịch sử rõ ràng khi cần tra cứu lại các bước đã thực hiện",
    ],
    automatedAdvantages: [
      "Mọi yêu cầu mới tự động gom về một danh sách chuẩn hoá ngay khi phát sinh",
      "Trạng thái xử lý hiển thị trực quan: Mới tiếp nhận → Đang xử lý → Hoàn tất",
      "Lưu vết đầy đủ thời gian và người phụ trách cho từng bước chuyển trạng thái",
    ],
    architectureNodes: [
      {
        step: "01",
        title: "Cổng tiếp nhận chuẩn hoá",
        input: "Biểu mẫu yêu cầu / Nhập liệu nội bộ",
        rule: "Kiểm tra trường bắt buộc & cấp mã tự động (REQ-001)",
        output: "Bản ghi chuẩn hoá trong cơ sở dữ liệu",
      },
      {
        step: "02",
        title: "Bộ điều phối trạng thái",
        input: "Bản ghi ở trạng thái Mới tiếp nhận",
        rule: "Phân nhóm nghiệp vụ & gán bộ phận phụ trách",
        output: "Cập nhật hàng đợi làm việc theo từng vai trò",
      },
      {
        step: "03",
        title: "Dashboard theo dõi & Đối soát",
        input: "Cập nhật từ nhân sự thực thi",
        rule: "Kiểm tra điều kiện hoàn tất & tổng hợp tiến độ",
        output: "Hiển thị trực quan trên màn hình quản lý",
      },
    ],
    sampleRecords: [
      {
        id: "REQ-001",
        source: "Biểu mẫu Web",
        action: "Tự động phân loại & gán bộ phận",
        status: "Hoàn tất",
      },
      {
        id: "REQ-002",
        source: "Nhập liệu nội bộ",
        action: "Kiểm tra điều kiện & cập nhật tiến độ",
        status: "Đang xử lý",
      },
      {
        id: "REQ-003",
        source: "Webhook API",
        action: "Tiếp nhận vào hàng đợi chuẩn hoá",
        status: "Mới tiếp nhận",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Role-based Access",
    ],
    faqs: [
      {
        question:
          "Mô hình này có thể tuỳ chỉnh số bước trạng thái theo quy trình riêng không?",
        answer:
          "Hoàn toàn được. Số bước trạng thái, tên gọi và điều kiện chuyển bước đều được thiết kế bám sát quy trình thực tế của doanh nghiệp bạn.",
      },
    ],
  },
  {
    slug: "cong-cu-xu-ly-va-dong-bo-du-lieu-da-kenh",
    code: "MOD-02",
    tag: "CUSTOM TOOL / API",
    tagStyle: "dark",
    title: "Công cụ Kiểm tra, Chuẩn hoá & Đồng bộ Dữ liệu Đa nền tảng",
    metaTitle:
      "Mô hình Công cụ Xử lý & Đồng bộ Dữ liệu Đa nền tảng — Sèo Trum",
    metaDescription:
      "Mô hình giải pháp minh hoạ của Sèo Trum: tự động kiểm tra định dạng, lọc trùng bản ghi và đồng bộ dữ liệu sạch giữa bảng tính, CRM và cơ sở dữ liệu qua API.",
    summary:
      "Tự động kiểm tra, chuẩn hoá và đẩy dữ liệu giữa các nền tảng, loại bỏ thao tác xuất-nhập file thủ công dễ gây lệch dữ liệu.",
    formOption: "API, Bot & Tích hợp",
    relatedServiceSlug: "cong-cu-tu-dong-hoa",
    problemContext:
      "Khi doanh nghiệp sử dụng song song bảng tính và phần mềm quản lý (CRM/ERP), việc xuất file từ nơi này rồi sửa tay để nhập vào nơi kia tốn nhiều thời gian và rất dễ làm lệch dữ liệu.",
    manualPainPoints: [
      "Dò tìm thủ công các dòng thiếu thông tin, sai định dạng SĐT/Email hoặc trùng mã",
      "Tốn thời gian xuất file CSV/Excel rồi tải lên phần mềm đích mỗi ngày",
      "Khó phát hiện bản ghi nào bị lỗi trong quá trình nhập hàng loạt",
    ],
    automatedAdvantages: [
      "Tự động kiểm tra và chuẩn hoá từng trường dữ liệu ngay khi đọc nguồn",
      "Tách bạch rõ bản ghi hợp lệ để đồng bộ ngay và bản ghi lỗi cần xem lại",
      "Lưu nhật ký đối soát chi tiết cho từng lượt đồng bộ API",
    ],
    architectureNodes: [
      {
        step: "01",
        title: "Đọc & Kiểm tra nguồn dữ liệu",
        input: "Dòng dữ liệu từ Bảng tính / Webhook",
        rule: "Kiểm tra định dạng SĐT, Email và trường bắt buộc",
        output: "Phân loại bản ghi Hợp lệ / Cần kiểm tra",
      },
      {
        step: "02",
        title: "Chuẩn hoá & Lọc trùng lặp",
        input: "Bản ghi đạt điều kiện đầu vào",
        rule: "Đối chiếu mã định danh & ánh xạ (mapping) cấu trúc trường",
        output: "Payload JSON chuẩn hoá sẵn sàng gửi đi",
      },
      {
        step: "03",
        title: "Đồng bộ API & Ghi nhật ký",
        input: "Payload dữ liệu sạch",
        rule: "Gửi qua API đích kèm cơ chế tự thử lại khi nghẽn mạng",
        output: "Cập nhật hệ thống đích & lưu trạng thái đối soát",
      },
    ],
    sampleRecords: [
      {
        id: "SYNC-101",
        source: "Bảng tính mẫu",
        action: "Chuẩn hoá SĐT & đồng bộ CRM",
        status: "Hoàn tất",
      },
      {
        id: "SYNC-102",
        source: "Webhook sự kiện",
        action: "Đối chiếu mã bản ghi & cập nhật",
        status: "Hoàn tất",
      },
      {
        id: "SYNC-103",
        source: "Biểu mẫu nhập",
        action: "Đánh dấu thiếu trường để kiểm tra lại",
        status: "Cần kiểm tra",
      },
    ],
    techStack: ["Node.js", "Python", "REST API", "Webhook", "Data Validation"],
    faqs: [
      {
        question: "Công cụ đồng bộ chạy theo lịch hay chạy ngay khi có dữ liệu mới?",
        answer:
          "Có thể cấu hình cả hai: chạy tức thì qua Webhook khi phát sinh bản ghi mới, hoặc chạy quét định kỳ (ví dụ mỗi 5 phút / mỗi giờ) tuỳ theo nền tảng nguồn.",
      },
    ],
  },
  {
    slug: "he-thong-bot-thong-bao-va-tra-cuu-nhanh",
    code: "MOD-03",
    tag: "BOT / CHATOPS PIPELINE",
    tagStyle: "brand",
    title: "Hệ thống Bot Thông báo Trạng thái & Tra cứu Nhanh",
    metaTitle:
      "Mô hình Hệ thống Bot Thông báo & Tra cứu Nhanh — Sèo Trum",
    metaDescription:
      "Mô hình giải pháp minh hoạ của Sèo Trum: kết nối sự kiện vận hành với Bot thông báo tự động, nhắc việc đúng bộ phận và hỗ trợ tra cứu trạng thái nhanh trong khung chat.",
    summary:
      "Đưa thông tin cần thiết đến đúng người, đúng lúc ngay trên ứng dụng chat công việc mà không cần mở nhiều màn hình tra cứu.",
    formOption: "API, Bot & Tích hợp",
    relatedServiceSlug: "tich-hop-api-bot-he-thong",
    problemContext:
      "Trong quá trình vận hành, nhân sự thường xuyên phải nhắn hỏi nhau tiến độ hoặc quên cập nhật khi đầu việc chuyển sang bước mới, khiến thông tin bị đứt quãng.",
    manualPainPoints: [
      "Tin nhắn báo việc mới bị trôi giữa các cuộc trò chuyện thông thường",
      "Nhân sự phải mở máy tính mới tra cứu được tình trạng của một mã yêu cầu",
      "Quản lý phải tự tổng hợp danh sách việc tồn đọng vào cuối ngày",
    ],
    automatedAdvantages: [
      "Bot tự động gửi thẻ thông tin gọn rõ ngay khi có yêu cầu mới hoặc đổi trạng thái",
      "Hỗ trợ gõ lệnh kèm mã bản ghi để xem ngay tiến độ trên điện thoại",
      "Tự động gửi bản tóm tắt công việc theo khung giờ cố định mỗi ngày",
    ],
    architectureNodes: [
      {
        step: "01",
        title: "Ghi nhận sự kiện vận hành",
        input: "Thay đổi trạng thái từ Web App / Bảng tính",
        rule: "Kiểm tra loại sự kiện & bộ phận liên quan",
        output: "Sự kiện đủ điều kiện gửi thông báo",
      },
      {
        step: "02",
        title: "Định dạng thẻ tin nhắn & Định tuyến",
        input: "Dữ liệu bản ghi mẫu",
        rule: "Tạo nội dung tóm tắt gọn rõ & chọn đúng kênh nhận",
        output: "Tin nhắn có cấu trúc kèm thông tin đối chiếu",
      },
      {
        step: "03",
        title: "Gửi thông báo & Phản hồi lệnh tra cứu",
        input: "Kết nối Bot API",
        rule: "Kiểm tra quyền truy cập của tài khoản yêu cầu",
        output: "Hiển thị kết quả tức thì trong khung chat",
      },
    ],
    sampleRecords: [
      {
        id: "BOT-201",
        source: "Sự kiện REQ-001",
        action: "Gửi thông báo tiếp nhận vào nhóm điều phối",
        status: "Đã gửi",
      },
      {
        id: "BOT-202",
        source: "Lệnh tra cứu mẫu",
        action: "Phản hồi trạng thái bản ghi REQ-001",
        status: "Hoàn tất",
      },
      {
        id: "BOT-203",
        source: "Lịch định kỳ",
        action: "Tổng hợp danh sách đầu việc cuối ngày",
        status: "Đã gửi",
      },
    ],
    techStack: ["Webhook", "Telegram / Slack / Zalo Bot", "Node.js", "Cron Job"],
    faqs: [
      {
        question: "Có thể tuỳ chỉnh mẫu nội dung tin nhắn mà Bot gửi ra không?",
        answer:
          "Có. Mẫu tin nhắn được thiết kế riêng để chỉ hiển thị đúng các trường quan trọng nhất giúp nhân sự đọc lướt trong vài giây là nắm được việc.",
      },
    ],
  },
  {
    slug: "kien-truc-website-dich-vu-toi-uu-seo",
    code: "MOD-04",
    tag: "WEB ARCHITECTURE / SEO",
    tagStyle: "dark",
    title: "Kiến trúc Website Dịch vụ & Hệ thống Kiểm tra Cấu trúc SEO",
    metaTitle:
      "Mô hình Kiến trúc Website Dịch vụ Tối ưu SEO — Sèo Trum",
    metaDescription:
      "Mô hình giải pháp minh hoạ của Sèo Trum: tổ chức cấu trúc website phân trang theo từng dịch vụ (Silo Architecture), tích hợp Schema JSON-LD và kiểm soát chất lượng SEO.",
    summary:
      "Tổ chức mỗi giải pháp và nhóm chủ đề thành một trang đích chuyên sâu có cấu trúc dữ liệu mạch lạc, tối ưu cho cả người dùng lẫn Google.",
    formOption: "SEO",
    relatedServiceSlug: "kien-truc-web-va-tu-dong-hoa-seo",
    problemContext:
      "Nhiều website doanh nghiệp chỉ có một trang giới thiệu chung chung khiến các từ khoá dịch vụ cụ thể không có trang đích đủ sâu để cạnh tranh trên Google.",
    manualPainPoints: [
      "Tất cả dịch vụ dồn chung vào một trang nên không tối ưu được từ khoá ngách",
      "Thiếu liên kết nội bộ mạch lạc giữa trang giải pháp, dự án mẫu và bài viết kiến thức",
      "Dữ liệu có cấu trúc (Schema) và Sitemap không được cập nhật đồng bộ khi thêm trang",
    ],
    automatedAdvantages: [
      "Mỗi giải pháp và mô hình có một URL độc lập, chuẩn hoá Title, Meta và Heading",
      "Tự động kết nối chéo giữa Trang Giải pháp ↔ Trang Mô hình Dự án ↔ Bài viết Góc chia sẻ",
      "Tự động sinh Schema JSON-LD và cập nhật Sitemap XML mỗi khi mở rộng nội dung",
    ],
    architectureNodes: [
      {
        step: "01",
        title: "Phân tách trang đích theo chủ đề (Silo)",
        input: "Danh mục giải pháp & nhu cầu tìm kiếm",
        rule: "Thiết kế URL, H1-H3 và nội dung chuyên sâu cho từng chức năng",
        output: "Hệ thống trang đích độc lập, rõ trọng tâm",
      },
      {
        step: "02",
        title: "Tích hợp Schema & Liên kết nội bộ",
        input: "Dữ liệu từ danh mục trang",
        rule: "Sinh JSON-LD (Service, FAQPage, Breadcrumb) & nối chéo trang liên quan",
        output: "Cấu trúc ngữ nghĩa rõ ràng cho công cụ tìm kiếm",
      },
      {
        step: "03",
        title: "Tối ưu hiệu năng & Chuyển đổi",
        input: "Giao diện nền sáng kỹ thuật nhẹ",
        rule: "Tối ưu tốc độ tải trang & đặt điểm chạm tư vấn đúng ngữ cảnh",
        output: "Trải nghiệm đọc mượt & dẫn luồng về form tư vấn",
      },
    ],
    sampleRecords: [
      {
        id: "SEO-301",
        source: "Cấu trúc URL",
        action: "Phân trang riêng cho từng giải pháp & dự án",
        status: "Hoàn tất",
      },
      {
        id: "SEO-302",
        source: "Schema JSON-LD",
        action: "Tích hợp Organization, Service & BreadcrumbList",
        status: "Hoàn tất",
      },
      {
        id: "SEO-303",
        source: "Sitemap XML",
        action: "Tự động cập nhật toàn bộ trang tĩnh & động",
        status: "Đang chạy",
      },
    ],
    techStack: [
      "Next.js App Router",
      "Schema.org JSON-LD",
      "Dynamic Sitemap",
      "Semantic HTML5",
    ],
    faqs: [
      {
        question: "Cấu trúc phân trang này giúp ích gì khi mở rộng thêm dịch vụ mới sau này?",
        answer:
          "Khi bạn ra mắt thêm một dịch vụ hoặc sản phẩm phần mềm mới, hệ thống chỉ cần tạo thêm một nhánh trang đích mới theo đúng khuôn mẫu chuẩn SEO mà không làm xáo trộn các trang cũ.",
      },
    ],
  },
];
