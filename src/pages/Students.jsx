import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';

const mockStudents = Array.from({ length: 12 }).map((_, i) => ({
  id: `STU-00${i + 1}`,
  name: `Student Name ${i + 1}`,
  grade: `Grade ${Math.floor(Math.random() * 12) + 1}`,
  email: `student${i + 1}@example.com`,
  phone: `+1 555 010${i}`,
  status: Math.random() > 0.2 ? 'Active' : 'Inactive',
  joinedDate: '2023-09-01',
}));

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredStudents = mockStudents.filter(
    (student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Students</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage all student records and details.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors">
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 font-medium">Student Info</th>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Grade</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 rounded-md hover:bg-yellow-50 dark:hover:bg-yellow-900/20" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
            <div className="text-slate-500 dark:text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
            </div>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 rounded-md ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
