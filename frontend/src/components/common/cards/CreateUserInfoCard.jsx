import React from "react";

const CreateUserInfoCard = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Informacje</h3>
        </div>
        <div className="card-body">
          <h4>Wymagania dotyczące danych:</h4>
          <ul className="list-indent-sm">
            <li>
              <strong>Imię i nazwisko:</strong> 2-100 znaków
            </li>
            <li>
              <strong>Email:</strong> musi być unikalny w systemie
            </li>
            <li>
              <strong>Hasło:</strong> minimum 8 znaków (tylko przy dodawaniu)
            </li>
            <li>
              <strong>Rola:</strong> określa uprawnienia użytkownika
            </li>
          </ul>

          <h4 className="mt-lg">Role użytkowników:</h4>
          <div className="mt-sm">
            <span className="badge badge-success">User</span>
            <p className="text-sm mt-xs">
              Podstawowe uprawnienia - przeglądanie i zapisywanie się na
              wydarzenia
            </p>
          </div>
          <div className="mt-sm">
            <span className="badge badge-primary">Organizer</span>
            <p className="text-sm mt-xs">
              Może tworzyć i zarządzać własnymi wydarzeniami
            </p>
          </div>
          <div className="mt-sm">
            <span className="badge badge-error">Admin</span>
            <p className="text-sm mt-xs">
              Pełny dostęp do wszystkich funkcji systemu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserInfoCard;
