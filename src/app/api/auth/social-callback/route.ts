import { NextRequest, NextResponse } from "next/server";

import { BackendResponse, socialLogin } from "@/lib/backend-auth";
import { auth } from "@/lib/auth-config";

/**
 * 소셜 로그인 후 백엔드 JWT 받기
 * GET /api/auth/social-callback
 */
export async function GET(request: NextRequest) {
  try {
    // NextAuth 세션 확인
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }

    // 이메일이 없으면 에러
    if (!session.user.email) {
      return NextResponse.json(
        { error: "이메일 정보가 없습니다" },
        { status: 400 }
      );
    }

    // 백엔드로 소셜 로그인 정보 전송하여 JWT 받기
    const result = await socialLogin({
      email: session.user.email,
      name: session.user.name || undefined,
      provider:
        (session.user.provider as "naver" | "kakao" | "google") || "google",
      providerAccountId: session.user.providerAccountId || "",
      accessToken: session.user.accessToken || "",
      refreshToken: undefined,
      image: session.user.image || undefined,
    });

    // 백엔드 JWT 반환
    return NextResponse.json({
      code: result?.code,
      message: result?.message,
      data: {
        user: result?.user,
        token: result?.token,
        refreshToken: result?.refreshToken,
      },
    });
  } catch (error) {
    console.error("소셜 로그인 콜백 실패:", error);
    const errorMessage =
      error instanceof Error ? error.message : "로그인에 실패했습니다";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
