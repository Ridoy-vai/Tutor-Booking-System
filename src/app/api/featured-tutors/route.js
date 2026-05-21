import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.SERVER_URI}/Featurstutors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "application/json";
    const body = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    return NextResponse.json(body, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch featured tutors.", error: error.message },
      { status: 502 }
    );
  }
}
