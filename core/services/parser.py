import re
from datetime import datetime


# Regex
# \d+        → eine oder mehrere Zahlen
# [.,]       → Punkt oder Komma
# \d{2}      → genau 2 Nachkommastellen
# (Due Date|Fällig) → keyword
# .*?               → irgendwas dazwischen
# (\d{2}...)        → Datum


def parse_amount(text):
    match = re.search(r'(\d+[.,]\d{2})\s?(CHF|EUR)?', text)
    if match:
        return float(match.group(1).replace(",", "."))
    return None


def parse_date(date_str):
    for fmt in ("%d.%m.%Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(date_str, fmt).date()
        except:
            continue
    return None


def parse_due_date(text):
    match = re.search(
        r'(Due Date|Fällig).*?(\d{2}[.\-]\d{2}[.\-]\d{4})', text, re.IGNORECASE)
    if match:
        return parse_date(match.group(2))
    return None


def parse_period(text):
    match = re.search(
        r'(\d{2}[.\-]\d{2}[.\-]\d{4}).*?(\d{2}[.\-]\d{2}[.\-]\d{4})',
        text
    )
    if match:
        return {
            "period_from": parse_date(match.group(1)),
            "period_to": parse_date(match.group(2)),
        }
    return {}


def parse_type(text):
    text_lower = text.lower()

    if "electric" in text_lower:
        return "electricity"
    if "water" in text_lower:
        return "water"
    if "heating" in text_lower:
        return "heating"

    return "other"


def parse_bill_text(text):
    data = {}

    data["amount"] = parse_amount(text)
    data["due_date"] = parse_due_date(text)
    data.update(parse_period(text))
    data["bill_type"] = parse_type(text)

    return data
