# import pytesseract
from PIL import Image
import tempfile


def tesseract_extract(file):
    # file temporär speichern
    with tempfile.NamedTemporaryFile(delete=False, suffix="png") as tmp:
        for chunk in file.chunks():
            tmp.write(chunk)
        tmp_path = tmp.name

    # text = pytesseract.image_to_string(Image.open(tmp_path))

    return {
        # "raw_text": text
        "raw_text": ""
    }
