import { siteConfig } from "config/site";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ui/ModeToggle";
import SignInOrUserAvatar from "./SignInOrUserAvatar";

export default function NavBar() {
  const navigation = [
    { title: "Guides", path: "/mdx-route" },
    { title: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="w-full bg-background">
      <div className="mx-auto max-w-screen-xl items-center px-4 flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <Image
              className="rounded-lg bg-gray-200 size-10 p-1"
              src="/bot.png"
              width={40}
              height={40}
              alt={siteConfig.name + " logo"}
            />
          </Link>
        </div>
        <div
          className={`flex-1 justify-center items-center`}
        >
          <ul className="items-center justify-center flex gap-2">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Link href={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ModeToggle />
          <SignInOrUserAvatar />
        </div>
      </div>
    </nav>
  );
}
