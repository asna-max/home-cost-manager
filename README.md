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

## ⚙️ Installation

---

## 📋 Voraussetzungen

- Python (>= 3.10)
- Node.js (>= 18)
- Ports frei:
  - Backend: **8000**
  - Frontend: **5173**

---

## 🐍 Backend (Django)

### 1. Terminal öffnen

```bash id="h9z0bf"
cd core
```

---

### 2. Virtuelle Umgebung erstellen

```bash id="7z6p1n"
python -m venv venv
```

---

### 3. Aktivieren

**Windows:**

```bash id="w6b37k"
venv\Scripts\activate
```

**Mac/Linux:**

```bash id="qfbjxu"
source venv/bin/activate
```

---

### 4. Abhängigkeiten installieren

```bash id="uxv7qp"
pip install -r requirements.txt
```

---

### 5. .env Datei erstellen

Pfad: `core/.env`

```env id="9kw5n3"
SECRET_KEY=your-secret-key
DEBUG=True
OCR_API_KEY=your-ocr-api-key
```

---

### 6. Migration ausführen

```bash id="l0ybdi"
python manage.py migrate
```

---

### 7. Admin erstellen (optional)

```bash id="tb0gqa"
python manage.py createsuperuser
```

---

### 8. Backend starten

```bash id="6qv6r8"
python manage.py runserver
```

👉 Backend läuft auf:
http://127.0.0.1:8000

---

## 🌐 Frontend (React)

### 1. Neues Terminal öffnen

```bash id="3gq5i6"
cd frontend
```

---

### 2. Dependencies installieren

```bash id="k4e9zo"
npm install
```

---

### 3. Frontend starten

```bash id="j5tq4n"
npm run dev
```

👉 Frontend läuft auf:
http://localhost:5173

---

## 🔐 Login

Nach dem Start:

1. Benutzer registrieren oder Admin verwenden
2. Login durchführen
3. Haushalt auswählen

---

## 📄 Nutzung (Workflow)

1. "Upload Bill" öffnen
2. Rechnung hochladen (PDF oder Bild)
3. OCR analysiert die Rechnung
4. Daten prüfen und anpassen
5. Speichern

---

## 🧱 Projektstruktur

```id="06m32j"
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

| Endpoint              | Beschreibung     |
| --------------------- | ---------------- |
| `/api/bills/`         | Alle Rechnungen  |
| `/api/bills/extract/` | OCR Verarbeitung |
| `/api/households/`    | Haushalte        |

---

## ⚠️ Hinweise

- `.env` ist nicht im Repository enthalten
- `media/` wird nicht versioniert (Uploads)
- OCR benötigt Internetverbindung
- CORS ist für Port 5173 konfiguriert

---

## 🚀 Erweiterungen (Future Work)

- Mobile Optimierung
- Dashboard mit Statistiken
- Export (PDF / Excel)
- Bessere OCR-Erkennung

---

## 👨‍💻 Autor

Ashok Nadesu
