import { useState, useMemo } from "react";
import DashboardLayout from "../components/DashboardLayout";

/* ── Helpers ───────────────────────────────────────────────────── */
const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const emptyItem = () => ({ id: Date.now(), description: "", qty: 1, rate: 0 });

const I = ({ d, size = 18, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);

export default function CreateInvoice() {
  /* ── Client info ────────────────────────────────────────────── */
  const [client, setClient] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  /* ── Invoice meta ───────────────────────────────────────────── */
  const [invoiceNumber, setInvoiceNumber] = useState("INV-007");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  /* ── Line items ─────────────────────────────────────────────── */
  const [items, setItems] = useState([emptyItem()]);
  const [taxRate, setTaxRate] = useState(0);

  const addItem = () => setItems([...items, emptyItem()]);
  const removeItem = (id) => items.length > 1 && setItems(items.filter((i) => i.id !== id));

  const updateItem = (id, field, value) => {
    setItems(items.map((i) =>
      i.id === id ? { ...i, [field]: field === "description" ? value : Number(value) || 0 } : i
    ));
  };

  /* ── Computed totals ────────────────────────────────────────── */
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.qty * i.rate, 0), [items]);
  const tax = useMemo(() => subtotal * (taxRate / 100), [subtotal, taxRate]);
  const total = subtotal + tax;

  /* ── Field component ────────────────────────────────────────── */
  const Field = ({ label, id, ...props }) => (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <input
        id={id}
        {...props}
        className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition-all duration-200"
      />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Create Invoice</h1>
          <p className="text-slate-500 text-sm mt-1">Fill in the details to generate a new invoice.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* ════════════════════════════════════════════════════
              LEFT — Form (3 cols)
             ════════════════════════════════════════════════════ */}
          <div className="xl:col-span-3 space-y-6">

            {/* ── Invoice Details ──────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <I d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cls="text-brand-500" />
                Invoice Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Invoice #" id="invoice-number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                <Field label="Date" id="invoice-date" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                <Field label="Due Date" id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>

            {/* ── Client Info ──────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <I d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" cls="text-brand-500" />
                Client Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Client Name" id="client-name" placeholder="Acme Corp" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
                <Field label="Email" id="client-email" type="email" placeholder="billing@acme.com" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
                <Field label="Phone" id="client-phone" placeholder="+1 234 567 890" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
                <Field label="Address" id="client-address" placeholder="123 Main St, City" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
              </div>
            </div>

            {/* ── Line Items ───────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <I d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" cls="text-brand-500" />
                Items
              </h2>

              {/* Column headers (desktop) */}
              <div className="hidden sm:grid grid-cols-[1fr_80px_100px_100px_40px] gap-3 mb-2 px-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Qty</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rate ($)</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Total</span>
                <span />
              </div>

              {/* Rows */}
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_100px_40px] gap-3 items-start bg-slate-50/50 rounded-xl p-3 sm:p-2 sm:bg-transparent sm:rounded-none border sm:border-0 border-slate-100">
                    {/* Description */}
                    <div>
                      <label className="text-xs text-slate-400 sm:hidden mb-1 block">Description</label>
                      <input
                        id={`item-desc-${idx}`}
                        placeholder="Service / Product"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition"
                      />
                    </div>
                    {/* Qty */}
                    <div>
                      <label className="text-xs text-slate-400 sm:hidden mb-1 block">Qty</label>
                      <input
                        id={`item-qty-${idx}`}
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition"
                      />
                    </div>
                    {/* Rate */}
                    <div>
                      <label className="text-xs text-slate-400 sm:hidden mb-1 block">Rate ($)</label>
                      <input
                        id={`item-rate-${idx}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate || ""}
                        onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                        placeholder="0.00"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition"
                      />
                    </div>
                    {/* Line total */}
                    <div className="flex items-center sm:justify-end">
                      <label className="text-xs text-slate-400 sm:hidden mr-2">Total:</label>
                      <span className="text-sm font-semibold text-slate-700">${fmt(item.qty * item.rate)}</span>
                    </div>
                    {/* Remove */}
                    <div className="flex items-center justify-end sm:justify-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Remove item"
                      >
                        <I d="M18 6L6 18M6 6l12 12" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add item button */}
              <button
                id="add-item-btn"
                onClick={addItem}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-200 text-sm font-medium text-slate-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/30 transition-all duration-200 w-full justify-center"
              >
                <I d="M12 5v14M5 12h14" size={16} />
                Add Item
              </button>
            </div>

            {/* ── Tax & Notes ──────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-semibold text-slate-700 mb-3">Tax Rate</h2>
                <div className="flex items-center gap-2">
                  <input
                    id="tax-rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={taxRate || ""}
                    onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition"
                  />
                  <span className="text-sm text-slate-500 font-medium">%</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-semibold text-slate-700 mb-3">Notes</h2>
                <textarea
                  id="invoice-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Payment terms, thank you message…"
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT — Live Preview (2 cols)
             ════════════════════════════════════════════════════ */}
          <div className="xl:col-span-2">
            <div className="xl:sticky xl:top-24">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Preview header band */}
                <div className="bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">INVOICE</h3>
                      <p className="text-white/70 text-sm mt-0.5">{invoiceNumber || "INV-000"}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-white/70">Date: {invoiceDate || "—"}</p>
                      <p className="text-white/70">Due: {dueDate || "—"}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Client */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Bill To</p>
                    <p className="text-sm font-semibold text-slate-700">{client.name || "Client Name"}</p>
                    <p className="text-sm text-slate-500">{client.email || "client@email.com"}</p>
                    {client.phone && <p className="text-sm text-slate-500">{client.phone}</p>}
                    {client.address && <p className="text-sm text-slate-500">{client.address}</p>}
                  </div>

                  {/* Items table */}
                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          <th className="px-4 py-2.5 text-left">Item</th>
                          <th className="px-3 py-2.5 text-center w-14">Qty</th>
                          <th className="px-3 py-2.5 text-right w-20">Rate</th>
                          <th className="px-4 py-2.5 text-right w-24">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 text-slate-700">{item.description || "—"}</td>
                            <td className="px-3 py-3 text-center text-slate-600">{item.qty}</td>
                            <td className="px-3 py-3 text-right text-slate-600">${fmt(item.rate)}</td>
                            <td className="px-4 py-3 text-right font-semibold text-slate-700">${fmt(item.qty * item.rate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="text-slate-700 font-medium">${fmt(subtotal)}</span>
                    </div>
                    {taxRate > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Tax ({taxRate}%)</span>
                        <span className="text-slate-700 font-medium">${fmt(tax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-100">
                      <span className="text-slate-800">Total</span>
                      <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent text-lg">
                        ${fmt(total)}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {notes && (
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
                      <p className="text-sm text-slate-500 whitespace-pre-wrap">{notes}</p>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    id="save-invoice-btn"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-md shadow-brand-500/25 hover:shadow-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-300 active:scale-[0.98]"
                  >
                    Save Invoice
                  </button>
                  <button
                    id="download-pdf-btn"
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-200"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
