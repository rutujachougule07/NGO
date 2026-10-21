import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileCheck2, 
  Calendar, 
  X, 
  CreditCard, 
  Store, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminTransactions() {
  const { 
    transactions, 
    shops, 
    setActiveReceiptModal 
  } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [shopFilter, setShopFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [activeTxnDrawer, setActiveTxnDrawer] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter logic
  const filtered = transactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.customerPhone.toLowerCase().includes(search.toLowerCase()) ||
      t.shopName.toLowerCase().includes(search.toLowerCase()) ||
      t.razorpayOrderId.toLowerCase().includes(search.toLowerCase()) ||
      t.razorpayPaymentId.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesShop = shopFilter === 'All' || t.shopId === shopFilter;
    const matchesDate = dateFilter === 'All' || 
      (dateFilter === 'Today' && t.dateTime.includes('21 Oct')) ||
      (dateFilter === 'Yesterday' && t.dateTime.includes('20 Oct'));

    return matchesSearch && matchesStatus && matchesShop && matchesDate;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Razorpay Order ID', 'Razorpay Payment ID', 'Shop Name', 'Customer Name', 'Customer Phone', 'Amount (INR)', 'Payment Method', 'Status', 'Date Time', 'Receipt No'];
    const rows = filtered.map(t => [
      t.id,
      t.razorpayOrderId,
      t.razorpayPaymentId,
      `"${t.shopName}"`,
      `"${t.customerName}"`,
      `"${t.customerPhone}"`,
      t.amount,
      `"${t.paymentMethod}"`,
      t.status,
      `"${t.dateTime}"`,
      t.receiptNo
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ImmenseLife_Transactions_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Exported ${filtered.length} transaction records to CSV!`, 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Receipt className="w-3.5 h-3.5" />
            <span>Collections & Gateway Ledger • Module #6</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Payments & Customer Transactions
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit trail of partner shop QR counter scans, Razorpay web payments, customer phone numbers, and automated 80G tax receipts
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition active:scale-95 self-start"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Txn ID, customer, order ID, phone..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Statuses</option>
              <option value="Successful">Successful</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          {/* Shop Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <span>Shop:</span>
            <select
              value={shopFilter}
              onChange={e => {
                setShopFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Partner Shops</option>
              {shops.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <span>Date:</span>
            <select
              value={dateFilter}
              onChange={e => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Time</option>
              <option value="Today">Today (21 Oct)</option>
              <option value="Yesterday">Yesterday (20 Oct)</option>
            </select>
          </div>

          <span className="text-xs font-bold text-stone-400 pl-2">
            {filtered.length} Records
          </span>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Razorpay Order & Pay ID</th>
                <th className="py-3 px-3">Shop Counter</th>
                <th className="py-3 px-3">Customer Details</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
                <th className="py-3 px-3">Method</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3 text-center">80G Receipt</th>
                <th className="py-3 px-3 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {paginatedItems.map(txn => (
                <tr key={txn.id} className="hover:bg-[#FFF2E3]/20 transition">
                  <td className="py-3 px-3 font-mono font-bold text-[#381602]">
                    {txn.id}
                  </td>

                  <td className="py-3 px-3 font-mono text-[10px] text-stone-500">
                    <div>{txn.razorpayOrderId}</div>
                    <div className="text-stone-400">{txn.razorpayPaymentId}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-stone-800">{txn.shopName}</div>
                    <span className="text-[10px] text-stone-400 font-mono">{txn.shopId}</span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-800">{txn.customerName}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{txn.customerPhone}</div>
                  </td>

                  <td className="py-3 px-3 text-right font-black font-serif text-sm text-[#E87A1E]">
                    ₹{txn.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-3 text-stone-600 font-medium">
                    {txn.paymentMethod}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      txn.status === 'Successful'
                        ? 'bg-emerald-100 text-emerald-800'
                        : txn.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : txn.status === 'Refunded'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {txn.status === 'Successful' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {txn.status === 'Pending' && <Clock className="w-3 h-3 text-amber-600" />}
                      {txn.status === 'Refunded' && <Receipt className="w-3 h-3 text-purple-600" />}
                      {txn.status === 'Failed' && <AlertCircle className="w-3 h-3 text-red-600" />}
                      <span>{txn.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-stone-500 text-[11px]">
                    {txn.dateTime}
                  </td>

                  <td className="py-3 px-3 text-center">
                    {txn.status === 'Successful' ? (
                      <button
                        onClick={() => setActiveReceiptModal({
                          receiptNumber: txn.receiptNo,
                          transactionId: txn.id,
                          customerName: txn.customerName,
                          customerMobile: txn.customerPhone,
                          customerPan: txn.customerPan,
                          customerEmail: txn.customerEmail,
                          shopName: txn.shopName,
                          amount: txn.amount,
                          paymentDate: txn.dateTime,
                          documentType: '80G Donation Receipt',
                          cause: txn.cause
                        })}
                        className="px-2 py-1 bg-[#FFF2E3] hover:bg-[#FCE1C5] text-[#A34805] rounded-lg font-bold text-[10px] border border-[#F5DEC8] transition inline-flex items-center gap-1"
                      >
                        <FileCheck2 className="w-3 h-3 text-[#E87A1E]" />
                        <span>View</span>
                      </button>
                    ) : (
                      <span className="text-stone-300 text-[11px]">-</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => setActiveTxnDrawer(txn)}
                      className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                      title="View Gateway Payload & Breakdown"
                    >
                      <Eye className="w-4 h-4 text-[#A34805]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>
            Page <strong className="text-stone-900">{currentPage}</strong> of <strong className="text-stone-900">{totalPages}</strong> (Total {filtered.length} transactions)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-stone-300 rounded-lg hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-stone-300 rounded-lg hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Slide-over Drawer */}
      {activeTxnDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-stone-200 bg-[#FFFDF9] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#E87A1E]">
                  {activeTxnDrawer.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#381602]">
                  Transaction & Gateway Details
                </h3>
              </div>
              <button
                onClick={() => setActiveTxnDrawer(null)}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 text-xs text-stone-700">
              
              {/* Status Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFFDF9] to-[#FFF6EC] border border-[#F3DEC8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase">Gross Amount</span>
                  <div className="font-serif text-2xl font-black text-[#381602]">
                    ₹{activeTxnDrawer.amount.toLocaleString('en-IN')}.00
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeTxnDrawer.status === 'Successful'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeTxnDrawer.status}
                </span>
              </div>

              {/* Gateway References */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">
                  Razorpay Payment Identifiers
                </span>
                <div className="font-mono text-[11px] space-y-1">
                  <div>Order ID: <span className="font-bold text-stone-800">{activeTxnDrawer.razorpayOrderId}</span></div>
                  <div>Payment ID: <span className="font-bold text-stone-800">{activeTxnDrawer.razorpayPaymentId}</span></div>
                  <div>Gateway Fee: <span className="text-emerald-700 font-semibold">₹0 (Waived for NGO 80G Seva)</span></div>
                  <div>Net Credited: <span className="font-bold text-stone-900">₹{activeTxnDrawer.amount}</span></div>
                </div>
              </div>

              {/* Customer Profile */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">
                  Donor / Customer Profile
                </span>
                <div className="space-y-1">
                  <div>Name: <strong className="text-stone-900">{activeTxnDrawer.customerName}</strong></div>
                  <div>Phone: <span className="font-mono">{activeTxnDrawer.customerPhone}</span></div>
                  <div>Email: <span>{activeTxnDrawer.customerEmail || 'Not provided'}</span></div>
                  <div>PAN: <span className="font-mono font-bold text-[#A34805]">{activeTxnDrawer.customerPan || 'Not claimed for 80G'}</span></div>
                </div>
              </div>

              {/* Shop Mapping */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">
                  Partner Merchant Mapping
                </span>
                <div className="space-y-1">
                  <div>Shop: <strong className="text-stone-900">{activeTxnDrawer.shopName}</strong></div>
                  <div>Shop ID: <span className="font-mono">{activeTxnDrawer.shopId}</span></div>
                  <div>Mapped Cause: <span className="font-semibold text-[#E87A1E]">{activeTxnDrawer.cause}</span></div>
                </div>
              </div>

              {/* Action Buttons in Drawer */}
              {activeTxnDrawer.status === 'Successful' && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveReceiptModal({
                        receiptNumber: activeTxnDrawer.receiptNo,
                        transactionId: activeTxnDrawer.id,
                        customerName: activeTxnDrawer.customerName,
                        customerMobile: activeTxnDrawer.customerPhone,
                        customerPan: activeTxnDrawer.customerPan,
                        customerEmail: activeTxnDrawer.customerEmail,
                        shopName: activeTxnDrawer.shopName,
                        amount: activeTxnDrawer.amount,
                        paymentDate: activeTxnDrawer.dateTime,
                        documentType: '80G Donation Receipt',
                        cause: activeTxnDrawer.cause
                      });
                    }}
                    className="w-full py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>View & Download 80G Tax Receipt</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
