import { NextResponse } from "next/server";

const VALID_SOLUTIONS = [
  "Tự động hoá",
  "Web & App",
  "API, Bot & Tích hợp",
  "SEO",
  "Chưa rõ, cần tư vấn",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body?.fullName || "").trim();
    const contactInfo = String(body?.contactInfo || "").trim();
    const solutionNeed = String(body?.solutionNeed || "").trim();
    const problemDesc = String(body?.problemDesc || "").trim();

    const errors: Record<string, string> = {};

    if (fullName.length < 2 || fullName.length > 100) {
      errors.fullName = "Vui lòng nhập họ và tên từ 2 đến 100 ký tự.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = contactInfo.replace(/[\s().+-]/g, "");
    const isPhone = /^\d{8,15}$/.test(phoneDigits);
    if (!emailRegex.test(contactInfo) && !isPhone) {
      errors.contactInfo =
        "Vui lòng nhập email hợp lệ hoặc số điện thoại (8–15 chữ số).";
    }

    if (
      !VALID_SOLUTIONS.includes(
        solutionNeed as (typeof VALID_SOLUTIONS)[number],
      )
    ) {
      errors.solutionNeed = "Vui lòng chọn một nhóm giải pháp hợp lệ.";
    }

    if (problemDesc.length < 20 || problemDesc.length > 3000) {
      errors.problemDesc =
        "Vui lòng mô tả bài toán tối thiểu 20 ký tự (tối đa 3000 ký tự).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại các trường.",
          errors,
        },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.CONSULTATION_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "seo-trum-web",
          submittedAt: new Date().toISOString(),
          fullName,
          contactInfo,
          solutionNeed,
          problemDesc,
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Chưa thể chuyển tiếp yêu cầu tới hệ thống nhận tin. Vui lòng thử lại sau.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        mode: "live",
        message: "Đã gửi yêu cầu. Sèo Trum sẽ phản hồi sớm.",
      });
    }

    return NextResponse.json({
      ok: true,
      mode: "preview",
      message: "Yêu cầu hợp lệ. Bản xem trước chưa gửi dữ liệu.",
      summary: {
        fullName,
        contactInfo,
        solutionNeed,
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Dữ liệu gửi lên không đúng định dạng JSON.",
      },
      { status: 400 },
    );
  }
}
