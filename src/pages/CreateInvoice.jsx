import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  Calendar,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateInvoice() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    notes: "",
  });

  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      description: "Tuition Fee",
      quantity: 1,
      price: 500,
    },
  ]);

  const [errors, setErrors] = useState({});

  // Optimize: Calculate total using useMemo instead of useEffect
  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0,
    );
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
    if (errors.items) setErrors((prev) => ({ ...prev, items: null }));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: "", quantity: 1, price: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = "Please select a student";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    if (formData.dueDate < formData.invoiceDate)
      newErrors.dueDate = "Due date cannot be before invoice date";

    const hasInvalidItems = items.some(
      (item) => !item.description.trim() || item.price < 0,
    );
    if (hasInvalidItems)
      newErrors.items = "All items need a description and valid price";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // API Logic here
      console.log("Final Payload:", { ...formData, items, total });
      navigate("/invoices");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            New Invoice
          </h2>
          <p className="text-slate-500">
            Draft a new fee statement for student billing.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => navigate("/invoices")}
            className="flex-1 md:flex-none px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            <Save size={18} />
            Save Invoice
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form className="lg:col-span-2 space-y-6">
          {/* Main Details Card */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <User className="text-blue-500" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Recipient Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Student
                </label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border transition-all focus:ring-4 ${
                    errors.studentId
                      ? "border-red-500 ring-red-500/10"
                      : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/10"
                  } bg-slate-50 dark:bg-slate-800`}
                >
                  <option value="">Select a student...</option>
                  <option value="STU-001">Alex Johnson (Grade 10)</option>
                  <option value="STU-002">Sarah Williams (Grade 12)</option>
                </select>
                {errors.studentId && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.studentId}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Date
                  </label>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-xl border ${errors.dueDate ? "border-red-500" : "border-slate-200 dark:border-slate-700"} bg-slate-50 dark:bg-slate-800`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Items Card */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <FileText
                    className="text-blue-600 dark:text-blue-400"
                    size={20}
                  />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Line Items
                </h3>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            {/* Desktop Header Labels */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-4 mb-2">
              <div className="col-span-6 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Description
              </div>
              <div className="col-span-2 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-center">
                Qty
              </div>
              <div className="col-span-3 text-[11px] uppercase tracking-wider font-bold text-slate-400 text-right">
                Unit Price
              </div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                    key={item.id}
                    className="group relative grid grid-cols-12 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
                  >
                    {/* Description */}
                    <div className="col-span-12 md:col-span-6 space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 md:hidden">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Monthly Tuition Fee"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "description",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="col-span-4 md:col-span-2 space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 md:hidden">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(item.id, "quantity", e.target.value)
                        }
                        className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl text-center focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                      />
                    </div>

                    {/* Price */}
                    <div className="col-span-5 md:col-span-3 space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 md:hidden">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                          $
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(item.id, "price", e.target.value)
                          }
                          className="w-full pl-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl text-right focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Delete Action */}
                    <div className="col-span-3 md:col-span-1 flex items-end md:items-center justify-end">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all disabled:opacity-0 disabled:pointer-events-none"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {errors.items && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium text-red-500 mt-2 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-red-500" />{" "}
                  {errors.items}
                </motion.p>
              )}
            </div>

            {/* Notes Section */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Additional Notes
                </label>
                <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  Optional
                </span>
              </div>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                placeholder="e.g. Please include student roll number in bank transfer memo..."
              />
            </div>
          </section>
        </form>

        {/* Summary Sidebar */}
        <aside className="space-y-6">
          <div className="bg-slate-900 dark:bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 sticky top-6">
            <h3 className="text-lg font-bold mb-6 opacity-90">
              Invoice Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm opacity-80">
                <span>Subtotal</span>
                <span>
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-60 font-bold">
                    Total Amount
                  </p>
                  <p className="text-3xl font-black">
                    $
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors mt-4 shadow-lg shadow-black/10"
              >
                Generate & Send
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
