import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../index";
const NavbarTwo = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
        <nav className="mx-auto flex max-w-7xl items-center py-2">
          <Logo />
          <button className="group peer ml-auto flex w-6 shrink-0 flex-wrap gap-y-1.5 md:hidden">
            <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]" />
            <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]" />
            <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]" />
          </button>
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col justify-between border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 md:static md:ml-4 md:max-w-full md:shrink md:translate-x-0 md:flex-row md:border-none">
            
            <ul className="my-4 flex w-full flex-wrap gap-2 px-4 md:my-0 md:w-auto md:px-0">
              <li className="w-full md:w-auto">
                <button onClick={() => navigate("/landing-page")} className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none">
                  <span>Home</span>
                </button>
              </li>
              <li className="w-full md:w-auto">
                <button onClick={() => navigate("/privacy-policy")} className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none">
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li className="w-full md:w-auto">
                <button onClick={() => navigate("/terms-and-condition")} className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none">
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
            <div className="mb-8 mt-auto flex flex-wrap gap-4 px-4 md:mb-0 md:mt-0 md:items-center md:px-0">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] md:w-auto md:bg-transparent"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] md:w-auto"
              >
                Sign up
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavbarTwo;
