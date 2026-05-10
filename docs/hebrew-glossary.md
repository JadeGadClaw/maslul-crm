# Maslul CRM Hebrew Glossary

Status: review glossary for Gad and Forge  
Purpose: lock consistent, modern Hebrew UI terminology for the Maslul CRM MVP.

## Core UI direction

- App language: Hebrew (`lang="he"`)
- App direction: RTL (`dir="rtl"`)
- Date/time locale: `he-IL`, 24-hour time
- Business timezone: `Asia/Jerusalem` unless configured otherwise
- Default currency for Hebrew/Israeli build: Israeli shekel, `ILS`, `₪`

## Product / navigation terms

| English / concept | Hebrew UI term | Notes |
|---|---|---|
| Dashboard | לוח בקרה | Main overview screen |
| Jobs / Bookings | נסיעות | Preferred user-facing term |
| New job | נסיעה חדשה | Primary create action |
| Job details | פרטי נסיעה | Detail page/title |
| Clients | לקוחות | Billing/customer accounts |
| Client | לקוח | Billing customer |
| Passengers | נוסעים | People being transported |
| Passenger | נוסע | Individual passenger |
| Drivers | נהגים |  |
| Driver | נהג |  |
| Vehicles | רכבים | Prefer רכבים over כלי רכב for concise UI |
| Vehicle | רכב |  |
| Locations | מקומות | For saved pickup/dropoff places; חלופות: כתובות |
| Routes | מסלולים | Repeated pickup/dropoff pairs |
| Receipts | קבלות | Use חשבונית only if tax invoice is confirmed |
| Receipt | קבלה |  |
| Payments | תשלומים |  |
| Exports | ייצוא נתונים |  |
| Settings | הגדרות |  |
| Users | משתמשים |  |
| Reports | דוחות | No apostrophe |

## Common actions

| English | Hebrew UI term |
|---|---|
| Create | יצירה |
| Add | הוספה |
| New | חדש |
| Save | שמירה |
| Save changes | שמירת שינויים |
| Cancel | ביטול |
| Delete | מחיקה |
| Deactivate | השבתה |
| Edit | עריכה |
| Duplicate | שכפול |
| Search | חיפוש |
| Filter | סינון |
| Clear filters | ניקוי סינון |
| Export | ייצוא |
| Download | הורדה |
| Print | הדפסה |
| Generate receipt | הפקת קבלה |
| Void receipt | ביטול קבלה |
| Mark as completed | סימון כהושלמה |
| Assign driver | שיוך נהג |
| Assign vehicle | שיוך רכב |
| View details | צפייה בפרטים |
| Back | חזרה |
| Close | סגירה |
| Confirm | אישור |

## Booking / job fields

| English / field | Hebrew UI term | Notes |
|---|---|---|
| Booking ref / Job ref | מספר נסיעה | Display refs LTR, e.g. `JOB-000123` |
| Date/time | תאריך ושעה |  |
| Scheduled at | מועד הנסיעה |  |
| Return journey | נסיעת חזור |  |
| Pickup | איסוף |  |
| Pickup location | מקום איסוף |  |
| Pickup address | כתובת איסוף |  |
| Dropoff | הורדה |  |
| Dropoff location | יעד הורדה |  |
| Dropoff address | כתובת יעד |  |
| Route | מסלול |  |
| Common route | מסלול קבוע | For repeated routes |
| Price / Fare | מחיר נסיעה | Prefer מחיר נסיעה |
| Amount | סכום |  |
| Notes | הערות |  |
| Internal notes | הערות פנימיות |  |
| Driver notes | הערות לנהג |  |
| Special requirements | דרישות מיוחדות |  |
| Accessibility notes | הערות נגישות |  |
| Payment method | אמצעי תשלום |  |
| Payment status | סטטוס תשלום |  |
| Receipt status | סטטוס קבלה |  |
| Created at | נוצר בתאריך |  |
| Updated at | עודכן בתאריך |  |
| Completed at | הושלם בתאריך |  |
| Cancelled at | בוטל בתאריך |  |

## Job statuses

| Internal value | Hebrew UI term |
|---|---|
| draft | טיוטה |
| pending | ממתינה |
| assigned | שובצה |
| en_route | בדרך לאיסוף |
| picked_up | נאסף |
| in_progress | בתהליך |
| completed | הושלמה |
| cancelled | בוטלה |
| no_show | אי-הגעה |

Recommended MVP status set if simplifying:
- `pending` → ממתינה
- `assigned` → שובצה
- `in_progress` → בתהליך
- `completed` → הושלמה
- `cancelled` → בוטלה
- `no_show` → אי-הגעה

## Payment statuses and methods

| English / value | Hebrew UI term |
|---|---|
| unpaid | לא שולם |
| partial | שולם חלקית |
| paid | שולם |
| refunded | הוחזר |
| write_off | נמחק כחוב |
| cash | מזומן |
| card | כרטיס אשראי |
| bank_transfer | העברה בנקאית |
| account | חשבון לקוח |
| other | אחר |
| pending | בהמתנה |
| received | התקבל |
| failed | נכשל |

