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
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);

  function isImage(url) {
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
    console.log(data);
    setButton(true);

    try {
      zodSchema.parse(data);
      
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);
      formData.append("coverImage", data.coverImage[0]);

      const response = await dispatch(userRegistrationAction(formData));

      if (response.payload && response.payload.status === 200) {
        navigate("/landing-page");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setButton(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-full items-center justify-center flex">
          <Logo biggerDeviceWidth={28} width={28} />
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to create an account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-2"
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

            <FileUpload
              label={"Avatar :"}
              name={"avatar"}
              type={"file"}
              register={register}
              errors={errors}
              required
            />

            <FileUpload
              label={"Cover Image :"}
              name={"coverImage"}
              type={"file"}
              register={register}
              errors={errors}
              required
            />

            {/* {error && (
              <p className="mt-2 text-sm text-red-500">
                {"2" + errors.file && errors.file.message}
              </p>
            )} */}

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
        </div>
      </div>
    </>
  );
};

export default Register;
