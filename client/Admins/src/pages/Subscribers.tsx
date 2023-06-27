import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";

type Subscriber = {
  id: string;
  email: string;
  createdAt: number;
};

export default function Subscribers() {
  const {
    error,
    loading,
    userData: subscribers,
  } = useGetReq("/newsletter/get-subscribers", {});

  return !loading
    ? subscribers && (
        <>
          <ErrorCon error={error} />
          <div className="container">
            <div className="bg-white p-4">
              <h3 className="text-uppercase">subcribers</h3>
              <div className="table-responsive mt-4">
                <table className="table table-striped border">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Subscribed at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber: Subscriber) => {
                      return (
                        <tr>
                          <td>{subscriber.email}</td>
                          <td>
                            {new Date(subscriber.createdAt).toDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )
    : "loading";
}
