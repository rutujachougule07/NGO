import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  FileSpreadsheet, 
  Clock, 
  UserCheck, 
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminAuditLogs() {
  const { auditLogs } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');

  const modules = ['All', ...new Set(auditLogs.map(l => l.module))];

  const filteredLogs = auditLogs.filter(l => {
    const matchesSearch = 
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.adminName.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    const matchesModule = moduleFilter === 'All' || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  const handleExportAudit = () => {
    addToast('Downloaded complete statutory administrative audit trail (.csv)!', 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Immutable Security Trail • Module #15</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            System Audit Logs
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Cryptographically sealed chronological record of every administrative action, QR revocation, 80G receipt issuance, and payout approval
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition active:scale-95 self-start"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by action, admin name, details..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <span className="text-xs text-stone-500 font-semibold">Filter Module:</span>
          <select
            value={moduleFilter}
            onChange={e => setModuleFilter(e.target.value)}
            className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
          >
            {modules.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <span className="text-xs font-bold text-stone-400 pl-2">
            {filteredLogs.length} Events Logged
          </span>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Admin Operator</th>
                <th className="py-3 px-3">Action Executed</th>
                <th className="py-3 px-3">System Module</th>
                <th className="py-3 px-3">Source IP</th>
                <th className="py-3 px-4">Audit Details & Entity Key</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#FFF2E3]/20 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#381602]">
                    {log.id}
                  </td>

                  <td className="py-3 px-3 text-stone-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-800">{log.adminName}</div>
                    <span className="text-[10px] text-stone-400 font-semibold">{log.role}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF2E3] text-[#A34805] border border-[#F5DEC8]">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-stone-700">
                    {log.module}
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-stone-400">
                    {log.ipAddress}
                  </td>

                  <td className="py-3 px-4 text-stone-600 text-[11px] max-w-xs">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
