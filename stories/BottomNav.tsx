import { Home, User } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface BottomNavProps {
  currentPath?: string;
}

const NAVIGATION_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "You",
    href: "/user/self",
    icon: User,
  },
] as const;

export const BottomNav: FC<BottomNavProps> = ({ currentPath = "/" }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 md:hidden z-[100] shadow-lg">
      <div className="flex justify-around items-center h-16">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full
              ${
                currentPath === item.href
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400"
              }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
