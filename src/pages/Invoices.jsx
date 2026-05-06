import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  FileText,
  Download,
  MoreVertical,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
} from "lucide-react";

const mockInvoices = Array.from({ length: 15 }).map((_, i) => ({
  id: `INV-2026-${String(i + 1).padStart(3, "0")}`,
  studentName: `Student Name ${i + 1}`,
  date: "2026-05-04",
  dueDate: i % 4 === 0 ? "2026-04-30" : "2026-05-15",
  amount: parseFloat((Math.random() * 500 + 50).toFixed(2)),
  status: i % 4 === 0 ? "Overdue" : i % 3 === 0 ? "Pending" : "Paid",
}));

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  // Memoized filtered data for performance
  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Financial summary calculations
  const stats = useMemo(() => {
    return {
      total: filteredInvoices.reduce((acc, curr) => acc + curr.amount, 0),
      overdue: filteredInvoices.filter((i) => i.status === "Overdue").length,
      pending: filteredInvoices.filter((i) => i.status === "Pending").length,
    };
  }, [filteredInvoices]);

  const toggleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Billing & Invoices
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Streamline your school's financial records.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export
          </button>
          <Link
            to="/dashboard/create"
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            <Plus size={20} />
            Create New
          </Link>
        </div>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Filtered Total
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ${stats.total.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
            Overdue Count
          </p>
          <p className="text-2xl font-black text-red-600 mt-1">
            {stats.overdue} Invoices
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Awaiting Payment
          </p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {stats.pending}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row justify-between gap-4 items-center">
          <div className="flex flex-1 gap-3 w-full lg:max-w-2xl">
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search invoice # or student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {selectedInvoices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-xl border border-blue-100 dark:border-blue-800"
              >
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 px-2">
                  {selectedInvoices.length} Selected
                </span>
                <button
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="Delete Selected"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
                  title="Mark as Paid"
                >
                  <CheckCircle2 size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[11px] uppercase tracking-widest font-black border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedInvoices.length === filteredInvoices.length &&
                      filteredInvoices.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Timeline</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => toggleSelectOne(invoice.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <FileText size={14} />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {invoice.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {invoice.studentName}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                      Tuition Fee - May
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={12} /> Issued: {invoice.date}
                      </div>
                      <div
                        className={`flex items-center gap-1.5 font-semibold ${invoice.status === "Overdue" ? "text-red-500" : "text-slate-400"}`}
                      >
                        <AlertCircle size={12} /> Due: {invoice.dueDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      ${invoice.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
                <Search size={32} />
              </div>
              <p className="text-slate-500 font-bold">
                No results found for your search.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Sub-component for better organization
function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50",
    Pending:
      "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50",
    Overdue:
      "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50",
  };

  const Icons = {
    Paid: CheckCircle2,
    Pending: Clock,
    Overdue: AlertCircle,
  };

  const Icon = Icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border uppercase tracking-tighter ${styles[status]}`}
    >
      <Icon size={12} strokeWidth={3} />
      {status}
    </span>
  );
}
