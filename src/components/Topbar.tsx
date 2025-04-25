import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUIStore } from "../store/uiStore";
import { useUserStore } from "../store/userStore";

const TopBar = () => {
  const { darkMode, toggleDarkMode } = useUIStore();
  const { user } = useUserStore();

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background sticky top-0 z-10">
      <div className="md:hidden">
        {/* Mobile logo */}
        <h1 className="font-bold">FinFlow</h1>
      </div>

      <div className="flex-1 md:flex-initial" />

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user ? user.email?.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default TopBar;
