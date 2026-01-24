import React from "react";
import { Link } from "react-router-dom";
import { getUserBadge, getRoleLabel } from "../../../utils/BadgesHelper.js";
import DeleteButton from "../buttons/DeleteButton.jsx";

const UserItem = ({ user, onDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>
        <Link to={`/users/${user.id}`}>
          <strong>{user.userName}</strong>
        </Link>
      </td>
      <td>{user.email}</td>
      <td>
        <span className={`badge ${getUserBadge(user.role)}`}>
          {getRoleLabel(user.role)}
        </span>
      </td>
      <td>
        <div className="flex gap-sm">
          <Link to={`/users/${user.id}`} className="btn btn-outline btn-small">
            Szczegóły
          </Link>
          <Link
            to={`/users/edit/${user.id}`}
            className="btn btn-outline btn-small"
          >
            Edytuj
          </Link>
          <DeleteButton
            itemId={user.id}
            onDelete={onDelete}
            confirmMessage={`Czy na pewno chcesz usunąć użytkownika ${user.userName} (${user.email})`}
            redirectTo={"/users"}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserItem;
