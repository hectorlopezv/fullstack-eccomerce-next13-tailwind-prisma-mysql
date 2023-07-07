import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const isAuth = (redirectUrl: string) => {
  const { userId } = auth();
  if (!userId) {
    redirect(redirectUrl);
  }
  return userId;
};
export default isAuth;
