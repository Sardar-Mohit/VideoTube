import {
  Aside,
  Input,
  ProfileEditHeaderWithNavigation,
} from "@/components";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "@/store/actions/authActions";

const ChangePasswordPage = () => {
  const [button, setButton] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const zodSchema = z.object({
    oldPassword: z.string().min(2).max(50),
    newPassword: z
      .string()
      .min(2)
      .max(50)
      .refine(
        (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{3,}$/.test(password),
        "Password must contain at least one uppercase letter, one lowercase letter and one digit."
      ),
    confirmPassword: z.string().min(2).max(50),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({ resolver: zodResolver(zodSchema) });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setButton(true);

    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await dispatch(changePasswordAction(data));
      console.log("hello " + response.data);

      if (response.payload) {
        if (response.payload.message === 200) {
          console.log("changed Successfully" + response.payload);
        }
      }
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      reset();
      setButton(false);
    }
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileEditHeaderWithNavigation>
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Password</h5>
                <p className="text-gray-300">
                  Please enter your current password to change your password.
                </p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-2/3">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                      <div className="w-full">
                        <Input
                          type="password"
                          name="oldPassword"
                          label="Current password"
                          placeholder="Current password"
                          register={register}
                          errors={errors}
                          required={true}
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label={"New password"}
                          name={"newPassword"}
                          type={"password"}
                          placeholder={"New password"}
                          register={register}
                          errors={errors}
                          required={true}
                        />
                      </div>

                      <div className="w-full">
                        <Input
                          type="password"
                          name="confirmPassword"
                          label="Confirm password"
                          placeholder="Confirm password"
                          register={register}
                          errors={errors}
                          required={true}
                        />

                        {error && (
                          <p className="mt-2 text-sm text-red-500">
                            {error} {/* Displaying the error message */}
                          </p>
                        )}
                      </div>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                      <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                        Cancel
                      </button>

                      {button ? (
                        <button
                          className="flex items-center bg-slate-500 px-3 py-1.5 text-white cursor-wait"
                          disabled
                        >
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
                        >
                          Update Password
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ProfileEditHeaderWithNavigation>
        </section>
      </div>
    </>
  );
};

export default ChangePasswordPage;
