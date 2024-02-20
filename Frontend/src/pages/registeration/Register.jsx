import React, { useState } from "react";
import { Input, Logo } from "@/components/index";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegisteration } from "@/store/RegisterationSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSchema = {
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    coverImage: "",
  };

  const [button, setButton] = useState("disabled");
  const [form, setForm] = useState(formSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("avatar", form.avatar);
    formData.append("coverImage", form.coverImage);

    setButton("enabled"); // Set button state before form submission

    try {
      const response = await dispatch(userRegisteration(formData));
      console.log("Response:", response);
      setForm(formSchema);

      navigate("/landing-page");
      setButton("disabled");
    } catch (error) {
      setForm(formSchema);
      console.error("Error registering user:", error);
      setButton("disabled");
    }
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    console.log([e.target.name], selectedFile);
    setForm({
      ...form,
      [e.target.name]: selectedFile,
    });
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
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <Input
              placeholderName="Username :"
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              value={form.username}
              handleChange={handleChange}
            />

            <Input
              placeholderName="Fullname :"
              name="fullName"
              id="fullName"
              type="text"
              autoComplete="fullName"
              value={form.fullName}
              handleChange={handleChange}
            />
            <Input
              placeholderName="Email :"
              name="email"
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              handleChange={handleChange}
            />
            <Input
              placeholderName="Password :"
              name="password"
              id="password"
              type="password"
              autoComplete="password"
              value={form.password}
              handleChange={handleChange}
            />

            <div className="col-span-full">
              <label
                htmlFor="avatar"
                className="text-sm font-medium leading-6 text-gray-900 items-start flex"
              >
                Avatar :
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                      htmlFor="avatar"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="coverImage"
                className="text-sm font-medium leading-6 text-gray-900 items-start flex"
              >
                Cover image :
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                      htmlFor="coverImage"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              {button == "disabled" ? (
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
