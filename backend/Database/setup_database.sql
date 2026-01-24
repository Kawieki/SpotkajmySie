-- Skrypt archiwalny do tworzenia bazy danych (Wczesniej byl uzyywany MySQL ale wystepowaly problemy wiec przenioslem sie na embedded sqlite)

-- ==========================================
-- 1. Tworzenie tabel (Schema)
-- ==========================================

CREATE TABLE IF NOT EXISTS "Users" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Role" INTEGER NOT NULL,
    "Description" TEXT NULL
);

CREATE TABLE IF NOT EXISTS "Events" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Events" PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "StartDate" TEXT NOT NULL,
    "EndDate" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "MaxPeople" INTEGER NULL,
    "Price" REAL NULL,
    "Website" TEXT NULL,
    "IsOnline" INTEGER NOT NULL,
    "OrganizerId" INTEGER NOT NULL,
    CONSTRAINT "FK_Events_Users_OrganizerId" FOREIGN KEY ("OrganizerId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Registrations" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Registrations" PRIMARY KEY AUTOINCREMENT,
    "EventId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "RegistrationDate" TEXT NOT NULL,
    "Status" INTEGER NOT NULL,
    CONSTRAINT "FK_Registrations_Events_EventId" FOREIGN KEY ("EventId") REFERENCES "Events" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Registrations_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

-- Hasło dla wszystkich użytkowników: "kochamgrk2137" (zakodowane)
-- Uwaga: Hash może się różnić w zależności od soli, tutaj użyto przykładowego
INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "PasswordHash", "Role", "Description") VALUES
(1, 'Łukasz', 'Wiszniewski', 's31083@pjwstk.edu.pl', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 2, 'Student Pj'),
(2, 'Adam', 'Nowak', 'adam.nowak@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 1, 'Specjalista od IT'),
(3, 'Ewa', 'Kowalska', 'ewa.kowalska@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 1, 'Organizatorka konferencji medycznych'),
(4, 'Piotr', 'Wiśniewski', 'piotr.wisniewski@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 1, 'Trener personalny'),
(5, 'Maria', 'Wójcik', 'maria.wojcik@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 1, 'Kuratorka sztuki'),
(6, 'Krzysztof', 'Kowalczyk', 'krzysztof.kowalczyk@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 1, 'Szef kuchni'),
(7, 'Anna', 'Kamińska', 'anna.kaminska@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(8, 'Michał', 'Lewandowski', 'michal.lewandowski@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(9, 'Agnieszka', 'Zielińska', 'agnieszka.zielinska@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(10, 'Tomasz', 'Szymański', 'tomasz.szymanski@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(11, 'Magdalena', 'Woźniak', 'magdalena.wozniak@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(12, 'Paweł', 'Dąbrowski', 'pawel.dabrowski@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(13, 'Monika', 'Kozłowska', 'monika.kozlowska@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(14, 'Marcin', 'Jankowski', 'marcin.jankowski@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(15, 'Katarzyna', 'Mazur', 'katarzyna.mazur@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL),
(16, 'Jakub', 'Kwiatkowski', 'jakub.kwiatkowski@example.com', '$2a$11$GZvf.Y.z.x.w.v.u.t.s.r.q.p.o.n.m.l.k.j.i.h.g.f.e.d.c.b.a', 0, NULL);

-- Events
INSERT INTO "Events" ("Id", "Title", "Description", "StartDate", "EndDate", "Location", "MaxPeople", "Price", "Website", "IsOnline", "OrganizerId") VALUES
(1, 'Warsztaty C# dla początkujących', 'Intensywne warsztaty wprowadzające do świata programowania w języku C# oraz platformy .NET. Uczestnicy poznają składnię języka, podstawowe struktury danych, programowanie obiektowe oraz stworzą swoją pierwszą aplikację konsolową. Idealne dla osób, które chcą rozpocząć karierę jako programista .NET.', datetime('now', '+10 days'), datetime('now', '+10 days', '+4 hours'), 'Warszawa', 20, 100, NULL, 0, 2),
(2, 'Konferencja Medyczna 2025', 'Prestiżowe wydarzenie gromadzące specjalistów z różnych dziedzin medycyny. W programie wykłady na temat najnowszych osiągnięć w kardiologii, onkologii i neurologii, a także warsztaty praktyczne z wykorzystaniem nowoczesnego sprzętu medycznego. Doskonała okazja do wymiany doświadczeń i nawiązania kontaktów zawodowych.', datetime('now', '+60 days'), datetime('now', '+62 days'), 'Kraków', 200, 500, NULL, 0, 3),
(3, 'Maraton Fitness', 'Wyzwanie dla miłośników aktywnego trybu życia! Cały dzień wypełniony różnorodnymi zajęciami fitness, od dynamicznej zumby i tabaty, po relaksujący pilates i stretching. Zajęcia poprowadzą certyfikowani trenerzy z wieloletnim doświadczeniem. Zapewniamy wodę, zdrowe przekąski i świetną atmosferę.', datetime('now', '+5 days'), datetime('now', '+5 days', '+6 hours'), 'Gdańsk', 50, 50, NULL, 0, 4),
(4, 'Wystawa Sztuki Nowoczesnej', 'Zapraszamy na wernisaż prac młodych, obiecujących artystów z całej Polski. Wystawa obejmuje malarstwo, rzeźbę, instalacje artystyczne oraz sztukę cyfrową. To wyjątkowa okazja, by zobaczyć, jak młode pokolenie interpretuje współczesną rzeczywistość. Wstęp wolny dla wszystkich miłośników sztuki.', datetime('now', '+20 days'), datetime('now', '+30 days'), 'Wrocław', 100, 0, NULL, 0, 5),
(5, 'Kurs Gotowania Włoskiego', 'Odkryj sekrety kuchni włoskiej pod okiem doświadczonego szefa kuchni. Nauczysz się przygotowywać tradycyjną pizzę neapolitańską, domowy makaron oraz klasyczne desery, takie jak tiramisu. Kurs kończy się wspólną degustacją przygotowanych potraw przy lampce włoskiego wina.', datetime('now', '+15 days'), datetime('now', '+15 days', '+3 hours'), 'Poznań', 10, 200, NULL, 0, 6),
(6, 'Webinar: AI w Biznesie', 'Dowiedz się, jak sztuczna inteligencja rewolucjonizuje świat biznesu. Eksperci omówią praktyczne zastosowania AI w marketingu, obsłudze klienta i analizie danych. Poznasz narzędzia, które pomogą zautomatyzować procesy w Twojej firmie i zwiększyć jej efektywność. Webinar skierowany do przedsiębiorców i menedżerów.', datetime('now', '+3 days'), datetime('now', '+3 days', '+2 hours'), 'Online', 500, 0, NULL, 1, 2),
(7, 'Hackathon Studencki', '24-godzinny maraton programowania dla studentów kierunków informatycznych. Zbierz drużynę i stwórz innowacyjną aplikację, która rozwiąże realny problem społeczny. Na zwycięzców czekają atrakcyjne nagrody rzeczowe oraz staże w czołowych firmach technologicznych. Zapewniamy pizzę i napoje energetyczne!', datetime('now', '+30 days'), datetime('now', '+31 days'), 'Łódź', 100, 20, NULL, 0, 2),
(8, 'Joga w Parku', 'Zrelaksuj się i odnajdź wewnętrzny spokój podczas sesji jogi na świeżym powietrzu. Zajęcia są odpowiednie dla osób na każdym poziomie zaawansowania. Ćwiczenia pomogą Ci poprawić elastyczność, wzmocnić mięśnie i zredukować stres. Prosimy o zabranie własnej maty do ćwiczeń.', datetime('now', '+1 days'), datetime('now', '+1 days', '+1 hours'), 'Warszawa', 30, 0, NULL, 0, 4),
(9, 'Targi Pracy IT', 'Największe wydarzenie rekrutacyjne w regionie dla branży IT. Spotkaj się z przedstawicielami czołowych firm technologicznych, poznaj oferty pracy i staży, skonsultuj swoje CV z rekruterami. W programie również prelekcje ekspertów na temat rozwoju kariery w IT.', datetime('now', '+90 days'), datetime('now', '+91 days'), 'Katowice', 1000, 0, NULL, 0, 2),
(10, 'Kurs Fotografii', 'Warsztaty dla pasjonatów fotografii, którzy chcą wyjść poza tryb automatyczny. Nauczysz się obsługi aparatu, zasad kompozycji, pracy ze światłem oraz podstaw obróbki zdjęć. Część praktyczna odbędzie się w plenerze, gdzie będziesz mógł przetestować nowo nabytą wiedzę.', datetime('now', '+12 days'), datetime('now', '+12 days', '+5 hours'), 'Szczecin', 15, 150, NULL, 0, 5),
(11, 'Degustacja Win', 'Wieczór pełen smaków i aromatów dla miłośników wina. Sommelier zaprezentuje wyselekcjonowane wina z różnych regionów świata, opowie o procesie ich produkcji i zasadach łączenia wina z potrawami. W cenie degustacja 5 rodzajów wina oraz deska serów i wędlin.', datetime('now', '+25 days'), datetime('now', '+25 days', '+3 hours'), 'Lublin', 20, 100, NULL, 0, 6),
(12, 'Szkolenie z Cyberbezpieczeństwa', 'Praktyczne szkolenie online dotyczące ochrony danych w sieci. Dowiesz się, jak rozpoznawać ataki phishingowe, tworzyć bezpieczne hasła i zabezpieczać swoje urządzenia przed złośliwym oprogramowaniem. Wiedza niezbędna dla każdego użytkownika internetu w dzisiejszych czasach.', datetime('now', '+8 days'), datetime('now', '+8 days', '+4 hours'), 'Online', 50, 300, NULL, 1, 2),
(13, 'Festiwal Filmowy', 'Święto kina niezależnego i autorskiego. Przegląd najciekawszych produkcji filmowych z ostatniego roku, które nie trafiły do szerokiej dystrybucji. Po seansach odbędą się spotkania z reżyserami i aktorami. Wydarzenie dla prawdziwych koneserów sztuki filmowej.', datetime('now', '+120 days'), datetime('now', '+123 days'), 'Gdynia', 300, 150, NULL, 0, 5),
(14, 'Warsztaty Ceramiczne', 'Kreatywne zajęcia, podczas których stworzysz własne naczynia z gliny. Poznasz techniki lepienia ręcznego oraz podstawy pracy na kole garncarskim. Wszystkie prace zostaną wypalone i poszkliwione, dzięki czemu będziesz mógł zabrać je do domu i używać na co dzień.', datetime('now', '+18 days'), datetime('now', '+18 days', '+2 hours'), 'Bydgoszcz', 8, 80, NULL, 0, 5),
(15, 'Bieg Charytatywny', 'Dołącz do nas i pobiegnij w szczytnym celu! Całkowity dochód z opłat startowych zostanie przekazany na wsparcie lokalnego szpitala dziecięcego. Trasa biegu prowadzi przez malownicze tereny leśne. Dla każdego uczestnika pamiątkowy medal i posiłek regeneracyjny.', datetime('now', '+60 days'), datetime('now', '+60 days', '+4 hours'), 'Białystok', 500, 30, NULL, 0, 4);

-- Registrations
-- Statusy: Pending=0, Confirmed=1, Cancelled=2 (Przyjęte przykładowo, sprawdzić z enumem w kodzie)
INSERT INTO "Registrations" ("Id", "UserId", "EventId", "RegistrationDate", "Status") VALUES
(1, 7, 1, datetime('now', '-5 days'), 1),
(2, 8, 1, datetime('now', '-4 days'), 1),
(3, 9, 2, datetime('now', '-10 days'), 0),
(4, 10, 3, datetime('now', '-1 days'), 1),
(5, 11, 4, datetime('now', '-20 days'), 2),
(6, 12, 5, datetime('now', '-2 days'), 1),
(7, 13, 6, datetime('now', '-1 days'), 1),
(8, 14, 7, datetime('now', '-15 days'), 0),
(9, 15, 8, datetime('now', '-3 days'), 1),
(10, 16, 9, datetime('now', '-30 days'), 1),
(11, 7, 10, datetime('now', '-6 days'), 1),
(12, 8, 11, datetime('now', '-7 days'), 0),
(13, 9, 12, datetime('now', '-8 days'), 1),
(14, 10, 13, datetime('now', '-9 days'), 2),
(15, 11, 14, datetime('now', '-10 days'), 1);

