import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      provider?: string;
      providerAccountId?: string;
    };
  }

  interface User {
    id?: string;
    accessToken?: string;
    provider?: string;
    providerAccountId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    providerAccountId?: string;
    id?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}
