import {
  Users,
  FileText,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000, students: 2400 },
  { name: "Feb", revenue: 3000, students: 1398 },
  { name: "Mar", revenue: 5000, students: 9800 },
  { name: "Apr", revenue: 2780, students: 3908 },
  { name: "May", revenue: 4890, students: 4800 },
  { name: "Jun", revenue: 2390, students: 3800 },
  { name: "Jul", revenue: 3490, students: 4300 },
];

export default function Dashboard() {
  const kpiCards = [
    {
      title: "Total Students",
      value: "2,845",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Revenue",
      value: "$84,500",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Pending Fees",
      value: "$12,300",
      icon: CreditCard,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      trend: "-2%",
      trendUp: false,
    },
    {
      title: "Paid Fees",
      value: "$72,200",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      trend: "+15%",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Analytics summary for{" "}
            <span className="font-semibold text-blue-600">May 2026</span>
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
          Download Report <ArrowUpRight size={16} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon size={24} strokeWidth={2.5} />
              </div>
              <div
                className={`px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold ${card.trendUp ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : "bg-red-50 text-red-600 dark:bg-red-500/10"}`}
              >
                {card.trendUp ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {card.trend}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                {card.title}
              </h3>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 leading-none">
                {card.value}
              </p>
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
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Revenue Growth
              </h3>
              <p className="text-xs text-slate-500">
                Monthly breakdown of student fee collection
              </p>
            </div>
            <div className="flex gap-2">
              <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 dark:text-slate-200 appearance-none cursor-pointer hover:bg-slate-100">
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#f1f5f9"
                  className="dark:stroke-slate-800"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                  dx={-10}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  cursor={{
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    strokeDasharray: "5 5",
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                    backdropFilter: "blur(4px)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Invoices Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h3>
            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <MoreHorizontal size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${i % 2 === 0 ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600"}`}
                  >
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      INV-2026-00{i}
                    </p>
                    <p className="text-xs text-slate-500 font-medium italic">
                      May {10 + i}, 2026
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    $120.00
                  </p>
                  <span
                    className={`inline-block mt-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${i % 2 === 0 ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"}`}
                  >
                    {i % 2 === 0 ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-500/10 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
            View All Transactions
          </button>
        </motion.div>
      </div>
    </div>
  );
}
