import Card from "../../common/cards/Card.jsx";

const EventFormSidebar = () => {
  return (
    <Card title={<h3>Wskazówki</h3>}>
      <h4>Jak stworzyć dobre wydarzenie?</h4>
      <ul className="list-indent">
        <li>
          <strong>Tytuł:</strong> Powinien być krótki, konkretny i przyciągający
          uwagę
        </li>
        <li>
          <strong>Opis:</strong> Zawrzyj program, korzyści dla uczestników i
          praktyczne informacje
        </li>
        <li>
          <strong>Data:</strong> Upewnij się, że data nie koliduje z innymi
          ważnymi wydarzeniami
        </li>
        <li>
          <strong>Lokalizacja:</strong> Podaj dokładny adres
        </li>
      </ul>

      <h4 className="mt-lg">Wymagania:</h4>
      <ul className="list-indent">
        <li>Wszystkie pola oznaczone gwiazdką (*) są obowiązkowe</li>
        <li>Tytuł: 5-200 znaków</li>
        <li>Opis: 20-2000 znaków</li>
        <li>Data musi być w przyszłości</li>
      </ul>
    </Card>
  );
};

export default EventFormSidebar;
