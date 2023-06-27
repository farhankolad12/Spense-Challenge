import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import SliderRow, { Sliders } from "../components/Sliders/SliderRow";

export default function Sliders() {
  const [makeReq, setMakeReq] = useState(0);

  const navigate = useNavigate();

  const {
    error,
    loading,
    userData: sliders,
  } = useGetReq("/home-settings/get-sliders", { makeReq });

  return (
    <>
      <ErrorCon error={error} />
      <div className="container">
        <div className="bg-white p-5">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-uppercase">sliders</h3>
            <button
              onClick={() => navigate("/slider/add")}
              className="btn btn-secondary"
            >
              Add slider
            </button>
          </div>
          <div className="table-responsive mt-4">
            {!loading
              ? sliders && (
                  <table className="table table-striped border">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Link</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.map((slider: Sliders) => {
                        return (
                          <SliderRow
                            setMakeReq={setMakeReq}
                            key={slider.id}
                            slider={slider}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                )
              : "loading..."}
          </div>
        </div>
      </div>
    </>
  );
}
