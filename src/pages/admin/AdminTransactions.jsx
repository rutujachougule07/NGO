import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Eye, 
  X, 
  FileCheck, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck, 
  CreditCard,
  Printer,
  Smartphone,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { useNGO } from '../../context/NGOContext';
import { useToast } from '../../context/ToastContext';
import ReceiptModal from '../../components/common/ReceiptModal';

export default function AdminTransactions() {
  const { transactions, shops, razorpayConfig } = useNGO();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedShopFilter, setSelectedShopFilter] = useState('All');
  const [activeReceiptTxn, setActiveReceiptTxn] = useState(null);
  const [activeDetailDrawer, setActiveDetailDrawer] = useState(null);

  const filtered = transactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      (t.customerName && t.customerName.toLowerCase().includes(search.toLowerCase())) ||
      (t.customerMobile && t.customerMobile.includes(search)) ||
      (t.shopName && t.shopName.toLowerCase().includes(search.toLowerCase())) ||
      (t.razorpayPaymentId && t.razorpayPaymentId.toLowerCase().includes(search.toLowerCase())) ||
      (t.receiptNo && t.receiptNo.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesShop = selectedShopFilter === 'All' || t.shopId === selectedShopFilter || t.qrId === selectedShopFilter;

    return matchesSearch && matchesStatus && matchesShop;
  });

  const totalVolume = transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const totalCount = transactions.length;
  const avgAmount = totalCount > 0 ? Math.round(totalVolume / totalCount) : 0;

  const handleExportCSV = () => {
    const headers = "Transaction ID,Razorpay Payment ID,Customer Name,Customer Mobile,Customer Email,Shop Name,Shop QR ID,Amount (INR),Payment Method,Date,Status,Receipt No\n";
    const rows = filtered.map(t => 
      `"${t.id}","${t.razorpayPaymentId}","${t.customerName}","${t.customerMobile || ''}","${t.customerEmail || ''}","${t.shopName}","${t.qrId || ''}",${t.amount},"${t.paymentMethod}","${t.date}","${t.status}","${t.receiptNo}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `immense-life-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    addToast('Transactions ledger exported as CSV file!', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#143D2B]">
            Customer Payments & Tax Ledgers
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            SOP Step 7 & 8: Real-time customer transaction records mapped to partner shops with Razorpay IDs & 80G receipts
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-white border border-[#DDD7C9] text-gray-800 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs hover:bg-gray-50 transition"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E7E2D5] shadow-xs">
          <span className="text-xs text-gray-500 font-semibold block">Total INR Volume</span>
          <div className="font-serif text-2xl font-bold text-[#143D2B] mt-1">
            ₹{totalVolume.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-block">100% Tax-Deductible</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E2D5] shadow-xs">
          <span className="text-xs text-gray-500 font-semibold block">Total Scans & Payments</span>
          <div className="font-serif text-2xl font-bold text-[#143D2B] mt-1">
            {totalCount}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-block">Via Partner Counter QRs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E2D5] shadow-xs">
          <span className="text-xs text-gray-500 font-semibold block">Average Gift Size</span>
          <div className="font-serif text-2xl font-bold text-[#143D2B] mt-1">
            ₹{avgAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 inline-block">Micro & Direct Contributions</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E2D5] shadow-xs">
          <span className="text-xs text-gray-500 font-semibold block">80G Receipts Generated</span>
          <div className="font-serif text-2xl font-bold text-[#143D2B] mt-1">
            100%
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-block">Instant automated PDFs</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E7E2D5] flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, mobile, shop, or Razorpay ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Shop filter dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium">Shop:</span>
            <select
              value={selectedShopFilter}
              onChange={(e) => setSelectedShopFilter(e.target.value)}
              className="bg-[#FAF9F5] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
            >
              <option value="All">All Partner Shops</option>
              {shops.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            {['All', 'Completed', 'Pending', 'Failed'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  statusFilter === st
                    ? 'bg-[#143D2B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-[#E7E2D5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Txn ID / Razorpay ID</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Mapped Partner Shop</th>
                <th className="py-3.5 px-4">Amount (₹)</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">80G Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-gray-900">{t.id}</div>
                    <div className="font-mono text-[10px] text-emerald-800">{t.razorpayPaymentId}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{t.customerName}</div>
                    <div className="text-[11px] text-gray-500">{t.customerMobile || 'Direct'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{t.shopName}</div>
                    {t.qrId && <span className="font-mono text-[10px] text-gray-400">{t.qrId}</span>}
                  </td>
                  <td className="py-3.5 px-4 font-serif font-bold text-emerald-800 text-sm">
                    ₹{Number(t.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded font-medium">
                      {t.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      t.status === 'Completed'
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                        : t.status === 'Pending'
                        ? 'text-amber-800 bg-amber-50 border-amber-200'
                        : 'text-red-800 bg-red-50 border-red-200'
                    }`}>
                      {t.status === 'Completed' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3" />}
                      {t.status || 'Completed'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {t.status === 'Completed' ? (
                        <button
                          onClick={() => setActiveReceiptTxn(t)}
                          className="px-3 py-1.5 bg-[#FFF2E3] hover:bg-[#FCE2C8] text-[#A34805] text-xs font-bold rounded-xl flex items-center gap-1 border border-[#F5DEC8] transition"
                          title="View Official 80G Receipt"
                        >
                          <Receipt className="w-3.5 h-3.5 text-[#E87A1E]" />
                          <span>Receipt</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-stone-400 font-medium italic">
                          {t.status === 'Failed' ? 'No Receipt (Failed)' : 'Pending Verification'}
                        </span>
                      )}
                      <button
                        onClick={() => setActiveDetailDrawer(t)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
                        title="View Full Audit Ledger"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Audit Drawer */}
      {activeDetailDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end p-0 sm:p-4"
          onClick={() => setActiveDetailDrawer(null)}
        >
          <div
            className="bg-white h-full sm:h-auto sm:max-h-[90vh] sm:rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E2D5] shadow-2xl overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800">Cryptographic Payment Ledger</span>
                <h3 className="font-serif text-xl font-bold text-gray-900">{activeDetailDrawer.id}</h3>
              </div>
              <button
                onClick={() => setActiveDetailDrawer(null)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Name:</span>
                <span className="font-bold text-gray-900">{activeDetailDrawer.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Mobile:</span>
                <span className="font-medium text-gray-900">{activeDetailDrawer.customerMobile || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Email:</span>
                <span className="font-medium text-gray-900">{activeDetailDrawer.customerEmail || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mapped Partner Shop:</span>
                <span className="font-bold text-emerald-800">{activeDetailDrawer.shopName} ({activeDetailDrawer.qrId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Received:</span>
                <span className="font-serif font-bold text-base text-gray-900">₹{Number(activeDetailDrawer.amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Razorpay Payment ID:</span>
                <span className="font-mono font-bold text-emerald-800">{activeDetailDrawer.razorpayPaymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Settlement Batch:</span>
                <span className="font-mono text-gray-700">{activeDetailDrawer.settlementBatch || 'SETTL-PENDING'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Section 80G Receipt:</span>
                <span className="font-mono font-bold text-gray-900">{activeDetailDrawer.receiptNo}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const t = activeDetailDrawer;
                  setActiveDetailDrawer(null);
                  setActiveReceiptTxn(t);
                }}
                className="flex-1 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Printer className="w-4 h-4" />
                <span>Open 80G Tax Receipt</span>
              </button>
              <button
                onClick={() => setActiveDetailDrawer(null)}
                className="py-3 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official 80G Tax Receipt Modal */}
      {activeReceiptTxn && (
        <ReceiptModal
          isOpen={!!activeReceiptTxn}
          onClose={() => setActiveReceiptTxn(null)}
          transaction={activeReceiptTxn}
        />
      )}

    </div>
  );
}
