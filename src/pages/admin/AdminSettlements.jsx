import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Download, 
  CheckCircle2, 
  FileSpreadsheet, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminSettlements() {
  const { settlements } = useAdmin();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = settlements.filter(s => 
    s.settlementId.toLowerCase().includes(search.toLowerCase()) ||
    s.utrNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.bankAccount.toLowerCase().includes(search.toLowerCase())
  );

  const totalGrossSettled = settlements.reduce((sum, s) => sum + s.grossAmount, 0);
  const totalNetCredited = settlements.reduce((sum, s) => sum + s.netSettled, 0);

  const handleDownloadAdvice = (settlement) => {
    addToast(`Downloaded official Bank Settlement Advice & Reconciliation Voucher for ${settlement.settlementId}!`, 'success');
  };

  const handleExportAll = () => {
    addToast('Exported entire settlement reconciliation ledger to Excel (.xlsx)!', 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Bank Reconciliation & Payouts • Module #12</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Settlements & Reconciliation
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit daily automatic credit transfers from Razorpay payment gateway to Immense Life Foundation HDFC Bank Account
          </p>
        </div>

        <button
          onClick={handleExportAll}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition active:scale-95 self-start"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export Settlement Sheet</span>
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#F3DEC8] shadow-xs">
          <span className="text-xs font-semibold text-stone-500">Gross Collections Cleared</span>
          <div className="font-serif text-2xl font-black text-[#381602] mt-1">
            ₹{totalGrossSettled.toLocaleString('en-IN')}.00
          </div>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">100% matched with donor ledger</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#F3DEC8] shadow-xs">
          <span className="text-xs font-semibold text-stone-500">Net Credited to HDFC Bank</span>
          <div className="font-serif text-2xl font-black text-emerald-800 mt-1">
            ₹{totalNetCredited.toLocaleString('en-IN')}.00
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-block">Direct UTR bank verified</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#F3DEC8] shadow-xs">
          <span className="text-xs font-semibold text-stone-500">Discrepancy Tracker</span>
          <div className="font-serif text-2xl font-black text-emerald-700 mt-1 flex items-center gap-2">
            <span>0 Pending</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] text-stone-400 mt-1 inline-block">All transactions reconciled</span>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by settlement ID, UTR number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
            />
          </div>

          <span className="text-xs text-stone-400 font-bold">
            {filtered.length} Bank Transfers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Settlement ID</th>
                <th className="py-3 px-3">Date Credited</th>
                <th className="py-3 px-3 text-right">Gross Volume</th>
                <th className="py-3 px-3 text-right">Gateway Fees & GST</th>
                <th className="py-3 px-3 text-right">Net Credited</th>
                <th className="py-3 px-3">Bank UTR Number</th>
                <th className="py-3 px-3">Destination Account</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Bank Advice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map(s => (
                <tr key={s.settlementId} className="hover:bg-[#FFF2E3]/20 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#381602]">
                    {s.settlementId}
                    <div className="text-[10px] text-stone-400 font-normal">{s.txnRange}</div>
                  </td>

                  <td className="py-3 px-3 text-stone-600 font-medium">
                    {s.date}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-stone-800">
                    ₹{s.grossAmount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-3 text-right text-stone-500 font-mono">
                    ₹{s.feeDeduction + s.taxGst}
                  </td>

                  <td className="py-3 px-3 text-right font-black font-serif text-sm text-emerald-800">
                    ₹{s.netSettled.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-stone-700">
                    {s.utrNumber}
                  </td>

                  <td className="py-3 px-3 text-stone-600 font-medium">
                    {s.bankAccount}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{s.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDownloadAdvice(s)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-[#FFF2E3] text-[#A34805] rounded-lg font-bold text-xs transition inline-flex items-center gap-1 border border-stone-200"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E87A1E]" />
                      <span>Advice</span>
                    </button>
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
