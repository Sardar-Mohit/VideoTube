import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input, Logo, FileUpload } from "@/components/index";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { userRegistrationAction } from "@/store/actions/authActions.js";

const Register = () => {
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);

  function isImage(url) {
    console.log("123");
    console.log(url);
    const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
    return imageExtensions.test(url);
  }

  const zodSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(20, { message: "Username cannot exceed 20 characters" }),

    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters long" })
      .max(40, { message: "Full name cannot exceed 40 characters" }),

    email: z
      .string()
      .min(2)
      .max(50, { message: "Email cannot exceed 50 characters" })
      .email({ message: "Invalid email format" }),

    password: z
      .string()
      .min(8)
      .max(50)
      .refine((password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        );
      }, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."),

    avatar: z
      .object({
        name: z.string(), // Name of the file
        type: z.string(), // Mime type of the file
        size: z
          .number()
          .max(2000000, { message: "Image size must be less than 2 MB" }), // Size limit in bytes (optional)
        data: z.string(), // Base64 encoded representation of the file data (optional)
      })
      .refine((value) => isImage(value.name), {
        message: "Avatar must be an image file",
      }),

    coverImage: z
      .object({
        name: z.string(),
        type: z.string(),
        size: z.number(),
        data: z.string(),
      })
      .refine((value) => isImage(value.name), {
        message: "Cover image must be an image file",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = async (data) => {
    console.log(1);
    console.log(data);
    setButton(true);
    console.log(2);

    try {
      console.log(3);
      zodSchema.parse(data);

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar);
      formData.append("coverImage", data.coverImage);

      console.log(4);
      const response = await dispatch(userRegistrationAction(formData));

      if (response.payload && response.payload.status === 200) {
        navigate("/landing-page");
      }
    } catch (error) {
      console.log(5);
      console.error("Error registering user:", error);
    } finally {
      setButton(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-gray-50 rounded-xl shadow-lg">
          <div className="flex justify-center">
            <Logo biggerDeviceWidth={28} width={28} />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Register to create an account
          </h2>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <Input
              label={"Username :"}
              name={"username"}
              type={"text"}
              register={register}
              errors={errors}
              required
            />

            <Input
              label={"Fullname :"}
              name={"fullName"}
              type={"fullName"}
              register={register}
              errors={errors}
              required
            />

            <Input
              label={"Email :"}
              name={"email"}
              type={"email"}
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

            {/* <FileUpload
              label={"Avatar :"}
              name={"avatar"}
              type={"file"}
              register={register}
              errors={errors}
              required
            /> */}

            <div className="col-span-full">
              <label
                htmlFor={"avatar"}
                className="text-sm font-medium leading-6 text-white items-start flex"
              >
                {"Avatar :"}
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-400 px-6 py-10">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor={"avatar"}
                      className="px-[2px] relative cursor-pointer rounded-md bg-white font-semibold text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={"avatar"}
                        name={"avatar"}
                        type={"file"}
                        className="sr-only"
                        {...register("avatar")}
                      />
                    </label>
                    <p className="text-white pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {errors["avatar"] && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors["avatar"]?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* <FileUpload
              label={"Cover Image :"}
              name={"coverImage"}
              type={"file"}
              register={register}
              errors={errors}
              required
            /> */}

            <div className="col-span-full">
              <label
                htmlFor={"coverImage"}
                className="text-sm font-medium leading-6 text-white items-start flex"
              >
                Cover Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-400 px-6 py-10">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor={"coverImage"}
                      className="px-[2px] relative cursor-pointer rounded-md bg-white font-semibold text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={"coverImage"}
                        name={"coverImage"}
                        type={"file"}
                        className="sr-only"
                        {...register("coverImage")}
                      />
                    </label>
                    <p className="text-white pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {errors["coverImage"] && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors["coverImage"]?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {"2" + errors.file && errors.file?.message}
              </p>
            )}

            <div>
              {button === false ? (
                <button
                  type="submit" // Ensure type is set to "submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              ) : (
                <Button size="xlg">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already a member? &nbsp;
              <span
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
