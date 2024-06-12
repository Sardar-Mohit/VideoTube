import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "@/store/actions/authActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.auth.user);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State to manage dialog visibility

  async function logout() {
    try {
      await dispatch(logoutUserAction());
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  const handleLogoutTriggerClick = (event) => {
    event.preventDefault(); // Prevent dropdown closure on trigger click
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutConfirmation = async () => {
    await logout();
    setIsLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0"
            onClick={() => navigate("/profile")}
          >
            <div className="flex w-full gap-4 text-left sm:items-center">
              <img
                src={userObj ? userObj.avatar : ""}
                className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12 object-cover bg-center"
                alt={userObj ? userObj.username : "User"}
              />
              <div className="w-full pt-2 sm:hidden">
                <h6 className="font-semibold">
                  {userObj ? userObj.username : "User"}
                </h6>
                <p className="text-sm text-gray-300">
                  {userObj ? userObj.email : "User"}
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white w-40 sm:w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-bold">
              My Account
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-400" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer font-[500]"
              onClick={() => navigate("/profile")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer font-[500]"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-400 h-[0.5px]" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer font-[500]"
              onClick={() => navigate("/edit-personal-info")}
            >
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer font-[500]"
              onClick={() => navigate("/edit-channel-info")}
            >
              Edit Channel
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-400" />

          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer font-[500]">
              <AlertDialog
                open={isLogoutDialogOpen}
                onClose={handleLogoutCancel}
              >
                {" "}
                <AlertDialogTrigger
                  className=" hover:text-red-500 focus:text-red-600 font-[500]"
                  onClick={handleLogoutTriggerClick}
                >
                  Log out
                </AlertDialogTrigger>
                <AlertDialogContent className="text-white bg-black">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will logout your
                      account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleLogoutCancel}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="hover:text-red-400 focus:text-red-500"
                      onClick={handleLogoutConfirmation}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Avatar;
