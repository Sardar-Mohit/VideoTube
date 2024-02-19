import { Aside, ProfileBanner, ProfileBannerPicture } from "@/components";
import { useNavigate } from "react-router-dom";

const EditPersonalInfoPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileBannerPicture />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
              <li
                className="w-full"
                onClick={() => navigate("/edit-personal-info")}
              >
                <button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">
                  Personal Information
                </button>
              </li>
              <li
                className="w-full"
                onClick={() => navigate("/edit-channel-info")}
              >
                <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                  Channel Information
                </button>
              </li>
              <li
                className="w-full"
                onClick={() => navigate("/change-password")}
              >
                <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                  Change Password
                </button>
              </li>
            </ul>
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Personal Info</h5>
                <p className="text-gray-300">
                  Update your photo and personal details.
                </p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-2/3">
                <div className="rounded-lg border">
                  <div className="flex flex-wrap gap-y-4 p-4">
                    <div className="w-full lg:w-1/2 lg:pr-2">
                      <label htmlFor="firstname" className="mb-1 inline-block">
                        First name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                        id="firstname"
                        placeholder="Enter first name"
                        defaultValue="React"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-2">
                      <label htmlFor="lastname" className="mb-1 inline-block">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                        id="lastname"
                        placeholder="Enter last name"
                        defaultValue="Patterns"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="lastname" className="mb-1 inline-block">
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
                          id="lastname"
                          placeholder="Enter email address"
                          defaultValue="patternsreact@gmail.com"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border border-gray-300" />
                  <div className="flex items-center justify-end gap-4 p-4">
                    <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                      Cancel
                    </button>
                    <button className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditPersonalInfoPage;
