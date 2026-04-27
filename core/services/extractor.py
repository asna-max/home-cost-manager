from .ocr_api import ocr_space_extract
from .tesseract_ocr import tesseract_extract
from .parser import parse_bill_text


def extract_bill(file):
    text = ""
    try:
        print("Using OCR API...")
        result = ocr_space_extract(file)

        text = result.get("raw_text", "")

        if not text.strip():
            raise Exception("Empty OCR result")

    except Exception as e:
        print("OCR API failed => fallback:", str(e))

        try:
            # File pointer zurücksetzen
            file.seek(0)

            print("Using Tesseract fallback...")
            result = tesseract_extract(file)

            text = result.get("raw_text", "")
        except Exception as e2:
            print("Tesseract not available:", e2)
            text = ""

    parsed = parse_bill_text(text)

    return {
        "raw_text": text,
        "parsed": parsed
    }
