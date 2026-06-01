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

    # 1. Verbrauchszeitraum
    period = extract_explicit_period(text)

    if period:
        return period

    # 2. Quartal
    period = extract_quarter_period(text)

    if period:
        return period

    # 3. Datumsbereich
    period = extract_date_range(text)

    if period:
        return period

    return {}


def extract_explicit_period(text):
    patterns = [
        r"(Verbrauchszeitraum|Abrechnungsperiode|Periode|Zeitraum).*?(\d{2}\.\d{2}\.\d{4}).*?(\d{2}\.\d{2}\.\d{4})",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            return {
                "period_from": parse_date(match.group(2)),
                "period_to": parse_date(match.group(3)),
            }

    return None


def extract_quarter_period(text):
    match = re.search(
        r"([1-4])\.\s*Quartal\s*(\d{4})",
        text,
        re.IGNORECASE
    )

    if not match:
        return None

    quarter = int(match.group(1))
    year = int(match.group(2))

    periods = {
        1: ("01.01", "31.03"),
        2: ("01.04", "30.06"),
        3: ("01.07", "30.09"),
        4: ("01.10", "31.12"),
    }

    start, end = periods[quarter]

    return {
        "period_from": parse_date(f"{start}.{year}"),
        "period_to": parse_date(f"{end}.{year}")
    }


def extract_date_range(text):
    matches = re.findall(
        r"(\d{2}\.\d{2}\.\d{4})",
        text
    )

    if len(matches) >= 2:
        return {
            "period_from": parse_date(matches[0]),
            "period_to": parse_date(matches[1]),
        }

    return None


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
