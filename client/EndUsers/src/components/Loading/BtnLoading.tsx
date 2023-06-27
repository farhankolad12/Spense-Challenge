export default function BtnLoading({ color }: { color: string }) {
  return (
    <div className={`spinner-border text-${color}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
