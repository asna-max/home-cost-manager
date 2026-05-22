import { Link } from "react-router-dom";

export default function MobileNav({ navItems, path }) {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        dark:bg-gray-800
        border-t
        border-gray-200
        dark:border-gray-700
        flex
        justify-around
        items-center
        py-3
        md:hidden
        z-50
      "
    >
      {navItems.map((item) => {
        const isActive = path === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`
              text-sm
              font-medium
              transition
              ${
                isActive
                  ? "text-blue-500"
                  : `
                    text-gray-500
                    dark:text-gray-400
                  `
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
