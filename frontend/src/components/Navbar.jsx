import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "@/slice/user/userProfile";
import { adminAuthLogout } from "@/slice/admin/adminAuth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.userProfile.isLogged);
  const isAdmin = useSelector((state) => state.adminAuth.isAdmin);

  const handleAdminLogout = async ()=>{
      try {
        await dispatch(adminAuthLogout()).unwrap();
      } catch (error) {
        toast({
          title: "Error",
          description: error?.message || "Failed to logout",
          variant: "destructive",
        });
      }
  }

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserAuthRoute = location.pathname.startsWith('/user/login') || location.pathname.startsWith('/user/register');
  const isUserHomeRoute = location.pathname === '/';

  const renderAuthLinks = () => {
    // Admin login page - show only login button
    if (isAdminRoute && !isAdmin) {
      return (
        <Link to="/admin/login">
          <Button>Admin Login</Button>
        </Link>
      );
    }

    // Admin dashboard - show dashboard and logout
    if (isAdminRoute && isAdmin) {
      return (
        <>
          <Link >
            <Button variant="ghost">Admin Dashboard</Button>
          </Link>
          <Button onClick={handleAdminLogout}>Logout</Button>
        </>
      );
    }

    // User auth routes - show login and signup
    if (isUserAuthRoute) {
      return (
        <>
          <Link to="/user/register">
            <Button variant="ghost">Sign Up</Button>
          </Link>
          <Link to="/user/login">
            <Button>Login</Button>
          </Link>
        </>
      );
    }

    // User home route - show profile and logout if logged in, otherwise auth buttons
    if (isUserHomeRoute) {
      return isLoggedIn ? (
        <>
          <Link >
            <Button variant="ghost">Profile</Button>
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
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
      );
    }

    return null;
  };

  const renderMobileMenuItems = () => {
    // Admin login page - show only login button
    if (isAdminRoute && !isAdmin) {
      return (
        <Link to="/admin/login">
          <DropdownMenuItem>Admin Login</DropdownMenuItem>
        </Link>
      );
    }

    // Admin dashboard - show dashboard and logout
    if (isAdminRoute && isAdmin) {
      return (
        <>
          <Link>
            <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleAdminLogout}>Logout</DropdownMenuItem>
        </>
      );
    }

    // User auth routes - show login and signup
    if (isUserAuthRoute) {
      return (
        <>
          <Link to="/user/register">
            <DropdownMenuItem>Sign Up</DropdownMenuItem>
          </Link>
          <Link to="/user/login">
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
        </>
      );
    }

    // User home route - show profile and logout if logged in, otherwise auth buttons
    if (isUserHomeRoute) {
      return isLoggedIn ? (
        <>
          <Link >
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
      );
    }

    return null;
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <div className="font-bold text-xl">Logo</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {renderAuthLinks()}
        </div>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {renderMobileMenuItems()}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;