import re
from datetime import datetime


# =========================
# DATE PARSER
# =========================
def parse_date(date_str):
    for fmt in ("%d.%m.%Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(date_str, fmt).date()
        except:
            continue
    return None


# =========================
# CLEAN TEXT
# =========================
def clean_text(text):
    text = text.replace("\n", " ")
    text = text.replace("\r", " ")
    return " ".join(text.split())


# =========================
# AMOUNT
# =========================
def extract_amount(text):
    patterns = [
        r"Gesamttotal.*?CHF.*?([0-9\.\'\,]+)",
        r"Zu bezahlender Betrag.*?CHF\s*([0-9\.\'\,]+)",
        r"Total.*?CHF\s*([0-9\.\'\,]+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            amount = match.group(1)
            amount = amount.replace("'", "").replace(",", ".")
            return float(amount)

    return None


# =========================
# DUE DATE
# =========================
def extract_due_date(text):
    match = re.search(
        r"(Zahlbar bis|Fällig).*?(\d{2}\.\d{2}\.\d{4})",
        text,
        re.IGNORECASE
    )
    if match:
        return parse_date(match.group(2))
    return None


# =========================
# PERIOD
# =========================
def extract_period(text):
    match = re.search(
        r"(\d{2}\.\d{2}\.\d{4}).*?(\d{2}\.\d{2}\.\d{4})",
        text
    )
    if match:
        return {
            "period_from": parse_date(match.group(1)),
            "period_to": parse_date(match.group(2)),
        }
    return {}


# =========================
# CONSUMPTIONS
# =========================
def extract_consumptions(text):
    data = {}

    # Strom / Heizung
    kwh = re.findall(r"([\d'\.]+)\s*kWh", text)
    if kwh:
        values = [float(v.replace("'", "")) for v in kwh]
        data["consumption_kwh"] = max(values)

    # Wasser
    m3 = re.findall(r"([\d'\.]+)\s*m3", text)
    if m3:
        values = [float(v.replace("'", "")) for v in m3]
        data["consumption_m3"] = max(values)

    return data


# =========================
# BILL TYPE
# =========================
def detect_bill_type(text, consumptions):
    if "consumption_m3" in consumptions:
        return "water"

    if "consumption_kwh" in consumptions:
        return "electricity"

    if "heizung" in text.lower():
        return "heating"

    return "other"


# =========================
# MAIN
# =========================
def parse_bill_text(text):
    text = clean_text(text)

    data = {}

    data["amount"] = extract_amount(text)
    data["due_date"] = extract_due_date(text)
    data.update(extract_period(text))

    consumptions = extract_consumptions(text)
    data.update(consumptions)

    data["bill_type"] = detect_bill_type(text, consumptions)

    return data
