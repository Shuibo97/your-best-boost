import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Headphones,
  LayoutDashboard,
  Lightbulb,
  Users,
  Tag,
  History,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "数据看板" },
  { path: "/intent-rules", icon: Lightbulb, label: "意图规则管理" },
  { path: "/group-management", icon: Users, label: "人员与分组管理" },
  { path: "/customer-rules", icon: Tag, label: "客户规则管理" },
  { path: "/request-history", icon: History, label: "请求历史" },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "周水波";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    toast.success("已退出登录");
    navigate("/login");
  };

  const currentPage = menuItems.find((item) => item.path === location.pathname);
  const pageTitle = currentPage?.label || "数据看板";

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-sidebar-border">
          <Headphones className="h-8 w-8 mr-3" />
          <h1 className="text-xl font-bold">智能客服后台</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center text-lg font-semibold">
              {username.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">管理员</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-6 bg-card border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">{pageTitle}</h2>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
