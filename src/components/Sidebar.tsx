import { LayoutDashboard, UserPlus, NotebookTabs, LogIn, Menu, IdCard } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, color: "#ff3aac", href: "/overview" },
  { name: "Add Member", icon: UserPlus, color: "#f1bf00", href: "/users" },
  { name: "Adrress List", icon: NotebookTabs, color: "#00ffff", href: "/products" },
  { name: "Membership Card", icon: IdCard, color: "#6EE7B7", href: "/settings" },
  { name: "Logout", icon: LogIn, color: "#ff7300", href: "/logout" },
];

function Sidebar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <motion.div
      className={`relative z-10 duration-300 transition-all ease-in-out flex-shrink-0 ${
        isSideBarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSideBarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-sky-700 backdrop-blur-md p-4 flex flex-col">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="p-2 rounded-full hover:bg-sky-500 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSideBarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}

export default Sidebar;
