import requests
from django.conf import settings

OCR_API_KEY = settings.OCR_API_KEY


def ocr_space_extract(file):
    url = "https://api.ocr.space/parse/image"

    response = requests.post(
        url,
        files={"file": (
            file.name,
            file,
            file.content_type
        )},
        data={
            "apikey": OCR_API_KEY,
            "language": "eng"
        },
    )

    # DEBUG: komplette Antwort sehen
    print("STATUS:", response.status_code)

    try:
        data = response.json()
    except Exception:
        print("OCR RESPONSE NOT JSON:", response.text)
        raise Exception("Invalid OCR response")

    print("OCR RESPONSE:", data)

    # API Fehler prüfen
    if data.get("IsErroredOnProcessing"):
        print("OCR ERROR:", data)
        raise Exception("OCR API failed")

    # Struktur prüfen (sehr wichtig)
    parsed_results = data.get("ParsedResults")

    if not parsed_results:
        print("No ParsedResults:", data)
        return {"raw_text": ""}

    text = parsed_results[0].get("ParsedText", "")

    print("EXTRACTED TEXT:", text)

    return {
        "raw_text": text
    }
