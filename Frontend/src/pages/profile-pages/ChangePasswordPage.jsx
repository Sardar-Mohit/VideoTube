import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePasswordAction } from "@/store/actions/authActions";
import {
  Aside,
  ProfileBanner,
  ProfileBannerPicture,
  ProfileEditNavbar,
} from "@/components";
import axios from "axios";
import { changePasswordApi } from "@/api/authApi";
axios.defaults.withCredentials = true;

const ChangePasswordPage = () => {
  let emptyForm = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [button, setButton] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setButton(true);
    try {
      const data = {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      };
      const request = await axios.post(
        "http://localhost:8000/api/v1/users/change-password",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(request.data);
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setForm(emptyForm)
      setButton(false);
    }
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileBannerPicture />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ProfileEditNavbar />
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Password</h5>
                <p className="text-gray-300">
                  Please enter your current password to change your password.
                </p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-2/3">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                      <div className="w-full">
                        <label
                          className="mb-1 inline-block"
                          htmlFor="old-password"
                        >
                          Current password
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                          id="oldPassword"
                          name="oldPassword"
                          placeholder="Current password"
                          value={form.oldPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          className="mb-1 inline-block"
                          htmlFor="new-password"
                        >
                          New password
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                          id="newPassword"
                          name="newPassword"
                          placeholder="New password"
                          value={form.newPassword}
                          onChange={handleChange}
                          required
                        />
                        <p className="mt-0.5 text-sm text-gray-300">
                          Your new password must be more than 8 characters.
                        </p>
                      </div>
                      <div className="w-full">
                        <label
                          className="mb-1 inline-block"
                          htmlFor="confirm-password"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                      <button
                        onClick={() => {
                          setForm(emptyForm);
                        }}
                        className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                      >
                        Cancel
                      </button>

                      {button ? ( // Check if button state is true
                        <button
                          className="inline-block bg-slate-500 px-3 py-1.5 text-white"
                          disabled // Disable button when loading
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
          </div>
        </section>
      </div>
    </>
  );
};

export default ChangePasswordPage;
