import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Plus, FileText, Download, MoreVertical, Filter } from 'lucide-react';

const mockInvoices = Array.from({ length: 15 }).map((_, i) => ({
  id: `INV-2026-${String(i + 1).padStart(3, '0')}`,
  studentName: `Student Name ${i + 1}`,
  date: '2026-05-04',
  dueDate: i % 4 === 0 ? '2026-04-30' : '2026-05-15',
  amount: (Math.random() * 500 + 50).toFixed(2),
  status: i % 4 === 0 ? 'Overdue' : i % 3 === 0 ? 'Pending' : 'Paid',
}));

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Invoices</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage fee invoices and payments.</p>
        </div>
        <Link to="/dashboard/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors">
          <Plus size={18} />
          Create Invoice
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-4 flex-col sm:flex-row">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search invoice or student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="relative min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-10 pr-8 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download size={18} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 font-medium">Invoice Number</th>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Issue Date</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-slate-400" />
                      <span className="font-semibold text-slate-800 dark:text-white">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {invoice.studentName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-white">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No invoices found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
