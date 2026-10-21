import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  FileCheck2, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  Store, 
  ShieldCheck, 
  Download, 
  X,
  Award,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminCustomers() {
  const { 
    customers, 
    transactions, 
    setActiveReceiptModal 
  } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.mobile.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
    (c.pan && c.pan.toLowerCase().includes(search.toLowerCase()))
  );

  const getCustomerTransactions = (customerPhone) => {
    return transactions.filter(t => t.customerPhone === customerPhone);
  };

  const handleDownloadAnnual80G = (customer) => {
    addToast(`Consolidated Section 80G Tax Exemption Certificate for FY 2025-26 generated for ${customer.name}!`, 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Users className="w-3.5 h-3.5" />
            <span>Customer & Donor Directory • Module #7</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Customer Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Profiles of conscious retail shoppers, verified PAN details, lifetime seva contributions, and consolidated 80G tax deductions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-[#FFF2E3] text-[#A34805] border border-[#F5DEC8] rounded-xl text-xs font-bold">
            6,420+ Registered Donors
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, mobile, customer ID, or PAN..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        <span className="text-xs font-bold text-stone-400">
          Showing {filteredCustomers.length} of {customers.length}
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Customer ID & Name</th>
                <th className="py-3 px-3">Mobile & Email</th>
                <th className="py-3 px-3">PAN Number</th>
                <th className="py-3 px-3 text-right">Successful Payments</th>
                <th className="py-3 px-3 text-right">Total Contributed</th>
                <th className="py-3 px-3">Last Payment</th>
                <th className="py-3 px-3">Primary Shop</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-[#FFF2E3]/25 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                        {cust.id}
                      </span>
                      <span>{cust.name}</span>
                    </div>
                    <span className="text-[10px] text-[#A34805] font-semibold">
                      {cust.loyaltyTier}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-mono text-stone-800">{cust.mobile}</div>
                    <div className="text-[10px] text-stone-400">{cust.email || 'N/A'}</div>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-stone-700">
                    {cust.pan || <span className="text-stone-300">Not Submitted</span>}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-stone-800">
                    {cust.successfulPayments} donations
                  </td>

                  <td className="py-3 px-3 text-right font-black font-serif text-sm text-[#E87A1E]">
                    ₹{cust.totalPaid.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-3 text-stone-500 text-[11px]">
                    {cust.lastPaymentDate}
                  </td>

                  <td className="py-3 px-3 text-stone-700 font-medium">
                    {cust.primaryShop}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-3 py-1 bg-stone-100 hover:bg-[#FFF2E3] text-[#381602] rounded-lg font-bold text-xs transition flex items-center gap-1"
                        title="View Customer Profile & History"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#E87A1E]" />
                        <span>Profile</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & Transaction History Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200 bg-[#FFFDF9] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#E87A1E] font-bold uppercase tracking-wider">
                  {selectedCustomer.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#381602]">
                  {selectedCustomer.name}
                </h3>
                <span className="text-xs text-stone-500">
                  {selectedCustomer.loyaltyTier} • {selectedCustomer.city}
                </span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 text-xs text-stone-700">
              
              {/* Stat Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#FFF2E3] border border-[#F5DEC8]">
                  <span className="text-[10px] font-bold text-[#A34805] uppercase">Lifetime Contributed</span>
                  <div className="font-serif text-2xl font-black text-[#381602] mt-0.5">
                    ₹{selectedCustomer.totalPaid.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Successful Payments</span>
                  <div className="font-serif text-2xl font-black text-stone-900 mt-0.5">
                    {selectedCustomer.successfulPayments} Seva Donations
                  </div>
                </div>
              </div>

              {/* Personal & Tax Exemption Data */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 uppercase text-[10px] tracking-wider">
                  Contact & Tax Exemption Credentials
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Mobile:</span>
                    <span className="font-mono font-bold text-stone-800">{selectedCustomer.mobile}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">PAN for 80G:</span>
                    <span className="font-mono font-bold text-[#A34805]">{selectedCustomer.pan || 'Not Provided'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block text-[10px]">Email Address:</span>
                    <span className="font-medium text-stone-800">{selectedCustomer.email || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Consolidated 80G Certificate Action */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-[#FFFDF9] border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Annual Consolidated 80G Tax Docket</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Combined certificate for Income Tax return filing under Section 80G
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadAnnual80G(selectedCustomer)}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs transition flex items-center gap-1 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

              {/* Customer Payment History Table */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#381602] mb-2">
                  Complete Payment History & Mapped Shops
                </h4>
                {getCustomerTransactions(selectedCustomer.mobile).length > 0 ? (
                  <div className="border border-stone-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="p-2.5">Txn ID</th>
                          <th className="p-2.5">Shop</th>
                          <th className="p-2.5">Amount</th>
                          <th className="p-2.5">Status</th>
                          <th className="p-2.5 text-center">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {getCustomerTransactions(selectedCustomer.mobile).map(t => (
                          <tr key={t.id} className="hover:bg-stone-50">
                            <td className="p-2.5 font-mono font-bold text-stone-800">{t.id}</td>
                            <td className="p-2.5 font-medium">{t.shopName}</td>
                            <td className="p-2.5 font-bold text-[#E87A1E]">₹{t.amount.toLocaleString('en-IN')}</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {t.status}
                              </span>
                            </td>
                            <td className="p-2.5 text-center">
                              <button
                                onClick={() => setActiveReceiptModal({
                                  receiptNumber: t.receiptNo,
                                  transactionId: t.id,
                                  customerName: t.customerName,
                                  customerMobile: t.customerPhone,
                                  customerPan: t.customerPan,
                                  customerEmail: t.customerEmail,
                                  shopName: t.shopName,
                                  amount: t.amount,
                                  paymentDate: t.dateTime,
                                  documentType: '80G Donation Receipt',
                                  cause: t.cause
                                })}
                                className="text-[10px] font-bold text-[#E87A1E] hover:underline"
                              >
                                View 80G
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-stone-400 italic text-center py-4 bg-stone-50 rounded-2xl">
                    Historical transactions archived in statutory database.
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
