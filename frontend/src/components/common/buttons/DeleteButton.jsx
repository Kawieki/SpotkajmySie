import { useNavigate } from "react-router-dom";

const DeleteButton = ({
  itemId,
  onDelete,
  confirmMessage = "Czy na pewno chcesz usunąć ten element?",
  redirectTo = "/",
  className = "btn btn-danger",
  children = "Usuń",
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!itemId || !onDelete) return;

    const confirmed = window.confirm(confirmMessage);

    if (!confirmed) return;

    try {
      await onDelete(itemId);
      navigate(redirectTo);
    } catch (err) {
      console.error(err);
      alert(err.message ?? "Nie udało się usunąć elementu");
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default DeleteButton;
