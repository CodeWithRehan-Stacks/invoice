import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Calendar, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
  });

  const [items, setItems] = useState([
    { id: 1, description: 'Tuition Fee', quantity: 1, price: 500 },
  ]);

  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
    setTotal(newTotal);
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'Student selection is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (items.some((item) => !item.description || item.price <= 0)) {
      newErrors.items = 'All items must have a description and valid price';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // API Call would go here
      console.log('Submitting:', { ...formData, items, total });
      navigate('/invoices');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create Invoice</h2>
          <p className="text-slate-500 dark:text-slate-400">Generate a new fee invoice for a student.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/invoices')} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors">
            <Save size={18} />
            Save Invoice
          </button>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - Form Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-500" />
              Invoice Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Student *</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${errors.studentId ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
                >
                  <option value="">-- Choose Student --</option>
                  <option value="STU-001">Student Name 1</option>
                  <option value="STU-002">Student Name 2</option>
                </select>
                {errors.studentId && <p className="text-xs text-red-500 mt-1">{errors.studentId}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Invoice Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Due Date *</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${errors.dueDate ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}
                  />
                </div>
                {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Line Items
              </h3>
              <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-md transition-colors">
                <Plus size={16} /> Add Item
              </button>
            </div>
            
            {errors.items && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{errors.items}</div>}

            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 px-2">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-3 text-right">Price ($)</div>
                <div className="col-span-1"></div>
              </div>
              
              {items.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  key={item.id} 
                  className="grid grid-cols-12 gap-4 items-center bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700"
                >
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-white dark:hover:bg-slate-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Notes / Instructions</label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Payment terms, special instructions, etc."
              />
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-slate-800 rounded-xl shadow-sm border border-blue-100 dark:border-slate-700 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Summary</h3>
            
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-800 dark:text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span className="font-medium text-slate-800 dark:text-white">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-medium text-slate-800 dark:text-white">$0.00</span>
              </div>
              <div className="pt-3 border-t border-blue-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-base font-semibold text-slate-800 dark:text-white">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <button type="button" onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-sm transition-colors flex justify-center items-center gap-2">
                <Save size={18} />
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
