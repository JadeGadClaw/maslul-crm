'use client';

import { useEffect, useMemo, useState } from 'react';
import { emptyJob, fixedLocations, formatCurrency, monthKey, paymentStatuses, receiptStatuses, seedJobs, vehicleTypes, yearKey, type Job } from '@/lib/jobs';

type Filters = { q: string; date: string; company: string; driver: string; vehicleType: string; region: string; month: string; year: string };
const storageKey = 'maslul-crm.jobs.v1';
const authKey = 'maslul-crm.auth.v1';
const demoPin = 'admin123';
const vehicleLabels: Record<Job['vehicleType'], string> = { '5-seater': 'רכב 5 מקומות', '7-seater': 'רכב 7 מקומות', van: 'ואן', truck: 'משאית' };
const paymentLabels: Record<Job['paymentStatus'], string> = { unpaid: 'לא שולם', deposit: 'מקדמה', paid: 'שולם', invoice: 'חשבון לקוח' };
const receiptLabels: Record<Job['receiptStatus'], string> = { 'not sent': 'לא נשלחה', sent: 'נשלחה', printed: 'הודפסה' };
const initialFilters: Filters = { q: '', date: '', company: '', driver: '', vehicleType: '', region: '', month: '', year: '' };

function unique(values: Array<string | undefined>) { return Array.from(new Set(values.map((v) => (v || '').trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'he')); }
function toCsvValue(value: unknown) { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; }
function isJob(value: unknown): value is Job { return Boolean(value && typeof value === 'object' && 'id' in value && 'date' in value && 'time' in value && 'from' in value && 'to' in value); }
function parseSavedJobs(raw: string | null) {
  if (!raw) return seedJobs;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isJob) ? parsed : seedJobs;
  } catch {
    return seedJobs;
  }
}
const israelDateFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' });
const israelMonthFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit' });
const israelYearFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric' });
function formatterPart(formatter: Intl.DateTimeFormat, date: Date, type: Intl.DateTimeFormatPartTypes) { return formatter.formatToParts(date).find((part) => part.type === type)?.value || ''; }
function israelDateKey(date = new Date()) { return `${formatterPart(israelDateFormatter, date, 'year')}-${formatterPart(israelDateFormatter, date, 'month')}-${formatterPart(israelDateFormatter, date, 'day')}`; }
function israelMonthKey(date = new Date()) { return `${formatterPart(israelMonthFormatter, date, 'year')}-${formatterPart(israelMonthFormatter, date, 'month')}`; }
function israelYearKey(date = new Date()) { return formatterPart(israelYearFormatter, date, 'year'); }
function sameDay(date: string, target = new Date()) { return date === israelDateKey(target); }
function formatDate(date: string) { return new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem' }).format(new Date(`${date}T12:00:00`)); }

function JobForm({ draft, setDraft, onSave, onReset, locationOptions }: { draft: Job; setDraft: (job: Job) => void; onSave: () => void; onReset: () => void; locationOptions: string[] }) {
  const update = <K extends keyof Job>(key: K, value: Job[K]) => setDraft({ ...draft, [key]: value, updatedAt: new Date().toISOString() });
  return <section className="panel job-form">
    <div className="section-head"><div><p className="eyebrow">רישום נסיעה</p><h2>{draft.createdAt === draft.updatedAt ? 'הוספה / עריכת נסיעה' : 'עריכת נסיעה'}</h2></div><button type="button" onClick={onReset}>נסיעה חדשה</button></div>
    <div className="form-grid">
      <label>תאריך<input type="date" value={draft.date} onChange={(e) => update('date', e.target.value)} /></label>
      <label>שעה<input type="time" value={draft.time} onChange={(e) => update('time', e.target.value)} /></label>
      <label>רכב<select value={draft.vehicleType} onChange={(e) => update('vehicleType', e.target.value as Job['vehicleType'])}>{vehicleTypes.map((v) => <option key={v} value={v}>{vehicleLabels[v]}</option>)}</select></label>
      <label>סוג עבודה<input value={draft.workType} onChange={(e) => update('workType', e.target.value)} placeholder="הסעה לשדה, הובלה, שליחות…" /></label>
      <label>נהג<input value={draft.driver} onChange={(e) => update('driver', e.target.value)} placeholder="שם נהג" /></label>
      <label>נלקח ע״י<input value={draft.takenBy} onChange={(e) => update('takenBy', e.target.value)} placeholder="מוקדן / מנהל" /></label>
      <label>לקוח<input value={draft.client} onChange={(e) => update('client', e.target.value)} placeholder="שם לקוח / נוסע" /></label>
      <label>חברה<input value={draft.company} onChange={(e) => update('company', e.target.value)} placeholder="חברה / חשבון לקוח" /></label>
      <label>מקום איסוף<input list="locations" value={draft.from} onChange={(e) => update('from', e.target.value)} placeholder="כתובת איסוף" /></label>
      <label>יעד הורדה<input list="locations" value={draft.to} onChange={(e) => update('to', e.target.value)} placeholder="כתובת יעד" /></label>
      <label>אזור<input value={draft.region} onChange={(e) => update('region', e.target.value)} placeholder="מרכז, דרום, צפון…" /></label>
      <label>מחיר נסיעה<input type="number" min="0" step="0.01" value={draft.price} onChange={(e) => update('price', Number(e.target.value))} /></label>
      <label>סטטוס תשלום<select value={draft.paymentStatus} onChange={(e) => update('paymentStatus', e.target.value as Job['paymentStatus'])}>{paymentStatuses.map((v) => <option key={v} value={v}>{paymentLabels[v]}</option>)}</select></label>
      <label>סטטוס קבלה<select value={draft.receiptStatus} onChange={(e) => update('receiptStatus', e.target.value as Job['receiptStatus'])}>{receiptStatuses.map((v) => <option key={v} value={v}>{receiptLabels[v]}</option>)}</select></label>
      <label className="wide">הערות<textarea value={draft.notes} onChange={(e) => update('notes', e.target.value)} placeholder="הנחיות מיוחדות, מספר הזמנה, מספר נוסעים…" /></label>
      <datalist id="locations">{locationOptions.map((loc) => <option value={loc} key={loc} />)}</datalist>
    </div>
    <button className="primary" type="button" onClick={onSave}>שמירת נסיעה</button>
  </section>;
}

function Summary({ jobs }: { jobs: Job[] }) {
  const now = new Date();
  const today = jobs.filter((j) => sameDay(j.date, now));
  const thisMonth = jobs.filter((j) => monthKey(j.date) === israelMonthKey(now));
  const thisYear = jobs.filter((j) => yearKey(j.date) === israelYearKey(now));
  const unpaidTotal = jobs.filter((j) => j.paymentStatus === 'unpaid' || j.paymentStatus === 'deposit').reduce((s, j) => s + j.price, 0);
  const receiptsTodo = jobs.filter((j) => j.receiptStatus === 'not sent').length;
  const countByVehicle = vehicleTypes.map((type) => ({ type, count: jobs.filter((j) => j.vehicleType === type).length }));
  const topClients = Object.entries(jobs.reduce<Record<string, number>>((acc, job) => { const key = job.company || job.client || 'לא ידוע'; acc[key] = (acc[key] || 0) + job.price; return acc; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const topRoutes = Object.entries(jobs.reduce<Record<string, number>>((acc, job) => { const key = `מ־${job.from} אל ${job.to}`; acc[key] = (acc[key] || 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 4);
  return <section className="summary-grid">
    <div className="metric"><span>היום</span><strong>{formatCurrency(today.reduce((s, j) => s + j.price, 0))}</strong><em>{today.length} נסיעות</em></div>
    <div className="metric"><span>החודש</span><strong>{formatCurrency(thisMonth.reduce((s, j) => s + j.price, 0))}</strong><em>{thisMonth.length} נסיעות</em></div>
    <div className="metric"><span>השנה</span><strong>{formatCurrency(thisYear.reduce((s, j) => s + j.price, 0))}</strong><em>{thisYear.length} נסיעות</em></div>
    <div className="metric metric-alert"><span>פתוח לגבייה</span><strong>{formatCurrency(unpaidTotal)}</strong><em>{receiptsTodo} קבלות לטיפול</em></div>
    <div className="panel mini"><p className="eyebrow">חלוקה לפי רכבים</p>{countByVehicle.map((row) => <div className="bar-row" key={row.type}><span>{vehicleLabels[row.type]}</span><b>{row.count}</b></div>)}</div>
    <div className="panel mini"><p className="eyebrow">לקוחות מובילים</p>{topClients.map(([name, value]) => <div className="bar-row" key={name}><span>{name}</span><b>{formatCurrency(value)}</b></div>)}</div>
    <div className="panel mini"><p className="eyebrow">מסלולים נפוצים</p>{topRoutes.map(([route, count]) => <div className="bar-row" key={route}><span>{route}</span><b>{count}</b></div>)}</div>
  </section>;
}

function Receipt({ job }: { job: Job | null }) {
  if (!job) return <section className="panel receipt"><p className="eyebrow">קבלה</p><h2>בחר נסיעה</h2><p className="muted">בחר שורה ביומן כדי להפיק קבלה פשוטה ללקוח או להנהלת חשבונות.</p></section>;
  return <section className="panel receipt" id="receipt-template">
    <div className="receipt-top"><div><p className="eyebrow">מסלול CRM</p><h2>קבלה לנסיעה</h2></div><strong>{formatCurrency(job.price)}</strong></div>
    <dl><dt>מספר נסיעה</dt><dd dir="ltr">{job.id}</dd><dt>תאריך ושעה</dt><dd>{formatDate(job.date)} · {job.time}</dd><dt>לכבוד</dt><dd>{job.client || '—'} / {job.company || '—'}</dd><dt>מסלול</dt><dd>מ־{job.from} אל {job.to}</dd><dt>רכב / עבודה</dt><dd>{vehicleLabels[job.vehicleType]} · {job.workType}</dd><dt>נהג</dt><dd>{job.driver || '—'}</dd><dt>סטטוס תשלום</dt><dd>{paymentLabels[job.paymentStatus]}</dd><dt>הערות</dt><dd>{job.notes || '—'}</dd></dl>
    <button type="button" onClick={() => window.print()}>הדפסת קבלה</button>
  </section>;
}

export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [notice, setNotice] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [draft, setDraft] = useState<Job>(() => emptyJob());
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => { setAuthed(localStorage.getItem(authKey) === 'ok'); setJobs(parseSavedJobs(localStorage.getItem(storageKey))); }, []);
  useEffect(() => { if (jobs.length) localStorage.setItem(storageKey, JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { if (!notice) return; const timeout = window.setTimeout(() => setNotice(''), 2600); return () => window.clearTimeout(timeout); }, [notice]);

  const selectedJob = jobs.find((job) => job.id === selectedId) || null;
  const locationOptions = useMemo(() => unique([...fixedLocations, ...jobs.map((j) => j.from), ...jobs.map((j) => j.to)]), [jobs]);
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const haystack = `${job.id} ${job.client} ${job.company} ${job.from} ${job.to} ${job.driver} ${job.takenBy} ${job.region} ${job.notes} ${job.workType}`.toLowerCase();
    return (!filters.q || haystack.includes(filters.q.toLowerCase())) && (!filters.date || job.date === filters.date) && (!filters.company || job.company === filters.company) && (!filters.driver || job.driver === filters.driver) && (!filters.vehicleType || job.vehicleType === filters.vehicleType) && (!filters.region || job.region === filters.region) && (!filters.month || monthKey(job.date) === filters.month) && (!filters.year || yearKey(job.date) === filters.year);
  }).sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)), [jobs, filters]);

  const filteredTotal = filteredJobs.reduce((sum, job) => sum + job.price, 0);
  const urgentJobs = filteredJobs.filter((job) => job.paymentStatus !== 'paid' || job.receiptStatus === 'not sent').length;

  function login(e: React.FormEvent) { e.preventDefault(); if (pin === demoPin) { localStorage.setItem(authKey, 'ok'); setAuthed(true); setLoginError(''); } else { setLoginError('קוד הכניסה שגוי. בדמו: admin123'); } }
  function saveJob() {
    if (!draft.date || !draft.time || !draft.from.trim() || !draft.to.trim()) { alert('יש למלא תאריך, שעה, מקום איסוף ויעד הורדה לפני שמירה.'); return; }
    const next = { ...draft, updatedAt: new Date().toISOString(), price: Number(draft.price) || 0 };
    setJobs((current) => current.some((job) => job.id === next.id) ? current.map((job) => job.id === next.id ? next : job) : [next, ...current]); setSelectedId(next.id); setDraft(emptyJob()); setNotice('הנסיעה נשמרה ביומן');
  }
  function editJob(job: Job) { setDraft(job); setSelectedId(job.id); }
  function deleteJob(id: string) { if (confirm('למחוק את הנסיעה?')) setJobs((current) => current.filter((job) => job.id !== id)); }
  function resetData() { if (confirm('לאפס נתוני דמו? פעולה זו תמחק שינויים מקומיים.')) { setJobs(seedJobs); setDraft(emptyJob()); setSelectedId(''); } }
  function exportCsv() {
    const columns: Array<[keyof Job, string, (job: Job) => unknown]> = [['id', 'מספר נסיעה', (j) => j.id], ['date', 'תאריך', (j) => j.date], ['time', 'שעה', (j) => j.time], ['client', 'שם לקוח', (j) => j.client], ['company', 'חברה', (j) => j.company], ['from', 'איסוף', (j) => j.from], ['to', 'יעד', (j) => j.to], ['driver', 'נהג', (j) => j.driver], ['takenBy', 'נלקח ע״י', (j) => j.takenBy], ['vehicleType', 'רכב', (j) => vehicleLabels[j.vehicleType]], ['workType', 'סוג עבודה', (j) => j.workType], ['region', 'אזור', (j) => j.region], ['price', 'מחיר', (j) => j.price], ['paymentStatus', 'סטטוס תשלום', (j) => paymentLabels[j.paymentStatus]], ['receiptStatus', 'סטטוס קבלה', (j) => receiptLabels[j.receiptStatus]], ['notes', 'הערות', (j) => j.notes]];
    const csv = [columns.map(([, label]) => toCsvValue(label)).join(','), ...filteredJobs.map((job) => columns.map(([, , getter]) => toCsvValue(getter(job))).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = `נסיעות-${israelDateKey()}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  if (!authed) return <main className="login"><form onSubmit={login} className="panel login-card"><p className="eyebrow">מסלול CRM — דמו</p><h1>יומן הסעות שעובד כמו מוקד אמיתי.</h1><p className="muted">כניסת מנהל מקומית לדמו. קוד כניסה: <code dir="ltr">admin123</code></p><input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="קוד מנהל" autoFocus aria-label="קוד מנהל" />{loginError ? <p className="error" role="alert">{loginError}</p> : null}<button className="primary">כניסה ליומן</button></form></main>;

  return <main className="shell">
    {notice ? <div className="toast" role="status">{notice}</div> : null}
    <header className="hero"><div><p className="eyebrow">מסלול CRM</p><h1>נסיעות, קבלות והכנסות ביומן אחד.</h1><p className="muted">דשבורד עברי ו־RTL להחלפת גיליון העבודה: תיעוד מהיר, סינון נקי, קבלות וייצוא לאקסל בלי רעש של מערכת TMS כבדה.</p></div><div className="actions"><button onClick={exportCsv}>ייצוא נתונים</button><button onClick={resetData}>איפוס נתוני דמו</button><button onClick={() => { localStorage.removeItem(authKey); setAuthed(false); }}>יציאה</button></div></header>
    <Summary jobs={jobs} />
    <section className="workspace"><JobForm draft={draft} setDraft={setDraft} onSave={saveJob} onReset={() => setDraft(emptyJob())} locationOptions={locationOptions} /><Receipt job={selectedJob} /></section>
    <section className="panel jobs-panel"><div className="section-head"><div><p className="eyebrow">יומן נסיעות</p><h2>{filteredJobs.length} נסיעות</h2></div><div className="ledger-kpis"><span>{formatCurrency(filteredTotal)} בסינון</span><span>{urgentJobs} לטיפול</span></div></div>
      <div className="filters"><input placeholder="חיפוש לקוח, מסלול, הערות…" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} /><input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} /><select value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })}><option value="">כל החברות</option>{unique(jobs.map((j) => j.company)).map((v) => <option key={v}>{v}</option>)}</select><select value={filters.driver} onChange={(e) => setFilters({ ...filters, driver: e.target.value })}><option value="">כל הנהגים</option>{unique(jobs.map((j) => j.driver)).map((v) => <option key={v}>{v}</option>)}</select><select value={filters.vehicleType} onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}><option value="">כל הרכבים</option>{vehicleTypes.map((v) => <option key={v} value={v}>{vehicleLabels[v]}</option>)}</select><select value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}><option value="">כל האזורים</option>{unique(jobs.map((j) => j.region)).map((v) => <option key={v}>{v}</option>)}</select><input type="month" value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })} /><select value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}><option value="">כל השנים</option>{unique(jobs.map((j) => yearKey(j.date))).map((v) => <option key={v}>{v}</option>)}</select><button onClick={() => setFilters(initialFilters)}>ניקוי סינון</button></div>
      <div className="table-wrap"><table><thead><tr><th>תאריך</th><th>לקוח / חברה</th><th>מסלול</th><th>רכב</th><th>נהג</th><th>מחיר</th><th>תשלום</th><th>קבלה</th><th></th></tr></thead><tbody>{filteredJobs.map((job) => <tr key={job.id} className={selectedId === job.id ? 'selected' : ''} onClick={() => setSelectedId(job.id)}><td><b>{formatDate(job.date)}</b><small>{job.time}</small></td><td><b>{job.client || '—'}</b><small>{job.company || 'ללא חברה'}</small></td><td><b>{job.from}</b><small>אל {job.to}</small></td><td>{vehicleLabels[job.vehicleType]}<small>{job.workType}</small></td><td>{job.driver || '—'}<small>נלקח ע״י {job.takenBy || '—'}</small></td><td><b>{formatCurrency(job.price)}</b></td><td><span className={`pill ${job.paymentStatus}`}>{paymentLabels[job.paymentStatus]}</span></td><td>{receiptLabels[job.receiptStatus]}</td><td><div className="row-actions"><button onClick={(e) => { e.stopPropagation(); editJob(job); }}>עריכה</button><button onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }}>מחיקה</button></div></td></tr>)}{filteredJobs.length === 0 ? <tr><td colSpan={9} className="empty-row">לא נמצאו נסיעות שתואמות לסינון הנוכחי.</td></tr> : null}</tbody></table></div>
    </section>
  </main>;
}
