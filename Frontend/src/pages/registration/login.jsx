import React, { useState } from "react";
import { Input, Logo } from "@/components/index";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserAction } from "@/store/actions/authActions";

const Login = () => {
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);

  const zodSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(20, { message: "Username cannot exceed 20 characters" }),

    password: z.string().min(2).max(50),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setButton(true);
    console.log(data);
    try {
      const response = await dispatch(loginUserAction(data));
      console.log(response);
      
      if (response.payload) {
        if (response.payload.message === 200) {
          navigate("/landing-page");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setButton(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="w-full items-center justify-center flex">
            <Logo biggerDeviceWidth={28} width={28} />
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={"Username :"}
              name={"username"}
              type={"text"}
              register={register}
              errors={errors}
              required
            />

            <Input
              label={"Password :"}
              name={"password"}
              type={"password"}
              register={register}
              errors={errors}
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error} {/* Displaying the error message */}
              </p>
            )}
            <div>
              {button == false ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              ) : (
                <Button disabled size="xlg">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? &nbsp;
            <span
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
