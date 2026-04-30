import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";

const I = ({ d, size = 18, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);

export default function Customers() {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("invoice_customers");
    return saved ? JSON.parse(saved) : [
      { id: "1", name: "Acme Corp", email: "billing@acme.com", phone: "+1 234 567 8900", notes: "VIP Client" },
      { id: "2", name: "Globex Inc", email: "finance@globex.com", phone: "+1 987 654 3210", notes: "Net-30 terms" },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });

  useEffect(() => {
    localStorage.setItem("invoice_customers", JSON.stringify(customers));
  }, [customers]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", email: "", phone: "", notes: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (customer) => {
    setEditingId(customer.id);
    setFormData({ ...customer });
    setIsModalOpen(true);
  };

  const deleteCustomer = (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers(customers.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your clients and their billing details.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 transition-all duration-300 active:scale-[0.98]"
        >
          <I d="M12 5v14M5 12h14" size={18} />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm animate-fade-in overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4 hidden sm:table-cell">Notes</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-700">{c.name}</td>
                  <td className="px-5 py-4">
                    <p className="text-slate-600">{c.email}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{c.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-500 hidden sm:table-cell max-w-xs truncate">{c.notes || "—"}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => openEditModal(c)} className="p-1.5 text-slate-400 hover:text-brand-600 transition mr-2" title="Edit">
                      <I d="M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" size={16} />
                    </button>
                    <button onClick={() => deleteCustomer(c.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition" title="Delete">
                      <I d="M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    No customers found. Click "Add Customer" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingId ? "Edit Customer" : "Add Customer"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</label>
                <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
