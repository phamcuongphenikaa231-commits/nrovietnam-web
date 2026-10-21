
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Hệ thống đăng ký đang được kết nối với máy chủ. Vui lòng quay lại sau."
    },
    { status: 503 }
  );
}
