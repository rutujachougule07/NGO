import React, { useState } from 'react';
import { X, Store, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';

export default function AddShopModal({ isOpen, onClose, initialData = null, onSave = null }) {
  const { addShop, updateShop } = useAdmin();

  const [formData, setFormData] = useState({
    name: initialData ? initialData.name : '',
    owner: initialData ? initialData.owner : '',
    phone: initialData ? initialData.phone : '',
    email: initialData ? initialData.email : '',
    address: initialData ? initialData.address : '',
    city: initialData ? initialData.city : 'Bengaluru',
    state: initialData ? initialData.state : 'Karnataka',
    pincode: initialData ? initialData.pincode : '',
    category: initialData ? initialData.category : 'Cafe & Eatery',
    gstin: initialData ? initialData.gstin : '',
    upiId: initialData ? initialData.upiId : '',
    targetCause: initialData ? initialData.targetCause : 'Annadan & Child Nutrition',
    activeStandees: initialData ? initialData.activeStandees : 1,
    status: initialData ? initialData.status : 'Active'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Shop name is required';
    if (!formData.owner.trim()) errs.owner = 'Owner name is required';
    if (!formData.phone.trim()) errs.phone = 'Valid 10-digit mobile number required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData) {
      updateShop(initialData.id, formData);
      if (onSave) onSave(formData);
    } else {
      addShop(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                {initialData ? 'Edit Merchant Shop Profile' : 'Onboard New Partner Merchant'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Setup shop identity, counter QR assignment, and mapped seva causes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Shop Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Kaveri Organic Mart"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E] ${
                  errors.name ? 'border-red-400' : 'border-stone-200'
                }`}
              />
              {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Owner / Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patel"
                value={formData.owner}
                onChange={e => setFormData({ ...formData, owner: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E] ${
                  errors.owner ? 'border-red-400' : 'border-stone-200'
                }`}
              />
              {errors.owner && <span className="text-[10px] text-red-500">{errors.owner}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E] ${
                  errors.phone ? 'border-red-400' : 'border-stone-200'
                }`}
              />
              {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="owner@shopdomain.in"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              Store Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Shop number, building name, road"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E] ${
                errors.address ? 'border-red-400' : 'border-stone-200'
              }`}
            />
            {errors.address && <span className="text-[10px] text-red-500">{errors.address}</span>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">Pincode</label>
              <input
                type="text"
                placeholder="400001"
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              >
                <option value="Cafe & Eatery">Cafe & Eatery</option>
                <option value="Bookstore & Cafe">Bookstore & Cafe</option>
                <option value="Ayurveda & Wellness">Ayurveda & Wellness</option>
                <option value="Apparel & Handicrafts">Apparel & Handicrafts</option>
                <option value="Fitness & Wellness">Fitness & Wellness</option>
                <option value="Healthcare & Pharmacy">Healthcare & Pharmacy</option>
                <option value="Gourmet Food">Gourmet Food</option>
                <option value="Retail Store">Retail Store</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Mapped Seva Cause</label>
              <select
                value={formData.targetCause}
                onChange={e => setFormData({ ...formData, targetCause: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              >
                <option value="Annadan & Child Nutrition">Annadan & Child Nutrition</option>
                <option value="Tribal Healthcare Vans">Tribal Healthcare Vans</option>
                <option value="Rural Child Education Kits">Rural Child Education Kits</option>
                <option value="Women Artisan Livelihoods">Women Artisan Livelihoods</option>
                <option value="Elderly Healthcare & Yoga Seva">Elderly Healthcare & Yoga Seva</option>
                <option value="Native Tree Plantation">Native Tree Plantation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">GSTIN (Optional)</label>
              <input
                type="text"
                placeholder="27AAACS1234P1ZX"
                value={formData.gstin}
                onChange={e => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Active Counter Standees</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.activeStandees}
                onChange={e => setFormData({ ...formData, activeStandees: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
          </div>

          {/* Status Switch */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-200">
            <div>
              <span className="font-bold text-stone-800 block">Active Status</span>
              <span className="text-[11px] text-stone-500">Enable payments & QR standee for this counter</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === 'Active'}
                onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Active' : 'Inactive' })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E87A1E]"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-100 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white rounded-xl font-bold shadow-sm transition active:scale-95"
            >
              {initialData ? 'Save Changes' : 'Enroll Shop & Generate QR'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
