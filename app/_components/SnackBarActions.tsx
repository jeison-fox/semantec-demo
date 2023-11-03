import { closeSnackbar } from "notistack";

export default function SnackBarActions({ id }: { id: string | number }) {
  const handleClick = () => {
    closeSnackbar(id);
  };

  return (
    <button type="button" onClick={handleClick}>
      Dismiss
    </button>
  );
}
