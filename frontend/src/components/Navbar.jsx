import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn = false, isAdmin = false }) => {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <div className="font-bold text-xl">Logo</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin/dashboard">
                  <Button variant="ghost">Admin Dashboard</Button>
                </Link>
              )}
              <Link to="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/user/register">
                <Button variant="ghost">Sign Up</Button>
              </Link>
              <Link to="/user/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin/dashboard">
                    <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                  </Link>
                )}
                <Link to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </>
            ) : (
              <>
                <Link to="/user/register">
                  <DropdownMenuItem>Sign Up</DropdownMenuItem>
                </Link>
                <Link to="/user/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;