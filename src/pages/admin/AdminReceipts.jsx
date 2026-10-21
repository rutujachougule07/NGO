import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  Printer, 
  Download, 
  Share2, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText,
  Mail,
  Phone,
  Store
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminReceipts() {
  const { 
    receipts, 
    resendReceipt, 
    setActiveReceiptModal 
  } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [docTypeFilter, setDocTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReceipts = receipts.filter(r => {
    const matchesSearch = 
      r.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.shopName.toLowerCase().includes(search.toLowerCase()) ||
      (r.customerPan && r.customerPan.toLowerCase().includes(search.toLowerCase()));

    const matchesDocType = docTypeFilter === 'All' || 
      (docTypeFilter === 'Receipt' && r.documentType.includes('Receipt')) ||
      (docTypeFilter === 'Invoice' && r.documentType.includes('Invoice'));

    const matchesStatus = statusFilter === 'All' || r.status.includes(statusFilter);

    return matchesSearch && matchesDocType && matchesStatus;
  });

  const handlePrint = (receipt) => {
    setActiveReceiptModal(receipt);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleDownloadPDF = (receipt) => {
    addToast(`Downloading statutory PDF for ${receipt.receiptNumber}...`, 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Statutory Compliance & Invoicing • Module #8</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Receipts & Tax Invoices
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Cryptographically logged Section 80G tax exemption certificates for donors and merchant counter platform invoices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Form 10BD Auto-Compliant</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by receipt no, txn ID, customer, PAN..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <span>Type:</span>
            <select
              value={docTypeFilter}
              onChange={e => setDocTypeFilter(e.target.value)}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Documents</option>
              <option value="Receipt">80G Donation Receipts</option>
              <option value="Invoice">Merchant Invoices</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Statuses</option>
              <option value="Generated">Generated</option>
              <option value="Sent">Sent / WhatsApp</option>
              <option value="Downloaded">Downloaded</option>
            </select>
          </div>

          <span className="text-xs font-bold text-stone-400 pl-2">
            {filteredReceipts.length} Documents
          </span>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Receipt / Invoice No</th>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Donor / Customer</th>
                <th className="py-3 px-3">Shop Counter</th>
                <th className="py-3 px-3 text-right">Amount Received</th>
                <th className="py-3 px-3">Payment Date</th>
                <th className="py-3 px-3 text-center">Document Type</th>
                <th className="py-3 px-3 text-center">Dispatch Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredReceipts.map(r => {
                const isInvoice = r.documentType.includes('Invoice');
                return (
                  <tr key={r.receiptNumber} className="hover:bg-[#FFF2E3]/20 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#381602]">
                      {r.receiptNumber}
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-stone-500">
                      {r.transactionId}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-800">{r.customerName}</div>
                      <div className="text-[10px] text-stone-400 font-mono">
                        {r.customerMobile} {r.customerPan ? `• PAN: ${r.customerPan}` : ''}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-stone-700 font-medium">
                      {r.shopName}
                    </td>

                    <td className="py-3 px-3 text-right font-black font-serif text-sm text-[#E87A1E]">
                      ₹{r.amount.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-3 text-stone-500 text-[11px]">
                      {r.paymentDate}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isInvoice
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {r.documentType}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700">
                        {r.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setActiveReceiptModal(r)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-[#FFF2E3] transition"
                          title="Preview Official Document"
                        >
                          <Eye className="w-4 h-4 text-[#A34805]" />
                        </button>
                        <button
                          onClick={() => handlePrint(r)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-[#FFF2E3] transition"
                          title="Print Document"
                        >
                          <Printer className="w-4 h-4 text-[#E87A1E]" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(r)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-[#FFF2E3] transition"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => resendReceipt(r.receiptNumber, 'WhatsApp')}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-[#FFF2E3] transition"
                          title="Resend to Donor WhatsApp"
                        >
                          <Share2 className="w-4 h-4 text-stone-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
