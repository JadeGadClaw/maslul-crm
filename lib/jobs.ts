export type VehicleType = '5-seater' | '7-seater' | 'van' | 'truck';
export type PaymentStatus = 'unpaid' | 'deposit' | 'paid' | 'invoice';
export type ReceiptStatus = 'not sent' | 'sent' | 'printed';

export type Job = {
  id: string;
  date: string;
  time: string;
  vehicleType: VehicleType;
  workType: string;
  driver: string;
  takenBy: string;
  client: string;
  company: string;
  from: string;
  to: string;
  region: string;
  price: number;
  paymentStatus: PaymentStatus;
  receiptStatus: ReceiptStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export const vehicleTypes: VehicleType[] = ['5-seater', '7-seater', 'van', 'truck'];
export const paymentStatuses: PaymentStatus[] = ['unpaid', 'deposit', 'paid', 'invoice'];
export const receiptStatuses: ReceiptStatus[] = ['not sent', 'sent', 'printed'];

export const fixedLocations = [
  'נתב״ג טרמינל 3',
  'נמל חיפה',
  'נמל אשדוד',
  'תחנת רכבת סבידור מרכז',
  'ירושלים מרכז',
  'תל אביב מרכז',
  'אזור תעשייה חולון',
  'פארק תעשייה קיסריה',
  'מודיעין לוגיסטיקה',
  'באר שבע מרכז',
  'אילת נמל',
  'רמת החייל',
];

export const emptyJob = (): Job => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString().slice(0, 10),
  time: '09:00',
  vehicleType: '5-seater',
  workType: 'הסעה לשדה תעופה',
  driver: '',
  takenBy: '',
  client: '',
  company: '',
  from: '',
  to: '',
  region: 'London',
  price: 0,
  paymentStatus: 'unpaid',
  receiptStatus: 'not sent',
  notes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const seedJobs: Job[] = [
  {
    id: 'seed-001', date: '2026-05-10', time: '07:30', vehicleType: '7-seater', workType: 'הסעה לשדה תעופה', driver: 'סמיר', takenBy: 'איילה', client: 'רחל גרין', company: 'גרין אירועים בע״מ', from: 'נתב״ג טרמינל 3', to: 'תל אביב מרכז', region: 'מרכז', price: 145, paymentStatus: 'paid', receiptStatus: 'sent', notes: 'איסוף מאולם מקבלי הפנים, נדרש כיסא ילד.', createdAt: '2026-05-10T07:00:00.000Z', updatedAt: '2026-05-10T07:00:00.000Z',
  },
  {
    id: 'seed-002', date: '2026-05-10', time: '11:00', vehicleType: 'van', workType: 'שליחות / הובלה קלה', driver: 'מוחמד', takenBy: 'גד', client: 'יוסי לוי', company: 'מטבחי לוי', from: 'אזור תעשייה חולון', to: 'מודיעין לוגיסטיקה', region: 'מרכז', price: 320, paymentStatus: 'invoice', receiptStatus: 'not sent', notes: 'נדרשים שני אנשים בפריקה.', createdAt: '2026-05-09T18:00:00.000Z', updatedAt: '2026-05-09T18:00:00.000Z',
  },
  {
    id: 'seed-003', date: '2026-05-11', time: '15:45', vehicleType: '5-seater', workType: 'איסוף מנהלים', driver: 'איברהים', takenBy: 'איילה', client: 'נדיה כהן', company: 'כהן ושות׳', from: 'תחנת רכבת סבידור מרכז', to: 'נתב״ג טרמינל 3', region: 'מרכז', price: 175, paymentStatus: 'deposit', receiptStatus: 'printed', notes: 'הלקוחה מעדיפה עדכונים בוואטסאפ.', createdAt: '2026-05-08T12:00:00.000Z', updatedAt: '2026-05-08T12:00:00.000Z',
  },
  {
    id: 'seed-004', date: '2026-04-29', time: '06:00', vehicleType: 'truck', workType: 'הובלת משטחים', driver: 'כרים', takenBy: 'גד', client: 'מוקד תפעול', company: 'נורת׳ליין שילוח', from: 'נמל חיפה', to: 'באר שבע מרכז', region: 'דרום', price: 920, paymentStatus: 'paid', receiptStatus: 'sent', notes: 'רמפה הידראולית מאושרת.', createdAt: '2026-04-28T15:00:00.000Z', updatedAt: '2026-04-28T15:00:00.000Z',
  },
  {
    id: 'seed-005', date: '2026-01-18', time: '13:15', vehicleType: 'van', workType: 'העברת ציוד משרד', driver: 'מוחמד', takenBy: 'איילה', client: 'מנהלת משרד', company: 'סיטי סטודיו', from: 'רמת החייל', to: 'נמל אשדוד', region: 'דרום', price: 480, paymentStatus: 'paid', receiptStatus: 'sent', notes: 'שמיכות וראצ׳טים ברכב.', createdAt: '2026-01-17T10:00:00.000Z', updatedAt: '2026-01-17T10:00:00.000Z',
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(value || 0);
}

export function monthKey(date: string) {
  return date.slice(0, 7);
}

export function yearKey(date: string) {
  return date.slice(0, 4);
}
