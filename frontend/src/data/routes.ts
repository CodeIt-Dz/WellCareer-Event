const DEFAULT_LOGIN_REDIRECT = "/";
export const publicRoutes:Array<string> = [];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/new-verification",
  "/auth/new-password",
  "/auth/reset",
];

export const protectedRoutes = [
  "/profile"
]

export { DEFAULT_LOGIN_REDIRECT };
