
import { NextResponse } from "next/server";

export async function POST(request) {
  const url = process.env.NRO_API_URL;
  const key = process.env.NRO_API_KEY;

  if (!url || !key || !url.startsWith("https://")) {
    return NextResponse.json(
      { message: "API chua duoc cau hinh" },
      { status: 503 }
    );
  }

  try {
    const body = await request.text();

    if (Buffer.byteLength(body, "utf8") > 2048) {
      return NextResponse.json(
        { message: "Du lieu qua lon" },
        { status: 413 }
      );
    }

    const data = JSON.parse(body);

    const username = data.username;
    const password = data.password;

    if (
      typeof username !== "string" ||
      !/^[a-zA-Z0-9_]{4,20}$/.test(username) ||
      typeof password !== "string" ||
      Buffer.byteLength(password, "utf8") < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return NextResponse.json(
        { message: "Thong tin dang ky khong hop le" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-NRO-API-KEY": key
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000)
    });

    const result = await response.json();

    return NextResponse.json(
      { message: result.message },
      { status: response.status }
    );

  } catch (error) {
    console.error("NRO registration connection failed", error.name);
    return NextResponse.json(
      { message: "Khong ket noi duoc may chu dang ky" },
      { status: 502 }
    );
  }
}
