import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  FolderKanban, 
  Store, 
  ArrowUpRight, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Download, 
  Eye, 
  Filter,
  ExternalLink,
  Plus,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useNGO } from '../../context/NGOContext';
import { useToast } from '../../context/ToastContext';
import ReceiptModal from '../../components/common/ReceiptModal';

export default function AdminDashboard() {
  const { transactions, shops, razorpayConfig } = useNGO();
  const { addToast } = useToast();

  const [timeFilter, setTimeFilter] = useState('monthly'); // 'daily' | 'weekly' | 'monthly' | 'all'
  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState(null);

  // Aggregate metrics
  const totalVolume = transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const totalCount = transactions.length;
  const activeShopsCount = shops.filter(s => s.status === 'Active').length;
  const avgDonation = totalCount > 0 ? Math.round(totalVolume / totalCount) : 0;

  // Real-time Daily, Weekly, Monthly Collections (Requirement #6)
  const now = new Date();
  const todayStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const currentMonthStr = now.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dailyTotal = transactions
    .filter(t => (t.status === 'Completed' || !t.status) && (t.date.includes(todayStr) || (t.timestamp && new Date(t.timestamp).toDateString() === now.toDateString())))
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const weeklyTotal = transactions
    .filter(t => (t.status === 'Completed' || !t.status) && (t.timestamp ? new Date(t.timestamp) >= oneWeekAgo : true))
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const monthlyTotal = transactions
    .filter(t => (t.status === 'Completed' || !t.status) && (t.date.includes(currentMonthStr) || (t.timestamp && new Date(t.timestamp).getMonth() === now.getMonth())))
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const successfulCount = transactions.filter(t => t.status === 'Completed' || !t.status).length;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;
  const failedCount = transactions.filter(t => t.status === 'Failed').length;

  const stats = [
    {
      title: "Total Collections",
      value: `₹${totalVolume.toLocaleString('en-IN')}`,
      change: "+24.8% vs last month",
      isPositive: true,
      subtext: "100% Tax-Deductible 80G",
      icon: TrendingUp,
      accent: "text-[#E87A1E] bg-[#FFF2E3]"
    },
    {
      title: "Partner Retail Counters",
      value: `${activeShopsCount} Active`,
      change: `+${shops.length} enrolled shops`,
      isPositive: true,
      subtext: "Zero-fee QR standees active",
      icon: Store,
      accent: "text-emerald-800 bg-emerald-50"
    },
    {
      title: "Customer Transactions",
      value: `${totalCount} Payments`,
      change: `${successfulCount} verified`,
      isPositive: true,
      subtext: "Mapped to partner shops",
      icon: Receipt,
      accent: "text-[#A34805] bg-[#FFF2E3]"
    },
    {
      title: "Average Ticket Size",
      value: `₹${avgDonation.toLocaleString('en-IN')}`,
      change: "UPI & NetBanking",
      isPositive: true,
      subtext: "Daily community impact",
      icon: CreditCard,
      accent: "text-[#D2640C] bg-[#FFF2E3]"
    }
  ];

  // Top shops leaderboard
  const topShops = [...shops]
    .sort((a, b) => (b.totalCollected || 0) - (a.totalCollected || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-[#143D2B] to-[#1F543D] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-400/20 text-emerald-300 font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Razorpay Merchant Active • Immense Life Foundation
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
            QR Payment Collection & Shop Operations
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
            Real-time shop counter QR monitoring, customer transaction mapping, and instant Section 80G tax receipt dispatch.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/admin/shops"
            className="px-4 py-2.5 bg-white text-[#143D2B] hover:bg-emerald-50 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>Onboard Shop</span>
          </Link>
          <Link
            to="/pay"
            target="_blank"
            className="px-4 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Test Customer QR Pay</span>
          </Link>
        </div>
      </div>

      {/* Requirement #6: Daily, Weekly, Monthly Collections Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div>
            <span className="text-stone-500 font-medium block">Daily Collection (Today):</span>
            <span className="font-serif font-bold text-base text-[#143D2B]">₹{dailyTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-8 w-px bg-stone-200 hidden sm:block"></div>
          <div>
            <span className="text-stone-500 font-medium block">Weekly Collection (7 Days):</span>
            <span className="font-serif font-bold text-base text-emerald-800">₹{weeklyTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-8 w-px bg-stone-200 hidden sm:block"></div>
          <div>
            <span className="text-stone-500 font-medium block">Monthly Collection:</span>
            <span className="font-serif font-bold text-base text-[#E87A1E]">₹{monthlyTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            ✓ {successfulCount} Verified
          </span>
          {pendingCount > 0 && (
            <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {pendingCount} Pending
            </span>
          )}
          {failedCount > 0 && (
            <span className="font-bold text-red-800 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              {failedCount} Failed
            </span>
          )}
        </div>
      </div>

      {/* 4 Summary Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#F3DEC8] shadow-xs hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-stone-500">{stat.title}</span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border border-[#F5DEC8] ${stat.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="font-serif text-3xl font-bold text-[#381602] mb-1">
                {stat.value}
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <span className="text-emerald-700 font-bold">{stat.change}</span>
                <span>{stat.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Partner Shop Leaderboard & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Customer Transactions (Mapped to Shop) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#F3DEC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3DEC8]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Recent Customer Payments (SOP Step 7)
              </h3>
              <p className="text-xs text-stone-500">
                Recorded against partner shops with customer name, mobile & Razorpay ID
              </p>
            </div>
            <Link
              to="/admin/transactions"
              className="text-xs font-bold text-[#E87A1E] hover:underline flex items-center gap-1"
            >
              <span>View All ({transactions.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 5).map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedReceiptTxn(t)}
                className="p-4 rounded-2xl border border-stone-100 bg-[#FAF9F5] hover:bg-[#FFF8F0] hover:border-[#F5DEC8] transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-[#E87A1E]">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span>{t.customerName}</span>
                      <span className="font-normal text-xs text-stone-500">({t.customerMobile || 'Direct'})</span>
                    </div>
                    <div className="text-[11px] text-stone-600 mt-0.5">
                      Counter: <strong className="text-emerald-800">{t.shopName}</strong>
                      {t.qrId && <span className="text-stone-400 font-mono ml-1">({t.qrId})</span>}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                      Razorpay ID: {t.razorpayPaymentId} • {t.date}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="font-serif text-base font-bold text-[#381602] block">
                    ₹{Number(t.amount).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                    Receipt Generated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Shop Leaderboard */}
        <div className="bg-white rounded-3xl p-6 border border-[#F3DEC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3DEC8]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Partner Shop Leaderboard
              </h3>
              <p className="text-xs text-stone-500">Top counters by collection volume</p>
            </div>
            <Link
              to="/admin/shops"
              className="text-xs font-bold text-[#E87A1E] hover:underline"
            >
              All Shops
            </Link>
          </div>

          <div className="space-y-3">
            {topShops.map((shop, idx) => (
              <div
                key={shop.id}
                className="p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 ${
                    idx === 0 ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-stone-900 truncate">{shop.name}</h4>
                    <p className="text-[10px] text-stone-500 font-mono">{shop.qrId}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif font-bold text-stone-900 block">
                    ₹{Number(shop.totalCollected || 0).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-stone-400">{shop.transactionsCount || 0} scans</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/admin/reports"
              className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#FFF2E3] border border-[#F3DEC8] text-[#381602] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <span>View Daily / Monthly Reports</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Official 80G Tax Receipt Modal */}
      {selectedReceiptTxn && (
        <ReceiptModal
          isOpen={!!selectedReceiptTxn}
          onClose={() => setSelectedReceiptTxn(null)}
          transaction={selectedReceiptTxn}
        />
      )}

    </div>
  );
}
