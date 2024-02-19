import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { AlertBox } from "../index";

const Avatar = () => {
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu className="bg-white">
        <DropdownMenuTrigger asChild>
          <div
            className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0"
            onClick={() => navigate("/profile")}
          >
            <div className="flex w-full gap-4 text-left sm:items-center">
              <img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React-Patterns"
                className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
              />
              <div className="w-full pt-2 sm:hidden">
                <h6 className="font-semibold">React Patterns</h6>
                <p className="text-sm text-gray-300">@reactpatterns</p>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" w-40 sm:w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

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

          <DropdownMenuSeparator />

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

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <AlertBox triggerpoint="Log out" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Avatar;
