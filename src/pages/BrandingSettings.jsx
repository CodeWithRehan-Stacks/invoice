import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function BrandingSettings() {
  const [branding, setBranding] = useState(() => {
    const saved = localStorage.getItem("invoice_branding");
    return saved ? JSON.parse(saved) : {
      companyName: "My Company",
      themeColor: "#6366f1",
      currency: "PKR",
      footerText: "Thank you for your business. Payment is due within 30 days.",
      bankDetails: "Bank: Meezan Bank\nAccount: 1234567890\nTitle: My Company",
    };
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("invoice_branding", JSON.stringify(branding));
  }, [branding]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Company Branding</h1>
          <p className="text-slate-500 text-sm mt-1">Customize how your invoices appear to clients.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-2 text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Branding settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2">General</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Name</label>
                <input value={branding.companyName} onChange={e => setBranding({...branding, companyName: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Currency</label>
                <select value={branding.currency} onChange={e => setBranding({...branding, currency: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none">
                  <option value="PKR">PKR (₨)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Theme Color</label>
              <div className="flex items-center gap-3 mt-1.5">
                <input type="color" value={branding.themeColor} onChange={e => setBranding({...branding, themeColor: e.target.value})} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <input type="text" value={branding.themeColor} onChange={e => setBranding({...branding, themeColor: e.target.value})} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm w-32" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-700 border-b border-slate-100 pb-2">Invoice Footer</h2>
            
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bank Details / Payment Instructions</label>
              <textarea rows={3} value={branding.bankDetails} onChange={e => setBranding({...branding, bankDetails: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 outline-none resize-none" placeholder="e.g., EasyPaisa: 0300-1234567" />
              <p className="text-xs text-slate-400 mt-1">These details will be embedded in the QR Code for quick payment.</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Footer Message</label>
              <input value={branding.footerText} onChange={e => setBranding({...branding, footerText: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/20 outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition shadow-md">
            Save Branding Preferences
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
