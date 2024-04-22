import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    // 1st way to unprotect route is to add in .env variables clerk will automatically unprotect those routes.
    publicRoutes : ['/test', '/api/uploadthing'] // This is 2nd way -> here we can add public routes which can be accessed by everyone even logged out user also can see.
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};