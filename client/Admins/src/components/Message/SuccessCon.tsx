export default function SuccessCon({ success }: { success: string }) {
  return (
    success && (
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "2rem",
          zIndex: "99999",
        }}
        className="d-flex gap-2 text-start align-items-center pe-5 ps-3 py-3 rounded bg-warning"
      >
        <i className="bi bi-check-circle-fill text-light fs-5" />
        <span className="text-light">{success}</span>
      </div>
    )
  );
}
