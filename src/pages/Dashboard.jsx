import { Users, FileText, CreditCard, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, students: 2400 },
  { name: 'Feb', revenue: 3000, students: 1398 },
  { name: 'Mar', revenue: 2000, students: 9800 },
  { name: 'Apr', revenue: 2780, students: 3908 },
  { name: 'May', revenue: 1890, students: 4800 },
  { name: 'Jun', revenue: 2390, students: 3800 },
  { name: 'Jul', revenue: 3490, students: 4300 },
];

export default function Dashboard() {
  const kpiCards = [
    { title: 'Total Students', value: '2,845', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30', trend: '+12%', trendUp: true },
    { title: 'Total Revenue', value: '$84,500', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', trend: '+8%', trendUp: true },
    { title: 'Pending Fees', value: '$12,300', icon: CreditCard, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30', trend: '-2%', trendUp: false },
    { title: 'Paid Fees', value: '$72,200', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: '+15%', trendUp: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                <card.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${card.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {card.trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.title}</h3>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Revenue Analytics</h3>
            <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Invoices / Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Invoices</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">INV-2026-00{i}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Student Name {i}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">$120.00</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${i % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {i % 2 === 0 ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
