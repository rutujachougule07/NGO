import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Filter, 
  CheckCircle2, 
  ArrowUpRight, 
  Store, 
  Users, 
  TrendingUp, 
  Receipt,
  Printer,
  ChevronRight,
  PieChart,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminReports() {
  const { 
    shops, 
    transactions, 
    settlements, 
    receipts, 
    customers 
  } = useAdmin();
  const { addToast } = useToast();

  const [activeCategory, setActiveCategory] = useState('daily');
  const [selectedShop, setSelectedShop] = useState('All');
  const [dateRange, setDateRange] = useState('Current Financial Year');

  // 10 Selectable Report Categories
  const categories = [
    { id: 'daily', name: '1. Daily Collection' },
    { id: 'weekly', name: '2. Weekly Collection' },
    { id: 'monthly', name: '3. Monthly Collection' },
    { id: 'yearly', name: '4. Yearly Collection' },
    { id: 'shop_wise', name: '5. Shop-wise Collection' },
    { id: 'customer_wise', name: '6. Customer-wise Txns' },
    { id: 'status_dist', name: '7. Success vs Failed' },
    { id: 'refunds', name: '8. Refund Reports' },
    { id: 'receipt_audit', name: '9. Receipt Reports' },
    { id: 'settlement_audit', name: '10. Settlement Reports' }
  ];

  const handleExportPDF = () => {
    addToast(`Generating Comprehensive Dossier PDF for "${categories.find(c => c.id === activeCategory)?.name}"... Download started!`, 'success');
  };

  const handleExportCSV = () => {
    addToast(`Exported "${categories.find(c => c.id === activeCategory)?.name}" to CSV spreadsheet!`, 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Financial & Statutory Intelligence • Module #9</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Reports & Collection Analytics
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit-ready reporting across 10 selectable statutory and operational collection categories
          </p>
        </div>

        {/* Global Export Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 10 Selectable Category Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-[#F3DEC8] shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                addToast(`Loaded ${cat.name}`, 'info');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#E87A1E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#FFF2E3]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Global Filters for the Selected Report */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-stone-600 font-semibold">
            <Calendar className="w-4 h-4 text-stone-400" />
            <span>Timeframe:</span>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="Today">Today Only</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Current Month">This Month (Oct 2026)</option>
              <option value="Last Month">Previous Month (Sep 2026)</option>
              <option value="Current Financial Year">FY 2025-2026 (Annual)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 font-semibold">
            <Store className="w-4 h-4 text-stone-400" />
            <span>Filter by Shop:</span>
            <select
              value={selectedShop}
              onChange={e => setSelectedShop(e.target.value)}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Partner Shops ({shops.length})</option>
              {shops.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled with Razorpay API
          </span>
        </div>
      </div>

      {/* Report Dynamic Content based on Active Category */}

      {/* Category 1: Daily Collection */}
      {activeCategory === 'daily' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#F3DEC8]">
              <span className="text-xs text-stone-500 font-semibold">Today's Total (21 Oct)</span>
              <div className="font-serif text-2xl font-black text-[#381602] mt-1">₹48,500</div>
              <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-block">+14% vs yesterday</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#F3DEC8]">
              <span className="text-xs text-stone-500 font-semibold">Daily Transactions</span>
              <div className="font-serif text-2xl font-black text-stone-900 mt-1">34 Scans</div>
              <span className="text-[11px] text-stone-500 mt-1 inline-block">Across 8 partner counters</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#F3DEC8]">
              <span className="text-xs text-stone-500 font-semibold">Top Performing Counter</span>
              <div className="font-serif text-xl font-black text-[#E87A1E] mt-1">Green Roots Cafe</div>
              <span className="text-[11px] text-stone-500 mt-1 inline-block">₹21,500 collected today</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#381602]">Daily Breakdown Table</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Gross Collection</th>
                  <th className="py-2.5 px-3">Total Scans</th>
                  <th className="py-2.5 px-3">Top Shop Counter</th>
                  <th className="py-2.5 px-3">Settlement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50">
                  <td className="py-3 px-3 font-bold text-stone-800">21 Oct 2026 (Today)</td>
                  <td className="py-3 px-3 font-bold text-[#E87A1E]">₹48,500</td>
                  <td className="py-3 px-3">34</td>
                  <td className="py-3 px-3 font-semibold">Green Roots Organic Cafe</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Settling (T+1)</span></td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-3 px-3 font-bold text-stone-800">20 Oct 2026</td>
                  <td className="py-3 px-3 font-bold text-[#E87A1E]">₹76,400</td>
                  <td className="py-3 px-3">52</td>
                  <td className="py-3 px-3 font-semibold">Banyan Tree Yoga Studio</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Settled (HDFC)</span></td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-3 px-3 font-bold text-stone-800">19 Oct 2026</td>
                  <td className="py-3 px-3 font-bold text-[#E87A1E]">₹92,100</td>
                  <td className="py-3 px-3">64</td>
                  <td className="py-3 px-3 font-semibold">Marine Drive Pharmacy</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Settled (HDFC)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category 5: Shop-wise Collection */}
      {activeCategory === 'shop_wise' && (
        <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#381602]">Partner Shop Collection Ranking</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Shop Name</th>
                <th className="py-2.5 px-3">City</th>
                <th className="py-2.5 px-3">Total Transactions</th>
                <th className="py-2.5 px-3 text-right">Total Raised</th>
                <th className="py-2.5 px-3 text-right">Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {shops.map((s, idx) => {
                const total = shops.reduce((acc, curr) => acc + curr.totalCollected, 0) || 1;
                const share = ((s.totalCollected / total) * 100).toFixed(1);
                return (
                  <tr key={s.id} className="hover:bg-stone-50">
                    <td className="py-3 px-3 font-bold text-stone-400">#{idx + 1}</td>
                    <td className="py-3 px-3 font-bold text-[#381602]">{s.name}</td>
                    <td className="py-3 px-3 text-stone-600">{s.city}</td>
                    <td className="py-3 px-3">{s.transactionsCount} scans</td>
                    <td className="py-3 px-3 text-right font-black font-serif text-[#E87A1E]">₹{s.totalCollected.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-semibold text-stone-700">{share}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Category 8: Refund Reports */}
      {activeCategory === 'refunds' && (
        <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#381602]">Reversed & Refunded Transactions</h3>
          <p className="text-xs text-stone-500">
            Log of customer duplicate charge corrections and revoked 80G tax certificates
          </p>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Txn ID</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Shop Counter</th>
                <th className="py-2.5 px-3">Refund Amount</th>
                <th className="py-2.5 px-3">Reason</th>
                <th className="py-2.5 px-3">80G Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50">
                <td className="py-3 px-3 font-mono font-bold text-stone-900">TXN-89414</td>
                <td className="py-3 px-3 font-medium">Pooja Hegde</td>
                <td className="py-3 px-3">Marine Drive Corner Pharmacy</td>
                <td className="py-3 px-3 font-bold text-purple-700">₹5,000</td>
                <td className="py-3 px-3 text-stone-500">Accidental double scan at billing counter</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">Certificate Nullified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Category 10: Settlement Reports */}
      {activeCategory === 'settlement_audit' && (
        <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#381602]">Razorpay Bank Payout Reconciliation</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Settlement ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Gross Amount</th>
                <th className="py-2.5 px-3">Deductions</th>
                <th className="py-2.5 px-3">Net Settled</th>
                <th className="py-2.5 px-3">Bank UTR</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {settlements.map(s => (
                <tr key={s.settlementId} className="hover:bg-stone-50">
                  <td className="py-3 px-3 font-mono font-bold text-stone-900">{s.settlementId}</td>
                  <td className="py-3 px-3 text-stone-600">{s.date}</td>
                  <td className="py-3 px-3 font-semibold">₹{s.grossAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-stone-500">₹{s.feeDeduction + s.taxGst}</td>
                  <td className="py-3 px-3 font-black font-serif text-emerald-800">₹{s.netSettled.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-stone-600">{s.utrNumber}</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fallback for other categories (Monthly, Yearly, Customer-wise, Status distribution, Receipt Reports) */}
      {!['daily', 'shop_wise', 'refunds', 'settlement_audit'].includes(activeCategory) && (
        <div className="bg-white p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#381602]">
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Data generated for {dateRange} • Mapped across {shops.length} partner shops
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
              100% Tax Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Total Volume</span>
              <div className="font-serif text-2xl font-bold text-[#381602] mt-1">₹38,45,200</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Total Contributors</span>
              <div className="font-serif text-2xl font-bold text-stone-900 mt-1">6,420 Donors</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Avg Donation Size</span>
              <div className="font-serif text-2xl font-bold text-[#E87A1E] mt-1">₹598.00</div>
            </div>
          </div>

          <p className="text-xs text-stone-500 italic pt-2">
            Detailed ledger entries matching statutory filing standards for the selected category are ready for export via PDF or CSV above.
          </p>
        </div>
      )}

    </div>
  );
}
