import { Aside, ProfileEditHeaderWithNavigation } from "@/components/index";
import { Button } from "@/components/ui/button";
import { changeUserDetailsAction } from "@/store/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const EditPersonalInfoPage = () => {
  const [button, setButton] = useState(false);
  let userData = useSelector((state) => state.auth.user);
  let user = userData && userData.statusCode && userData.statusCode.user;
  let dispatch = useDispatch();

  const zodSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(20, { message: "Username cannot exceed 20 characters" }),

    fullName: z
      .string()
      .min(2, { message: "Fullname must be at least 2 characters long" })
      .max(40, { message: "Fullname cannot exceed 40 characters" }),

    email: z
      .string()
      .min(2)
      .max(50, { message: "Email cannot exceed 50 characters" })
      .email({ message: "Invalid email format" }),
  });

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = async (data) => {
    console.log("data");
    console.log(data);
    setButton(true);

    try {
      const response = await dispatch(changeUserDetailsAction(data));
      console.log(response);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
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
                <h5 className="font-semibold">Personal Info</h5>
                <p className="text-gray-300">Update your personal details.</p>
              </div>
              <form
                className="w-full sm:w-1/2 lg:w-2/3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="rounded-lg border">
                  <div className="flex flex-wrap gap-y-4 p-4">
                    <div className="w-full lg:w-1/2 lg:pr-2">
                      <label htmlFor="username" className="mb-1 inline-block">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                        id="username"
                        placeholder="Enter your username"
                        defaultValue={user && user?.username}
                        {...register("username")}
                      />
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-2">
                      <label htmlFor="fullName" className="mb-1 inline-block">
                        Fullname
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                        id="fullName"
                        placeholder="Enter your Fullname"
                        defaultValue={user && user?.fullName}
                        {...register("fullName")}
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="email" className="mb-1 inline-block">
                        Email address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="email"
                          className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                          id="email"
                          placeholder="Enter email address"
                          defaultValue={user && user?.email}
                          {...register("email")}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border border-gray-300" />
                  <div className="flex items-center justify-end gap-4 p-4">
                    <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                      Cancel
                    </button>

                    <div>
                      {button === false ? (
                        <button className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
                          Update changes
                        </button>
                      ) : (
                        <Button disabled size="xlg">
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ProfileEditHeaderWithNavigation>
        </section>
      </div>
    </>
  );
};

export default EditPersonalInfoPage;
