import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
interface props {
  allowedRoles: string[];
}
const RequireAuth: React.FC<props> = ({ allowedRoles }) => {
  const { toast } = useToast();

  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please Login to continue",
        variant: "destructive",
      });
      navigate("/Login");
    }
    if (!allowedRoles.includes(role)) {
      toast({
        title: "Unauthorized access",
        description: `${role} is not allowed to access this resources`,
        variant: "destructive",
      });
      navigate("/unauthorized"); // navigating user to the unauthorized access
    }
  }, [isAuthenticated, navigate, allowedRoles, role]);
  return <>{isAuthenticated && allowedRoles.includes(role) && <Outlet />}</>;
};
export default RequireAuth;
