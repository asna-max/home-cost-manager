# 🏠 HomeCostManager

Semesterarbeit im CAS Full Stack Development FS 26.

Web-Applikation zur Verwaltung von Haushaltskosten (Strom, Wasser, Heizung) mit OCR-Unterstützung zur automatischen Rechnungserkennung.

---

## 💡 Projektidee

Die Anwendung ermöglicht es, Rechnungen einfach hochzuladen und automatisch relevante Daten zu extrahieren:

- Betrag
- Verbrauch
- Fälligkeitsdatum
- Abrechnungszeitraum

Zusätzlich können mehrere Haushalte verwaltet und Benutzer eingeladen werden.

---

## 🚀 Features

- Multi-Household Support
- Benutzer-Einladungen
- Home Profile Verwaltung
- Rechnungs-Upload (PDF / Bild)
- OCR-basierte Datenerkennung
- Bills anzeigen und verwalten

---

## 🛠️ Technologien

Frontend:

- React (Vite)

Backend:

- Django
- Django REST Framework

Weitere:

- SQLite (aktuell)
- PostgreSQL (geplant)
- OCR API

---

## ⚙️ Installation (Quick Start)

### 📋 Voraussetzungen

- Python (>= 3.10)
- Node.js (>= 18)
- Ports frei:
  - Backend: **8000**
  - Frontend: **5173**

---

## 🐍 Backend (Django)

### 1. Projekt öffnen

```bash
cd core
```

### 2. Virtuelle Umgebung erstellen

```bash
python -m venv venv
```

### 3. Aktivieren

**Windows:**

```bash
venv\Scripts\activate
```

**Mac/Linux:**

```bash
source venv/bin/activate
```

### 4. Abhängigkeiten installieren

```bash
pip install -r requirements.txt
```

### 5. .env Datei erstellen

Pfad: `core/.env`

```env
SECRET_KEY=your-secret-key
DEBUG=True
OCR_API_KEY=your-ocr-api-key
```

### 6. Migration ausführen

```bash
python manage.py migrate
```

### 7. Admin erstellen (optional)

```bash
python manage.py createsuperuser
```

### 8. Backend starten

```bash
python manage.py runserver
```

👉 Backend läuft auf:
http://127.0.0.1:8000

---

## 🌐 Frontend (React)

### 1. Neues Terminal öffnen

```bash
cd frontend
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Frontend starten

```bash
npm run dev
```

👉 Frontend läuft auf:
http://localhost:5173

---

## 🔐 Login

### Demo Zugang

Benutzername: **demo**
Passwort: **demo123**

ODER

1. Benutzer registrieren
2. Login durchführen
3. Haushalt erstellen oder auswählen

---

## 📄 Nutzung (Workflow)

1. "Upload Bill" öffnen
2. Rechnung hochladen (PDF oder Bild)
3. OCR analysiert die Rechnung
4. Daten prüfen und anpassen
5. Speichern

---

## 🧱 Projektstruktur

```
core/
  ├── bills/
  ├── households/
  ├── services/
  ├── users/

frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
```

---

## 🔗 API (Auszug)

| Endpoint              | Methode  | Beschreibung     |
| --------------------- | -------- | ---------------- |
| /api/households/      | GET      | Haushalte laden  |
| /api/households/{id}/ | PATCH    | Name ändern      |
| /api/homes/{id}/      | GET/PUT  | Home Profile     |
| /api/bills/           | GET/POST | Rechnungen       |
| /api/bills/extract/   | POST     | OCR Verarbeitung |

---

## 📸 Screenshots

_TODO_

### Home Profile

![Home](docs/home.png)

### Bills

![Bills](docs/bills.png)

---

## ⚠️ Hinweise

- `.env` ist nicht im Repository enthalten (Security)
- `media/` wird nicht versioniert (Uploads)
- OCR benötigt Internetverbindung
- CORS ist für Port 5173 konfiguriert

---

## 🚀 Erweiterungen (Future Work)

- Mobile Optimierung
- Dashboard mit Statistiken
- Export (PDF / Excel)
- Verbesserung der OCR-Erkennung

---

## 👨‍💻 Autor

Ashok Nadesu
