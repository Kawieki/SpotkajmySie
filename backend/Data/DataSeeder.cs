using Backend.Models;
using Backend.Models.Enums;

namespace Backend.Data;

public static class DataSeeder
{
   
    public static void Seed(AppDbContext context)
    {
        if (context.Users.Any())
        {
            return;
        }

        //hasło do kont
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword("kochamgrk2137");

        //Seed users
        var users = new List<User>
        {
            //Admin
            new() { FirstName = "Łukasz", LastName = "Wiszniewski", Email = "s31083@pjwstk.edu.pl", Role = UserRole.Admin, Description = "Student Pj", PasswordHash = hashedPassword },
            // Organizatorzy
            new() { FirstName = "Adam", LastName = "Nowak", Email = "adam.nowak@example.com", Role = UserRole.Organizer, Description = "Specjalista od IT", PasswordHash = hashedPassword },
            new() { FirstName = "Ewa", LastName = "Kowalska", Email = "ewa.kowalska@example.com", Role = UserRole.Organizer, Description = "Organizatorka konferencji medycznych", PasswordHash = hashedPassword },
            new() { FirstName = "Piotr", LastName = "Wiśniewski", Email = "piotr.wisniewski@example.com", Role = UserRole.Organizer, Description = "Trener personalny", PasswordHash = hashedPassword },
            new() { FirstName = "Maria", LastName = "Wójcik", Email = "maria.wojcik@example.com", Role = UserRole.Organizer, Description = "Kuratorka sztuki", PasswordHash = hashedPassword },
            new() { FirstName = "Krzysztof", LastName = "Kowalczyk", Email = "krzysztof.kowalczyk@example.com", Role = UserRole.Organizer, Description = "Szef kuchni", PasswordHash = hashedPassword },
            
            // Zwykli użytkownicy
            new() { FirstName = "Anna", LastName = "Kamińska", Email = "anna.kaminska@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Michał", LastName = "Lewandowski", Email = "michal.lewandowski@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Agnieszka", LastName = "Zielińska", Email = "agnieszka.zielinska@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Tomasz", LastName = "Szymański", Email = "tomasz.szymanski@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Magdalena", LastName = "Woźniak", Email = "magdalena.wozniak@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Paweł", LastName = "Dąbrowski", Email = "pawel.dabrowski@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Monika", LastName = "Kozłowska", Email = "monika.kozlowska@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Marcin", LastName = "Jankowski", Email = "marcin.jankowski@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Katarzyna", LastName = "Mazur", Email = "katarzyna.mazur@example.com", Role = UserRole.User, PasswordHash = hashedPassword },
            new() { FirstName = "Jakub", LastName = "Kwiatkowski", Email = "jakub.kwiatkowski@example.com", Role = UserRole.User, PasswordHash = hashedPassword }
        };

        context.Users.AddRange(users);
        context.SaveChanges();

        var organizers = users.Where(u => u.Role == UserRole.Organizer).ToList();


        //Seed events
        var events = new List<Event>
        {
            new Event { Title = "Warsztaty C# dla początkujących", Description = "Intensywne warsztaty wprowadzające do świata programowania w języku C# oraz platformy .NET. Uczestnicy poznają składnię języka, podstawowe struktury danych, programowanie obiektowe oraz stworzą swoją pierwszą aplikację konsolową. Idealne dla osób, które chcą rozpocząć karierę jako programista .NET.", StartDate = DateTime.Now.AddDays(10), EndDate = DateTime.Now.AddDays(10).AddHours(4), Location = "Warszawa", MaxPeople = 20, Price = 100, IsOnline = false, OrganizerId = organizers[0].Id },
            new Event { Title = "Konferencja Medyczna 2025", Description = "Prestiżowe wydarzenie gromadzące specjalistów z różnych dziedzin medycyny. W programie wykłady na temat najnowszych osiągnięć w kardiologii, onkologii i neurologii, a także warsztaty praktyczne z wykorzystaniem nowoczesnego sprzętu medycznego. Doskonała okazja do wymiany doświadczeń i nawiązania kontaktów zawodowych.", StartDate = DateTime.Now.AddMonths(2), EndDate = DateTime.Now.AddMonths(2).AddDays(2), Location = "Kraków", MaxPeople = 200, Price = 500, IsOnline = false, OrganizerId = organizers[1].Id },
            new Event { Title = "Maraton Fitness", Description = "Wyzwanie dla miłośników aktywnego trybu życia! Cały dzień wypełniony różnorodnymi zajęciami fitness, od dynamicznej zumby i tabaty, po relaksujący pilates i stretching. Zajęcia poprowadzą certyfikowani trenerzy z wieloletnim doświadczeniem. Zapewniamy wodę, zdrowe przekąski i świetną atmosferę.", StartDate = DateTime.Now.AddDays(5), EndDate = DateTime.Now.AddDays(5).AddHours(6), Location = "Gdańsk", MaxPeople = 50, Price = 50, IsOnline = false, OrganizerId = organizers[2].Id },
            new Event { Title = "Wystawa Sztuki Nowoczesnej", Description = "Zapraszamy na wernisaż prac młodych, obiecujących artystów z całej Polski. Wystawa obejmuje malarstwo, rzeźbę, instalacje artystyczne oraz sztukę cyfrową. To wyjątkowa okazja, by zobaczyć, jak młode pokolenie interpretuje współczesną rzeczywistość. Wstęp wolny dla wszystkich miłośników sztuki.", StartDate = DateTime.Now.AddDays(20), EndDate = DateTime.Now.AddDays(30), Location = "Wrocław", MaxPeople = 100, Price = 0, IsOnline = false, OrganizerId = organizers[3].Id },
            new Event { Title = "Kurs Gotowania Włoskiego", Description = "Odkryj sekrety kuchni włoskiej pod okiem doświadczonego szefa kuchni. Nauczysz się przygotowywać tradycyjną pizzę neapolitańską, domowy makaron oraz klasyczne desery, takie jak tiramisu. Kurs kończy się wspólną degustacją przygotowanych potraw przy lampce włoskiego wina.", StartDate = DateTime.Now.AddDays(15), EndDate = DateTime.Now.AddDays(15).AddHours(3), Location = "Poznań", MaxPeople = 10, Price = 200, IsOnline = false, OrganizerId = organizers[4].Id },

            new Event { Title = "Webinar: AI w Biznesie", Description = "Dowiedz się, jak sztuczna inteligencja rewolucjonizuje świat biznesu. Eksperci omówią praktyczne zastosowania AI w marketingu, obsłudze klienta i analizie danych. Poznasz narzędzia, które pomogą zautomatyzować procesy w Twojej firmie i zwiększyć jej efektywność. Webinar skierowany do przedsiębiorców i menedżerów.", StartDate = DateTime.Now.AddDays(3), EndDate = DateTime.Now.AddDays(3).AddHours(2), Location = "Online", MaxPeople = 500, Price = 0, IsOnline = true, OrganizerId = organizers[0].Id },
            new Event { Title = "Hackathon Studencki", Description = "24-godzinny maraton programowania dla studentów kierunków informatycznych. Zbierz drużynę i stwórz innowacyjną aplikację, która rozwiąże realny problem społeczny. Na zwycięzców czekają atrakcyjne nagrody rzeczowe oraz staże w czołowych firmach technologicznych. Zapewniamy pizzę i napoje energetyczne!", StartDate = DateTime.Now.AddMonths(1), EndDate = DateTime.Now.AddMonths(1).AddDays(1), Location = "Łódź", MaxPeople = 100, Price = 20, IsOnline = false, OrganizerId = organizers[0].Id },
            new Event { Title = "Joga w Parku", Description = "Zrelaksuj się i odnajdź wewnętrzny spokój podczas sesji jogi na świeżym powietrzu. Zajęcia są odpowiednie dla osób na każdym poziomie zaawansowania. Ćwiczenia pomogą Ci poprawić elastyczność, wzmocnić mięśnie i zredukować stres. Prosimy o zabranie własnej maty do ćwiczeń.", StartDate = DateTime.Now.AddDays(1), EndDate = DateTime.Now.AddDays(1).AddHours(1), Location = "Warszawa", MaxPeople = 30, Price = 0, IsOnline = false, OrganizerId = organizers[2].Id },
            new Event { Title = "Targi Pracy IT", Description = "Największe wydarzenie rekrutacyjne w regionie dla branży IT. Spotkaj się z przedstawicielami czołowych firm technologicznych, poznaj oferty pracy i staży, skonsultuj swoje CV z rekruterami. W programie również prelekcje ekspertów na temat rozwoju kariery w IT.", StartDate = DateTime.Now.AddMonths(3), EndDate = DateTime.Now.AddMonths(3).AddDays(1), Location = "Katowice", MaxPeople = 1000, Price = 0, IsOnline = false, OrganizerId = organizers[0].Id },
            new Event { Title = "Kurs Fotografii", Description = "Warsztaty dla pasjonatów fotografii, którzy chcą wyjść poza tryb automatyczny. Nauczysz się obsługi aparatu, zasad kompozycji, pracy ze światłem oraz podstaw obróbki zdjęć. Część praktyczna odbędzie się w plenerze, gdzie będziesz mógł przetestować nowo nabytą wiedzę.", StartDate = DateTime.Now.AddDays(12), EndDate = DateTime.Now.AddDays(12).AddHours(5), Location = "Szczecin", MaxPeople = 15, Price = 150, IsOnline = false, OrganizerId = organizers[3].Id },

            new Event { Title = "Degustacja Win", Description = "Wieczór pełen smaków i aromatów dla miłośników wina. Sommelier zaprezentuje wyselekcjonowane wina z różnych regionów świata, opowie o procesie ich produkcji i zasadach łączenia wina z potrawami. W cenie degustacja 5 rodzajów wina oraz deska serów i wędlin.", StartDate = DateTime.Now.AddDays(25), EndDate = DateTime.Now.AddDays(25).AddHours(3), Location = "Lublin", MaxPeople = 20, Price = 100, IsOnline = false, OrganizerId = organizers[4].Id },
            new Event { Title = "Szkolenie z Cyberbezpieczeństwa", Description = "Praktyczne szkolenie online dotyczące ochrony danych w sieci. Dowiesz się, jak rozpoznawać ataki phishingowe, tworzyć bezpieczne hasła i zabezpieczać swoje urządzenia przed złośliwym oprogramowaniem. Wiedza niezbędna dla każdego użytkownika internetu w dzisiejszych czasach.", StartDate = DateTime.Now.AddDays(8), EndDate = DateTime.Now.AddDays(8).AddHours(4), Location = "Online", MaxPeople = 50, Price = 300, IsOnline = true, OrganizerId = organizers[0].Id },
            new Event { Title = "Festiwal Filmowy", Description = "Święto kina niezależnego i autorskiego. Przegląd najciekawszych produkcji filmowych z ostatniego roku, które nie trafiły do szerokiej dystrybucji. Po seansach odbędą się spotkania z reżyserami i aktorami. Wydarzenie dla prawdziwych koneserów sztuki filmowej.", StartDate = DateTime.Now.AddMonths(4), EndDate = DateTime.Now.AddMonths(4).AddDays(3), Location = "Gdynia", MaxPeople = 300, Price = 150, IsOnline = false, OrganizerId = organizers[3].Id },
            new Event { Title = "Warsztaty Ceramiczne", Description = "Kreatywne zajęcia, podczas których stworzysz własne naczynia z gliny. Poznasz techniki lepienia ręcznego oraz podstawy pracy na kole garncarskim. Wszystkie prace zostaną wypalone i poszkliwione, dzięki czemu będziesz mógł zabrać je do domu i używać na co dzień.", StartDate = DateTime.Now.AddDays(18), EndDate = DateTime.Now.AddDays(18).AddHours(2), Location = "Bydgoszcz", MaxPeople = 8, Price = 80, IsOnline = false, OrganizerId = organizers[3].Id },
            new Event { Title = "Bieg Charytatywny", Description = "Dołącz do nas i pobiegnij w szczytnym celu! Całkowity dochód z opłat startowych zostanie przekazany na wsparcie lokalnego szpitala dziecięcego. Trasa biegu prowadzi przez malownicze tereny leśne. Dla każdego uczestnika pamiątkowy medal i posiłek regeneracyjny.", StartDate = DateTime.Now.AddMonths(2), EndDate = DateTime.Now.AddMonths(2).AddHours(4), Location = "Białystok", MaxPeople = 500, Price = 30, IsOnline = false, OrganizerId = organizers[2].Id }
        };

        context.Events.AddRange(events);
        context.SaveChanges();

        // Seed Registrations
        var regularUsers = users.Where(u => u.Role == UserRole.User).ToList();

        var registrations = new List<Registration>
        {
            new Registration { UserId = regularUsers[0].Id, EventId = events[0].Id, RegistrationDate = DateTime.Now.AddDays(-5), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[1].Id, EventId = events[0].Id, RegistrationDate = DateTime.Now.AddDays(-4), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[2].Id, EventId = events[1].Id, RegistrationDate = DateTime.Now.AddDays(-10), Status = RegistrationStatus.Pending },
            new Registration { UserId = regularUsers[3].Id, EventId = events[2].Id, RegistrationDate = DateTime.Now.AddDays(-1), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[4].Id, EventId = events[3].Id, RegistrationDate = DateTime.Now.AddDays(-20), Status = RegistrationStatus.Cancelled },

            new Registration { UserId = regularUsers[5].Id, EventId = events[4].Id, RegistrationDate = DateTime.Now.AddDays(-2), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[6].Id, EventId = events[5].Id, RegistrationDate = DateTime.Now.AddDays(-1), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[7].Id, EventId = events[6].Id, RegistrationDate = DateTime.Now.AddDays(-15), Status = RegistrationStatus.Pending },
            new Registration { UserId = regularUsers[8].Id, EventId = events[7].Id, RegistrationDate = DateTime.Now.AddDays(-3), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[9].Id, EventId = events[8].Id, RegistrationDate = DateTime.Now.AddDays(-30), Status = RegistrationStatus.Confirmed },

            new Registration { UserId = regularUsers[0].Id, EventId = events[9].Id, RegistrationDate = DateTime.Now.AddDays(-6), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[1].Id, EventId = events[10].Id, RegistrationDate = DateTime.Now.AddDays(-7), Status = RegistrationStatus.Pending },
            new Registration { UserId = regularUsers[2].Id, EventId = events[11].Id, RegistrationDate = DateTime.Now.AddDays(-8), Status = RegistrationStatus.Confirmed },
            new Registration { UserId = regularUsers[3].Id, EventId = events[12].Id, RegistrationDate = DateTime.Now.AddDays(-9), Status = RegistrationStatus.Cancelled },
            new Registration { UserId = regularUsers[4].Id, EventId = events[13].Id, RegistrationDate = DateTime.Now.AddDays(-10), Status = RegistrationStatus.Confirmed }
        };

        context.Registrations.AddRange(registrations);
        context.SaveChanges();
    }
}
