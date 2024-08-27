import LoadingSpinner from "./LoadingSpinner";

function LoadingTextButton({ text }: { text?: string }) {
  return (
    <span className="flex items-center gap-3">
      <LoadingSpinner />
      {text && <span>{text}</span>}
    </span>
  );
}

export default LoadingTextButton;
