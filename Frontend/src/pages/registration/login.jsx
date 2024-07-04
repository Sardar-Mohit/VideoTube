import React, { useEffect, useState } from "react";
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
  const user = useSelector((state) => state.auth.user);
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

  useEffect(() => {
    if (user !== null) {
      navigate("/landing-page");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-gray-700 rounded-xl shadow-lg">
          <div className="flex justify-center">
            <Logo biggerDeviceWidth={28} width={28} />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight text-white">
            {" "}
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={"Username :"}
              name={"username"}
              type={"text"}
              register={register}
              errors={errors}
              defaultVal="axaa"
              required
            />

            <Input
              label={"Password :"}
              name={"password"}
              type={"password"}
              register={register}
              errors={errors}
              defaultVal="Abc123"
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

          <p className="mt-4 text-center text-sm text-gray-500">
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
