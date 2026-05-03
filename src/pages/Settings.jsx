import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteAccountModal from "../components/job/DeleteAccountModal";

const Settings = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleDeleteModal = () => {
    setShowDeleteAccountModal(true);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("User not found");
      return;
    }

    if (storedUser.password !== currentPassword) {
      alert("Current password is incorrect");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      ...storedUser,
      password: newPassword,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Password updated successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <section className="h-screen">
      <div className="max-w-2xl mb-12">
        <h2 className="text-teal-dark text-3xl font-semibold">
          Change password
        </h2>
        <p className="text-gray mb-6">Manage your account password</p>

        <form onSubmit={handlePasswordChange}>
          {/* Current Password */}
          <div>
            <input
              type="password"
              placeholder="Current Password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border border-gray-light text-gray rounded-md p-3 outline-none focus:ring-[1px] focus:ring-gray w-full"
            />
          </div>

          {/* New Password */}
          <div className="relative mt-6">
            <button
              type="button"
              className="text-gray absolute right-3 inset-y-0 my-auto"
              onClick={() => setPasswordHidden(!isPasswordHidden)}
            >
              {isPasswordHidden ? (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>

            <input
              type={isPasswordHidden ? "password" : "text"}
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-light text-gray rounded-md p-3 w-full"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative mt-6">
            <button
              type="button"
              className="text-gray absolute right-3 inset-y-0 my-auto"
              onClick={() => setConfirmPasswordHidden(!isConfirmPasswordHidden)}
            >
              {isConfirmPasswordHidden ? (
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>

            <input
              type={isConfirmPasswordHidden ? "password" : "text"}
              placeholder="Re enter New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-light text-gray rounded-md p-3 w-full"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 font-semibold gap-4 flex">
            <Link
              to="/dashboard/dashboard"
              className="bg-light-gray text-dark-gray rounded-md py-2 px-4"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="bg-black text-white rounded-md py-2 px-6"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* DELETE ACCOUNT */}
      <div>
        <h2 className="text-3xl font-semibold">Delete Account:</h2>
        <p className="text-gray mb-6">Permanently delete your account.</p>

        <button
          onClick={handleDeleteModal}
          className="border border-[#af1818] text-[#af1818] rounded-md py-2 px-2.5"
        >
          Delete my Account
        </button>
      </div>

      {showDeleteAccountModal && (
        <DeleteAccountModal setDeleteAccountModal={setShowDeleteAccountModal} />
      )}
    </section>
  );
};

export default Settings;
