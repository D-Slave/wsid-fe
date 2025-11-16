"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiGet } from "@/lib/api-client";
import { saveTokenToStorage } from "@/lib/token-storage";

export function useSocialAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const processedEmailRef = useRef<string | null>(null);

  useEffect(() => {
    const userEmail = session?.user?.email;
    if (
      !userEmail ||
      status !== "authenticated" ||
      processedEmailRef.current === userEmail
    ) {
      return;
    }
    processedEmailRef.current = userEmail;

    async function handleSocialAuth() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await apiGet<{
            code: string;
            message?: string;
            data: {
              user: {
                id: string;
                email: string;
                name?: string;
                [key: string]: unknown;
              };
              token: string;
              refreshToken: string;
            };
          }>("api/auth/social-callback", { skipAuth: true });
          if (response.data?.token) {
            saveTokenToStorage(response.data.token, response.data.refreshToken);
            router.push("/main");
          }
        } catch (error) {
          console.error("소셜 로그인 실패 : ", error);
        }
      }
    }
    handleSocialAuth();
  }, [status, session?.user?.email, router]);
  useEffect(() => {
    if (status === "authenticated") {
      processedEmailRef.current = null;
    }
  }, [status]);
}
