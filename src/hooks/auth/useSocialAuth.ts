"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiGet } from "@/lib/api-client";
import { saveTokenToStorage } from "@/lib/token-storage";

export function useSocialAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
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
  }, [session, status, router]);
}
