import { FormEvent, useState } from "react";
import usePostReq from "../../hooks/usePostReq";
import ErrorCon from "../Auth/ErrorCon";
import SuccessCon from "../Auth/SuccessCon";
import BtnLoading from "../Loading/BtnLoading";
import { nanoid } from "nanoid";

export default function AddAddress({ setMakeReq }: { setMakeReq: Function }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [landMark, setLandMark] = useState("");
  const [pincode, setPincode] = useState("");
  const [success, setSuccess] = useState("");

  const { error, execute, loading, setError } = usePostReq(
    "/account/save-address"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        id: nanoid(),
        firstName,
        lastName,
        email,
        mobile,
        landMark,
        pincode,
        address,
      });
      if (res.success) {
        setSuccess("Address saved!");
        setMakeReq(Math.floor(Math.random() * 999999));
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setLandMark("");
        setPincode("");
        return setTimeout(() => setSuccess(""), 4000);
      } else {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
      return setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={error} />
      <SuccessCon success={success} />
      <div
        className="modal fade"
        id="add-address"
        tabIndex={-1}
        aria-labelledby="add-addressLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="add-addressLabel">
                Add address
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputFname4" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                    id="inputFname4"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLname4" className="form-label">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="inputLname4"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputMobile4" className="form-label">
                    Mobile
                  </label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    className="form-control"
                    id="inputMobile4"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Street address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="inputAddress"
                    placeholder="Street address"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLandmark4" className="form-label">
                    Landmark
                  </label>
                  <input
                    value={landMark}
                    onChange={(e) => setLandMark(e.target.value)}
                    type="text"
                    className="form-control"
                    id="inputLandmark4"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputpincode4" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="form-control"
                    id="inputpincode4"
                    required
                  />
                </div>
                <div className="modal-footer p-0 pt-2 ">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-primary px-5 py-3c"
                    disabled={loading}
                  >
                    {loading ? <BtnLoading color="light" /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
