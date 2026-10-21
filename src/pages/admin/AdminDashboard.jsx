import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Store, 
  Receipt, 
  QrCode, 
  Plus, 
  ChevronRight, 
  ArrowUpRight, 
  Calendar
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import AddShopModal from './modals/AddShopModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { 
    shops, 
    totalRegisteredShops,
    activeShopsCount,
    totalCollectionAmount,
    todaysCollectionAmount,
    successfulTxnCount,
    totalCustomersCount
  } = useAdmin();

  const [dateRange, setDateRange] = useState('This Month');
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);

  // 4 Core High-Level Metric Cards (Clean & Essential)
  const coreMetrics = [
    {
      title: "Total Collection",
      value: `₹${(totalCollectionAmount / 100000).toFixed(2)} Lakh`,
      subtext: `Today: ₹${todaysCollectionAmount.toLocaleString('en-IN')}`,
      trend: "+28.4% YOY",
      icon: TrendingUp,
      accentBg: "bg-[#FFF2E3]",
      accentText: "text-[#E87A1E]",
      link: "/admin/transactions"
    },
    {
      title: "Partner Shops",
      value: totalRegisteredShops,
      subtext: `${activeShopsCount} currently operational`,
      trend: "Active Network",
      icon: Store,
      accentBg: "bg-amber-50",
      accentText: "text-amber-800",
      link: "/admin/shops"
    },
    {
      title: "Total Transactions",
      value: successfulTxnCount.toLocaleString('en-IN'),
      subtext: "Across all QR counters",
      trend: "98.4% Success",
      icon: Receipt,
      accentBg: "bg-emerald-50",
      accentText: "text-emerald-700",
      link: "/admin/transactions"
    },
    {
      title: "Donors & Customers",
      value: totalCustomersCount.toLocaleString('en-IN'),
      subtext: "80G registered donors",
      trend: "+148 this week",
      icon: Users,
      accentBg: "bg-stone-100",
      accentText: "text-stone-800",
      link: "/admin/customers"
    }
  ];

  // Monthly Overview Inflow Chart
  const monthlyData = [
    { label: "May", amount: "₹4.8L", height: 45 },
    { label: "Jun", amount: "₹5.6L", height: 52 },
    { label: "Jul", amount: "₹6.4L", height: 62 },
    { label: "Aug", amount: "₹7.8L", height: 76 },
    { label: "Sep", amount: "₹8.4L", height: 85 },
    { label: "Oct", amount: "₹8.95L", height: 100 }
  ];

  // Top 4 Partner Shops for the quick widget
  const topShops = [...shops]
    .sort((a, b) => b.totalCollected - a.totalCollected)
    .slice(0, 4);

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Add Shop Modal */}
      <AddShopModal isOpen={isAddShopOpen} onClose={() => setIsAddShopOpen(false)} />

      {/* Header Banner - Clean & Simple */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Immense Life Foundation • Admin Console</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Dashboard Overview
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time summary of retail counter collections, partner shops, and donor contributions.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={dateRange}
            onChange={e => {
              setDateRange(e.target.value);
              addToast(`Filtered to: ${e.target.value}`, 'info');
            }}
            className="bg-[#FFFDF9] border border-[#DDD7C9] text-stone-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          >
            <option value="Today">Today</option>
            <option value="This Month">This Month (Oct 2026)</option>
            <option value="This Financial Year">This Financial Year</option>
          </select>

          <button
            onClick={() => setIsAddShopOpen(true)}
            className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Shop</span>
          </button>

          <button
            onClick={() => navigate('/admin/qr-codes')}
            className="px-4 py-2 bg-white hover:bg-[#FFF2E3] border border-[#F3DEC8] text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
          >
            <QrCode className="w-4 h-4 text-[#E87A1E]" />
            <span>QR Standees</span>
          </button>
        </div>
      </div>

      {/* 4 Essential Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coreMetrics.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-5 rounded-2xl border border-[#F3DEC8] shadow-xs hover:shadow-md hover:border-[#E87A1E]/50 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-500">{card.title}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border border-[#F5DEC8] ${card.accentBg} ${card.accentText}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="font-serif text-2xl font-black text-[#381602] tracking-tight group-hover:text-[#E87A1E] transition">
                  {card.value}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-700">{card.trend}</span>
                <span className="text-stone-400">{card.subtext}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Monthly Collection Chart & Top Partner Shops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Collection Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Monthly Seva Collection Inflow
              </h3>
              <p className="text-xs text-stone-500">Total monthly donations from counter QR standees</p>
            </div>
            <Link
              to="/admin/reports"
              className="text-xs font-bold text-[#E87A1E] hover:text-[#A34805] flex items-center gap-1"
            >
              <span>View Full Reports</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-4 pb-2">
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 px-2 border-b border-stone-200">
              {monthlyData.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="text-[10px] font-bold text-[#A34805] mb-1">
                    {item.amount}
                  </div>
                  <div
                    style={{ height: `${item.height}%` }}
                    className="w-full max-w-[44px] bg-gradient-to-t from-[#E87A1E] to-[#F4A261] rounded-t-xl group-hover:brightness-110 transition shadow-xs"
                  ></div>
                  <span className="text-[11px] font-semibold text-stone-600 mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-3">
              <span>Avg Monthly: <strong className="text-stone-800">₹7.0 Lakh</strong></span>
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <ArrowUpRight className="w-4 h-4" /> +28.4% Year-over-Year Growth
              </span>
            </div>
          </div>
        </div>

        {/* Top Active Partner Shops */}
        <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#381602]">
                  Top Partner Shops
                </h3>
                <p className="text-xs text-stone-500">Leading donation counter locations</p>
              </div>
              <Link
                to="/admin/shops"
                className="text-xs font-bold text-[#E87A1E] hover:text-[#A34805]"
              >
                All ({shops.length})
              </Link>
            </div>

            <div className="space-y-3">
              {topShops.map((shop, i) => (
                <div 
                  key={shop.id} 
                  className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#F3DEC8] flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-xs text-[#381602] truncate">{shop.name}</div>
                    <div className="text-[10px] text-stone-500">{shop.city} • {shop.transactionsCount} txns</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-serif font-black text-xs text-[#E87A1E]">
                      ₹{(shop.totalCollected / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/admin/shops"
            className="w-full mt-4 py-2 px-3 bg-stone-50 hover:bg-[#FFF2E3] border border-[#F3DEC8] text-xs font-bold rounded-xl text-center text-stone-700 hover:text-[#A34805] transition block"
          >
            Manage Partner Shops →
          </Link>
        </div>

      </div>

    </div>
  );
}