## Receipt terms

| English / concept | Hebrew UI term | Notes |
|---|---|---|
| Receipt number | מספר קבלה | Number/ref displayed LTR if mixed |
| Issue date | תאריך הפקה |  |
| Bill to | לכבוד | Common receipt label |
| Journey details | פרטי הנסיעה |  |
| Subtotal | סכום ביניים |  |
| Tax / VAT | מע״מ | Only show if configured/confirmed |
| Total | סה״כ |  |
| Total paid | סה״כ שולם |  |
| Balance due | יתרה לתשלום |  |
| Payment reference | אסמכתת תשלום |  |
| Draft | טיוטה |  |
| Generated | הופקה |  |
| Sent | נשלחה |  |
| Void | מבוטלת |  |
| Thank you | תודה רבה | Optional footer |

Important: use `קבלה`, not `חשבונית`, unless Gad confirms tax invoice/legal invoicing requirements.

## Filters / summaries

| English / concept | Hebrew UI term |
|---|---|
| Date range | טווח תאריכים |
| From date | מתאריך |
| To date | עד תאריך |
| Status | סטטוס |
| All statuses | כל הסטטוסים |
| All clients | כל הלקוחות |
| All drivers | כל הנהגים |
| Free text search | חיפוש חופשי |
| Today’s jobs | הנסיעות של היום |
| Pending jobs | נסיעות ממתינות |
| Assigned jobs | נסיעות ששובצו |
| Completed jobs | נסיעות שהושלמו |
| Unpaid jobs | נסיעות שלא שולמו |
| Revenue | הכנסות |
| Outstanding | יתרה פתוחה |
| No results | לא נמצאו תוצאות |
| No jobs yet | עדיין אין נסיעות |

## Export column headings

Use Hebrew headings in normal user CSV exports:

| English column | Hebrew heading |
|---|---|
| Booking ref | מספר נסיעה |
| Scheduled date/time | מועד הנסיעה |
| Client name | שם לקוח |
| Passenger name | שם נוסע |
| Pickup | איסוף |
| Dropoff | יעד |
| Driver | נהג |
| Vehicle | רכב |
| Status | סטטוס |
| Price | מחיר |
| Payment method | אמצעי תשלום |
| Payment status | סטטוס תשלום |
| Receipt number | מספר קבלה |
| Receipt status | סטטוס קבלה |
| Notes | הערות |

## Empty states and validation examples

Use natural Hebrew, not literal translations.

| Scenario | Hebrew copy |
|---|---|
| Empty jobs list | עדיין אין נסיעות להצגה. אפשר ליצור נסיעה חדשה כדי להתחיל. |
| No filtered results | לא נמצאו נסיעות שתואמות לסינון הנוכחי. |
| Required client | יש לבחור לקוח. |
| Required pickup | יש להזין מקום איסוף. |
| Required dropoff | יש להזין יעד הורדה. |
| Required scheduled time | יש לבחור תאריך ושעה לנסיעה. |
| Save success | השינויים נשמרו בהצלחה. |
| Receipt generated | הקבלה הופקה בהצלחה. |
| Export ready | קובץ הייצוא מוכן להורדה. |
| Generic error | משהו השתבש. כדאי לנסות שוב בעוד רגע. |

## RTL / mixed-direction implementation notes

- Wrap job refs, receipt numbers, phone numbers, email addresses, vehicle registrations, and URLs in an LTR span, e.g. `<span dir="ltr">JOB-000123</span>`.
- Keep tables RTL, but numeric/ref columns may use `dir="ltr"` and `text-align: left` if readability is better.
- Use `margin-inline-start/end`, `padding-inline-start/end`, and logical CSS properties where possible.
- Avoid left/right hardcoding except where intentionally visual.
- In Hebrew sentences containing English IDs, use isolation (`<bdi>...</bdi>`) or `dir="ltr"` spans to prevent punctuation flipping.
- Check print receipt layout separately; browser print CSS often exposes RTL bugs.

## Seed data suggestions

Use realistic Hebrew demo data:

- לקוח: בית אבות נווה הדר
- נוסע: יעקב כהן
- איסוף: רחוב הרצל 12, תל אביב
- יעד: המרכז הרפואי איכילוב, תל אביב
- נהג: אבי לוי
- רכב: מאזדה 5, registration displayed LTR: `12-345-67`
- מחיר נסיעה: ₪120.00
- סטטוס: הושלמה
- סטטוס תשלום: שולם

Repeated routes for route-learning demo:
- רחוב הרצל 12, תל אביב → המרכז הרפואי איכילוב, תל אביב
- בית אבות נווה הדר → קופת חולים כללית, רמת גן
- תחנת רכבת סבידור מרכז → נמל התעופה בן גוריון
