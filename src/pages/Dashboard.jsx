import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

/* ── Inline icon helper ────────────────────────────────────────── */
const I = ({ d, size = 20, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);

/* ── Dummy data ────────────────────────────────────────────────── */
const recentInvoices = [
  { id: "INV-001", client: "Acme Corp", amount: 2500, status: "paid",    date: "Apr 28, 2026" },
  { id: "INV-002", client: "Globex Inc", amount: 1800, status: "pending", date: "Apr 25, 2026" },
  { id: "INV-003", client: "Stark Industries", amount: 4200, status: "paid", date: "Apr 22, 2026" },
  { id: "INV-004", client: "Wayne Enterprises", amount: 3100, status: "overdue", date: "Apr 18, 2026" },
  { id: "INV-005", client: "Umbrella Corp", amount: 950,  status: "paid",    date: "Apr 15, 2026" },
  { id: "INV-006", client: "Cyberdyne Systems", amount: 6700, status: "pending", date: "Apr 12, 2026" },
];

const statusStyles = {
  paid:    "bg-emerald-50 text-emerald-600 border-emerald-100",
  pending: "bg-amber-50 text-amber-600 border-amber-100",
  overdue: "bg-red-50 text-red-600 border-red-100",
};

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  const stats = [
    {
      label: "Total Invoices",
      value: "24",
      change: "+3 this month",
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
      color: "from-brand-500 to-brand-600",
      bgLight: "bg-brand-50",
      textColor: "text-brand-600",
    },
    {
      label: "Paid",
      value: "$12,450",
      change: "18 invoices",
      icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3",
      color: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Unpaid",
      value: "$4,320",
      change: "4 pending",
      icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Overdue",
      value: "$3,100",
      change: "2 invoices",
      icon: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
      color: "from-red-500 to-rose-500",
      bgLight: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  const filtered = filter === "all"
    ? recentInvoices
    : recentInvoices.filter((inv) => inv.status === filter);

  return (
    <DashboardLayout>
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back! Here's your invoicing overview.</p>
        </div>
        <Link
          to="/dashboard/create"
          id="create-invoice-cta"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:from-brand-600 hover:to-brand-700 transition-all duration-300 active:scale-[0.98] animate-pulse-glow sm:self-start"
        >
          <I d="M12 5v14M5 12h14" size={18} />
          Create New Invoice
        </Link>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8 stagger">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 animate-fade-in-up group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
                <p className={`text-xs mt-2 ${s.textColor} font-medium`}>{s.change}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl ${s.bgLight} flex items-center justify-center ${s.textColor} group-hover:scale-110 transition-transform duration-300`}>
                <I d={s.icon} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Invoices ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
        {/* Table header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Recent Invoices</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {["all", "paid", "pending", "overdue"].map((f) => (
              <button
                key={f}
                id={`filter-${f}`}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200
                  ${filter === f
                    ? "bg-brand-50 text-brand-600 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 sm:px-6 py-3 whitespace-nowrap">Invoice</th>
                <th className="px-4 sm:px-6 py-3 whitespace-nowrap">Client</th>
                <th className="px-4 sm:px-6 py-3 hidden sm:table-cell whitespace-nowrap">Date</th>
                <th className="px-4 sm:px-6 py-3 text-right whitespace-nowrap">Amount</th>
                <th className="px-4 sm:px-6 py-3 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-50/50 transition-colors duration-150 cursor-pointer group"
                >
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-700 group-hover:text-brand-600 transition-colors">
                      {inv.id}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-slate-600 whitespace-nowrap">{inv.client}</td>
                  <td className="px-4 sm:px-6 py-4 text-slate-400 hidden sm:table-cell whitespace-nowrap">{inv.date}</td>
                  <td className="px-4 sm:px-6 py-4 text-right font-semibold text-slate-700 whitespace-nowrap">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold capitalize border ${statusStyles[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No invoices found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="p-4 sm:px-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {filtered.length} of {recentInvoices.length} invoices</p>
          <Link to="/dashboard/create" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition">
            View all →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
