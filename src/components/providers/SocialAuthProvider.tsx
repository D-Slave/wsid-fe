"use client";
import { useSocialAuth } from "@/hooks/auth/useSocialAuth";
import { ReactNode } from "react";

export function SocialAuthProvider({ children }: { children: ReactNode }) {
  useSocialAuth();
  return <>{children}</>;
}
