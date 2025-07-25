import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Users, Gift, FileText, LogOut, Menu } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Residents", href: "/residents", icon: Users },
    { name: "Ayuda", href: "/ayuda", icon: Gift },
    { name: "Reports", href: "/reports", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        <Card className="h-full rounded-none border-r">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b">
              {sidebarOpen && (
                <h2 className="text-lg font-semibold">BRMS</h2>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-2 p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={`w-full justify-start ${!sidebarOpen && 'px-2'}`}
                    onClick={() => window.location.href = item.href}
                  >
                    <Icon className="h-4 w-4" />
                    {sidebarOpen && <span className="ml-2">{item.name}</span>}
                  </Button>
                );
              })}
            </div>

            {/* Logout */}
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${!sidebarOpen && 'px-2'}`}
                onClick={() => window.location.href = "/login"}
              >
                <LogOut className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">Logout</span>}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Main content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top bar */}
        <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-full items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold">Barangay Sta. Filomena</h1>
              <p className="text-sm text-muted-foreground">Record Management System</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Welcome, Admin
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;