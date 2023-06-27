import AccountNav from "./AccountNav";
import useGetReq from "../../hooks/useGetReq";
import ErrorCon from "../Auth/ErrorCon";

type WalletTransactions = {
  id: string;
  type: string;
  amount: number;
  message: string;
};

export default function Wallet() {
  const {
    error,
    loading,
    userData: wallet,
  } = useGetReq("/wallets/get-wallet", {});

  const {
    error: _error,
    loading: _loading,
    userData: walletTransactions,
  } = useGetReq("/wallets/get-transactions", {});

  return !loading && !_loading ? (
    <>
      <ErrorCon error={error} />
      <ErrorCon error={_error} />
      <div className="container py-5">
        <div className="d-md-flex justify-content-center align-items-start gap-5">
          <AccountNav />
          <div className="w-100 mt-md-0 mt-5 p-5 border">
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
              <div className="d-flex align-items-center gap-4">
                <div className="border rounded px-4 py-3">
                  <i className="bi bi-coin fs-1"></i>
                </div>
                <div className="d-flex flex-column">
                  <strong className="fs-5">Total earned coins</strong>
                  <strong className="fs-4">
                    {wallet ? wallet.totalBalance : 0}
                  </strong>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4">
                <div className="border rounded px-4 py-3">
                  <i className="bi bi-wallet2 fs-3"></i>
                </div>
                <div className="d-flex flex-column">
                  <strong className="fs-5">Available coins</strong>
                  <strong className="fs-4">
                    {wallet ? wallet.availableBalance : 0}
                  </strong>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-around gap-5 py-4 border-bottom">
              <div className="text-center">
                <div className="p-3 rounded border mb-3">
                  <i className="bi bi-check-square-fill fs-4" />
                </div>
                <strong>Recieved</strong>
              </div>
              <div className="text-center">
                <div className="p-3 rounded border mb-3">
                  <i className="bi bi-x-square-fill fs-4" />
                </div>
                <strong>Used</strong>
              </div>
            </div>
            <div className="d-flex flex-column gap-3 pt-3">
              {walletTransactions && walletTransactions.length ? (
                walletTransactions.map((transaction: WalletTransactions) => {
                  return (
                    <div
                      key={transaction.id}
                      className="d-flex justify-content-between align-items-center gap-2"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-3 rounded border">
                          <i
                            className={`bi bi-${
                              transaction.type === "in" ? "check" : "x"
                            }-square-fill fs-4`}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <strong>
                            {transaction.type === "in" ? "Recieved" : "Used"}{" "}
                            Coins
                          </strong>
                          <span>{transaction.message}</span>
                        </div>
                      </div>
                      <strong
                        className={`fs-4 fw-bold text-${
                          transaction.type === "in" ? "primary" : "danger"
                        }`}
                      >
                        {transaction.type === "in" ? "+" : "-"}{" "}
                        {transaction.amount}
                      </strong>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4">No Transactions Found!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    "loading..."
  );
}
