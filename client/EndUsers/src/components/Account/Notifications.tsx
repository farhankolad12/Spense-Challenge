import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

export type Notifications = {
  id: string;
  iconTheme: { bgColor: string; icon: string };
  trackId: string;
  message: string;
  orderId: string;
  createdAt: number;
};

export default function Notifications() {
  const {
    error,
    loading,
    userData: notifications,
  } = useGetReq("/notifications/get-notifications", {});

  return (
    <>
      <ErrorCon error={error} />
      <div className="container py-5">
        <div className="d-md-flex justify-content-center align-items-start gap-5">
          <AccountNav />
          <div className="d-flex flex-column w-100 container mt-md-0 mt-5 border ">
            {!loading
              ? notifications && notifications.length
                ? notifications.map((noti: Notifications) => {
                    return (
                      <div key={noti.id} className="border-bottom">
                        <div className="d-flex gap-5 align-items-center p-3">
                          <div
                            style={{ borderRadius: "1rem" }}
                            className={`px-4 py-2 ${noti.iconTheme.bgColor}`}
                          >
                            <i
                              className={`bi bi-${noti.iconTheme.icon} `}
                              style={{ fontSize: "4rem" }}
                            />
                          </div>
                          <div className="d-flex flex-column gap-1">
                            <strong>
                              <Link
                                to={`/track-order/${noti.trackId}`}
                                className="text-dark"
                              >
                                {noti.message}
                              </Link>
                            </strong>
                            <strong className="text-primary">
                              {noti.orderId}
                            </strong>
                            <span>
                              {new Date(noti.createdAt).toDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : "No notifications"
              : "loading"}
          </div>
        </div>
      </div>
    </>
  );
}
