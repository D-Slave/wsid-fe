import { NextRequest, NextResponse } from "next/server";
import { emailLogin } from "@/lib/backend-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요" },
        { status: 400 }
      );
    }
    const result = await emailLogin({ email, password });

    return NextResponse.json({
      code: result.code,
      message: result.message,
      data: {
        user: result.data.user,
        token: result.data.token,
        refreshToken: result.data.refreshToken,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "로그인에 실패했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
