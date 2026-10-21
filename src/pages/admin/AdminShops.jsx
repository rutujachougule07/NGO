import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  QrCode, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  FileCheck2, 
  ArrowUpRight, 
  Download, 
  Printer, 
  X,
  CreditCard
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import AddShopModal from './modals/AddShopModal';

export default function AdminShops() {
  const { 
    shops, 
    transactions, 
    toggleShopStatus, 
    deleteShop, 
    setActivePrintStandeeModal 
  } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [selectedShopForDetails, setSelectedShopForDetails] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [shopToEdit, setShopToEdit] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Filter options
  const cities = ['All', ...new Set(shops.map(s => s.city))];

  const filteredShops = shops.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.qrId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesCity = cityFilter === 'All' || s.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  // Calculate shop-specific transactions for details drawer
  const getShopTransactions = (shopId) => {
    return transactions.filter(t => t.shopId === shopId);
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Add / Edit Shop Modal */}
      <AddShopModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setShopToEdit(null);
        }}
        initialData={shopToEdit}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Store className="w-3.5 h-3.5" />
            <span>Retail Counter Management • Module #4</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Partner Merchant Directory
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Onboard, inspect, and configure partner shops hosting Immense Life Foundation QR donation standees
          </p>
        </div>

        <button
          onClick={() => {
            setShopToEdit(null);
            setIsAddModalOpen(true);
          }}
          className="px-5 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Shop</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by shop name, owner, city, ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold">
            <span>City:</span>
            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              className="bg-[#FFFDF9] border border-[#DDD7C9] rounded-lg px-2.5 py-1 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#E87A1E]"
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <span className="text-xs font-bold text-stone-400 pl-2">
            Showing {filteredShops.length} of {shops.length}
          </span>
        </div>
      </div>

      {/* Main Shops Table */}
      <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Shop ID & Name</th>
                <th className="py-3 px-3">Owner & Contact</th>
                <th className="py-3 px-3">Address & City</th>
                <th className="py-3 px-3">GSTIN</th>
                <th className="py-3 px-3">Reg Date</th>
                <th className="py-3 px-3 text-center">QR Status</th>
                <th className="py-3 px-3 text-right">Transactions</th>
                <th className="py-3 px-3 text-right">Total Collection</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredShops.map(shop => (
                <tr key={shop.id} className="hover:bg-[#FFF2E3]/25 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                        {shop.id}
                      </span>
                      <span>{shop.name}</span>
                    </div>
                    <div className="text-[10px] text-[#A34805] font-semibold mt-0.5">
                      {shop.category}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-stone-800">{shop.owner}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{shop.phone}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-stone-700 truncate max-w-[150px]">{shop.address}</div>
                    <div className="text-[10px] text-stone-400">{shop.city}, {shop.state}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-stone-600">
                    {shop.gstin || <span className="text-stone-300">N/A</span>}
                  </td>

                  <td className="py-3 px-3 text-stone-500 text-[11px]">
                    {shop.registeredDate}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      shop.qrStatus === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <QrCode className="w-3 h-3" />
                      {shop.qrStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-stone-800">
                    {shop.transactionsCount}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-[#E87A1E]">
                    ₹{shop.totalCollected.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => toggleShopStatus(shop.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                        shop.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                      title="Click to toggle status"
                    >
                      {shop.status}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedShopForDetails(shop)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                        title="View Full Shop Profile & History"
                      >
                        <Eye className="w-4 h-4 text-[#A34805]" />
                      </button>

                      <button
                        onClick={() => setActivePrintStandeeModal(shop)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                        title="Print Standee"
                      >
                        <QrCode className="w-4 h-4 text-[#E87A1E]" />
                      </button>

                      <button
                        onClick={() => {
                          setShopToEdit(shop);
                          setIsAddModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                        title="Edit Shop Details"
                      >
                        <Edit3 className="w-4 h-4 text-stone-600" />
                      </button>

                      <button
                        onClick={() => setConfirmDeleteId(shop.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete Shop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-stone-200 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">Confirm Deletion</h4>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to remove this merchant shop? Historical transactions will remain preserved in the ledger.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteShop(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white shadow-sm"
              >
                Delete Shop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shop Details Slide-over Drawer */}
      {selectedShopForDetails && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200 bg-[#FFFDF9] flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#E87A1E] font-bold uppercase tracking-wider">
                  {selectedShopForDetails.id} • {selectedShopForDetails.qrId}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#381602]">
                  {selectedShopForDetails.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedShopForDetails(null)}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 text-xs text-stone-700">
              
              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#FFF2E3] border border-[#F5DEC8]">
                  <span className="text-[10px] font-bold text-[#A34805] uppercase">Total Raised</span>
                  <div className="font-serif text-xl font-bold text-[#381602] mt-0.5">
                    ₹{selectedShopForDetails.totalCollected.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Transactions</span>
                  <div className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                    {selectedShopForDetails.transactionsCount}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">Standees</span>
                  <div className="font-serif text-xl font-bold text-emerald-900 mt-0.5">
                    {selectedShopForDetails.activeStandees} Active
                  </div>
                </div>
              </div>

              {/* Contact & Legal Grid */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 uppercase text-[10px] tracking-wider">
                  Store Identity & Legal Details
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Owner:</span>
                    <span className="font-bold text-stone-800">{selectedShopForDetails.owner}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Mobile:</span>
                    <span className="font-mono font-medium">{selectedShopForDetails.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Email:</span>
                    <span className="font-medium">{selectedShopForDetails.email}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">GSTIN:</span>
                    <span className="font-mono font-semibold">{selectedShopForDetails.gstin || 'None'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block text-[10px]">Full Address:</span>
                    <span>{selectedShopForDetails.address}, {selectedShopForDetails.city}, {selectedShopForDetails.state} - {selectedShopForDetails.pincode}</span>
                  </div>
                </div>
              </div>

              {/* Standee Action Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFFDF9] to-[#FFF6EC] border border-[#F3DEC8] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#381602]">Counter Standee Artwork</h4>
                  <p className="text-[11px] text-stone-500">QR Code token: {selectedShopForDetails.qrId}</p>
                </div>
                <button
                  onClick={() => setActivePrintStandeeModal(selectedShopForDetails)}
                  className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white rounded-xl font-bold shadow-xs transition flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View & Print Standee</span>
                </button>
              </div>

              {/* Shop Specific Transactions History */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#381602] mb-2">
                  Recent Donor Transactions at this Counter
                </h4>
                {getShopTransactions(selectedShopForDetails.id).length > 0 ? (
                  <div className="border border-stone-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="p-2.5">Txn ID</th>
                          <th className="p-2.5">Donor</th>
                          <th className="p-2.5">Amount</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {getShopTransactions(selectedShopForDetails.id).map(t => (
                          <tr key={t.id} className="hover:bg-stone-50">
                            <td className="p-2.5 font-mono font-bold text-stone-800">{t.id}</td>
                            <td className="p-2.5 font-medium">{t.customerName}</td>
                            <td className="p-2.5 font-bold text-[#E87A1E]">₹{t.amount.toLocaleString('en-IN')}</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-stone-400 italic text-center py-4 bg-stone-50 rounded-2xl">
                    No transactions recorded for this counter in the current filter.
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
