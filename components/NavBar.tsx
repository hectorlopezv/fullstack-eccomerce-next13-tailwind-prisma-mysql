import { UserButton } from "@clerk/nextjs";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "./StoreSwitcher";

import prismaDb from "@/lib/prismaDb";
import isAuth from "@/lib/is-auth";
import { ModeToggle } from "./ui/ModeToogle";

type Props = {};

export default async function NavBar({}: Props) {
  const userId = isAuth("/sign-in");

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
