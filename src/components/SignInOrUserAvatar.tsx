import { getServerAuthSession } from "@/server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import SignOutButton from "./SignOutButton";

export default async function SignInOrUserAvatar() {
  const session = await getServerAuthSession();

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="rounded-lg" >
          <AvatarImage
            className="rounded-lg border-2 border-muted-foreground"
            alt={"user " + session.user.name}
            width={60}
            height={60}
            src={session.user.image  ?? "/favicon.ico"}
          />
          <AvatarFallback>
            {session.user.name ? (
              session.user.name?.slice(0, 2)
            ) : (
              <>
                <User2 />
              </>
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {session?.user?.name && (
            <p className="truncate text-sm font-medium text-primary">
              {session?.user?.name}
            </p>
          )}
          <p className="truncate text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          {" "}
          <LogOut className="size-4" />{" "}
          <SignOutButton className="flex-1 text-start" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      href="/login"
      className={buttonVariants({ variant: "default" })}
    >
      SignIn
    </Link>
  );
}
