import { FormEvent, useState } from "react";
import AccountNav from "../components/Account/AccountNav";
import { useAuth } from "../context/AuthContext";
import usePostReq from "../hooks/usePostReq";
import ErrorCon from "../components/Auth/ErrorCon";
import BtnLoading from "../components/Loading/BtnLoading";
import SuccessCon from "../components/Auth/SuccessCon";

export default function Account() {
  const { currentUser } = useAuth();
  const {
    error: saveErr,
    execute: saveExecute,
    loading: saveLoading,
    setError: saveSetErr,
  } = usePostReq("/account/save-profile");
  const {
    error: changePassErr,
    loading: changePassLoading,
    execute: changePass,
    setError: changePassSetErr,
  } = usePostReq("/account/change-password");

  const [success, setSuccess] = useState("");
  const [fullName, setFullName] = useState(currentUser?.fullName);
  const [profileImg, setProfileImg] = useState(currentUser?.profileImg);
  const [email, setEmail] = useState(currentUser?.email);
  const [mobile, setMobile] = useState(currentUser?.mobile);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newConfirmPass, setNewConfirmPass] = useState("");

  async function handleProfile(e: FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("fullName", fullName || "");
      formData.append("email", email || "");
      formData.append("mobile", mobile || "");
      formData.append("profileImg", profileImg || "");

      const res = await saveExecute(formData);
      if (res.success) {
        setSuccess("Profile saved!");
        return setTimeout(() => setSuccess(""), 4000);
      } else {
        saveSetErr(res.message);
        return setTimeout(() => saveSetErr(""), 4000);
      }
    } catch (err) {
      console.log(err);
      saveSetErr("Something went wrong");
      setTimeout(() => saveSetErr(""), 4000);
    }
  }

  async function handleChangePass(e: FormEvent) {
    e.preventDefault();

    if (newConfirmPass !== newPass) {
      changePassSetErr("Password don't match!");
      return setTimeout(() => changePassSetErr(""), 4000);
    }

    try {
      const res = await changePass({ oldPass, newPass });
      if (res.success) {
        setSuccess("Password changed!");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        changePassSetErr(res.message);
        setTimeout(() => changePassSetErr(""), 4000);
      }
      setOldPass("");
      setNewPass("");
      setNewConfirmPass("");
    } catch (err) {
      console.log(err);
      changePassSetErr("Something went wrong");
      setTimeout(() => changePassSetErr(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={saveErr} />
      <ErrorCon error={changePassErr} />
      <SuccessCon success={success} />
      <div className="container py-5">
        <div className="d-md-flex justify-content-between align-items-start gap-5">
          <AccountNav />
          <div className="d-flex flex-column gap-4 w-100 mt-md-0 mt-5">
            <div className="bg-white border">
              <div className="border-bottom">
                <h5 className="p-3 fw-bold">My Account</h5>
              </div>
              <div className="p-3">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleProfile}
                  className="d-flex flex-column gap-3"
                >
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="name">Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="Name"
                      className="form-control"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="profile">Profile</label>
                    <input
                      onChange={(e) =>
                        setProfileImg(e.target.files ? e.target.files[0] : "")
                      }
                      type="file"
                      id="profile"
                      className="form-control"
                    />
                    {profileImg ? (
                      <img
                        className="my-3"
                        src={
                          typeof profileImg === "string"
                            ? `${
                                import.meta.env.VITE_APP_API_URL
                              }/public/uploads/${profileImg}`
                            : URL.createObjectURL(profileImg)
                        }
                        width="150px"
                        alt="Profile"
                      />
                    ) : (
                      <strong className="text-center my-3">
                        No profile Image selected
                      </strong>
                    )}
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      required
                      type="text"
                      id="mobile"
                      placeholder="Mobile"
                      className="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="btn btn-dark"
                  >
                    {saveLoading ? <BtnLoading color="light" /> : "Save"}
                  </button>
                </form>
              </div>
            </div>
            <div className="bg-white border">
              <div className="border-bottom">
                <h5 className="p-3 fw-bold">Change Password</h5>
              </div>
              <div className="p-3">
                <form
                  onSubmit={handleChangePass}
                  className="d-flex flex-column gap-3"
                >
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="old-password">Old password</label>
                    <input
                      type="password"
                      id="old-password"
                      placeholder="Old password"
                      className="form-control"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="new-password">New password</label>
                    <input
                      required
                      type="password"
                      id="new-password"
                      className="form-control"
                      placeholder="New password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      required
                      type="password"
                      id="confirm-password"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={newConfirmPass}
                      onChange={(e) => setNewConfirmPass(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={changePassLoading}
                    type="submit"
                    className="btn btn-dark"
                  >
                    {changePassLoading ? <BtnLoading color="light" /> : "Save"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
