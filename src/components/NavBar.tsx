import Link from "next/link";
import { ModeToggle } from "./ui/ModeToggle";
import SignInOrUserAvatar from "./SignInOrUserAvatar";

export default function NavBar() {
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Guides", path: "/mdx-route" },
    { title: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="w-full px-3 sm:px-6 pt-3 sm:pt-6" >
      <div className="mx-auto flex max-w-6xl items-center justify-between py-2 px-4 border rounded-xl sm:rounded-xl">
      <div className="flex items-center space-x-6">
        {navigation.map((navItem) => (
          <Link key={navItem.path + navItem.title} href={navItem.path}>
            {navItem.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <SignInOrUserAvatar />
      </div></div>
    </nav>
  );
}
