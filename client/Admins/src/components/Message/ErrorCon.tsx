export default function ErrorCon({ error }: { error: string }) {
  return (
    error && (
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "2rem",
          zIndex: "99999",
        }}
        className="d-flex gap-2 text-start align-items-center pe-5 ps-3 py-3 rounded bg-danger"
      >
        <i className="bi bi-exclamation-triangle-fill text-light fs-5" />
        <span className="text-light">{error}</span>
      </div>
    )
  );
}
