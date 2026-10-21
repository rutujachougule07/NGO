import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  FileCheck2, 
  Bell, 
  ShieldCheck, 
  Palette, 
  Save, 
  CheckCircle2, 
  Lock, 
  Phone, 
  Mail, 
  Upload, 
  SlidersHorizontal 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminSettings() {
  const { foundationSettings, setFoundationSettings, logAudit } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('foundation'); // 'foundation' | 'receipt' | 'notifications' | 'security'
  const [form, setForm] = useState(foundationSettings);

  const handleSave = (e) => {
    e.preventDefault();
    setFoundationSettings(form);
    logAudit('Updated System Settings', 'Settings', `Saved parameters for ${activeTab}`);
    addToast('Administrative parameters and foundation preferences saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Settings className="w-3.5 h-3.5" />
            <span>Master System Configuration • Module #16</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Foundation & Platform Settings
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure trust statutory identities, Section 80G receipt numbering, high-value donation triggers, and banking security policies
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-[#F3DEC8] shadow-xs flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('foundation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'foundation'
              ? 'bg-[#E87A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FFF2E3]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Foundation & Trust Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('receipt')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'receipt'
              ? 'bg-[#E87A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FFF2E3]'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Receipt & 80G Configuration</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'notifications'
              ? 'bg-[#E87A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FFF2E3]'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notification & Alert Triggers</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'security'
              ? 'bg-[#E87A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FFF2E3]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security & Access Policies</span>
        </button>
      </div>

      {/* Main Settings Form Container */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-6">
        
        {/* Tab 1: Foundation Profile */}
        {activeTab === 'foundation' && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Trust Registration & Tax Exemption Numbers
              </h3>
              <p className="text-stone-500 text-[11px]">
                These details appear automatically on all computer-generated Section 80G donor receipts
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Official Legal Name</label>
                <input
                  type="text"
                  value={form.foundationName}
                  onChange={e => setForm({ ...form, foundationName: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Public Trust Reg. Number</label>
                <input
                  type="text"
                  value={form.trustRegistrationNo}
                  onChange={e => setForm({ ...form, trustRegistrationNo: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Income Tax PAN</label>
                <input
                  type="text"
                  value={form.panNumber}
                  onChange={e => setForm({ ...form, panNumber: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono font-bold text-[#A34805] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Section 80G Order Number</label>
                <input
                  type="text"
                  value={form.section80GNumber}
                  onChange={e => setForm({ ...form, section80GNumber: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Section 12A Registration</label>
                <input
                  type="text"
                  value={form.section12ANumber}
                  onChange={e => setForm({ ...form, section12ANumber: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Registered Trust Address</label>
              <input
                type="text"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Receipt Configuration */}
        {activeTab === 'receipt' && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Automated 80G Receipt Numbering & Signatories
              </h3>
              <p className="text-stone-500 text-[11px]">
                Define prefix codes, serial counters, and authorized signatory designations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Receipt Number Prefix</label>
                <input
                  type="text"
                  value={form.receiptPrefix}
                  onChange={e => setForm({ ...form, receiptPrefix: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Next Sequence Serial</label>
                <input
                  type="number"
                  value={form.nextReceiptSeq}
                  onChange={e => setForm({ ...form, nextReceiptSeq: Number(e.target.value) })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Authorized Signatory Name</label>
                <input
                  type="text"
                  value={form.signatoryName}
                  onChange={e => setForm({ ...form, signatoryName: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Signatory Title / Designation</label>
                <input
                  type="text"
                  value={form.signatoryDesignation}
                  onChange={e => setForm({ ...form, signatoryDesignation: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">Automatic Email & WhatsApp Dispatch</span>
                <span className="text-[11px] text-stone-500">Instantly deliver 80G tax PDF to donor mobile upon payment capture</span>
              </div>
              <input
                type="checkbox"
                checked={form.autoEmailReceipts}
                onChange={e => setForm({ ...form, autoEmailReceipts: e.target.checked })}
                className="w-4 h-4 text-[#E87A1E] rounded accent-[#E87A1E]"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Notification & Alert Triggers */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Instant Alert Thresholds & WhatsApp Dispatch
              </h3>
              <p className="text-stone-500 text-[11px]">
                Notify trustees and finance controller for significant donations and shop milestones
              </p>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">High-Value Donation Alert Trigger (₹)</label>
              <input
                type="number"
                value={form.highValueThreshold}
                onChange={e => setForm({ ...form, highValueThreshold: Number(e.target.value) })}
                className="w-full max-w-sm bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono font-bold text-[#E87A1E] focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Any counter QR donation exceeding this amount sends high-priority SMS and email alert to Managing Trustee.
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 block">WhatsApp Alerts for Donors</span>
                  <span className="text-[11px] text-stone-500">Send WhatsApp receipt confirmation via official Meta API</span>
                </div>
                <input
                  type="checkbox"
                  checked={form.whatsappAlerts}
                  onChange={e => setForm({ ...form, whatsappAlerts: e.target.checked })}
                  className="w-4 h-4 text-[#E87A1E] rounded accent-[#E87A1E]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 block">Daily End-of-Day SMS Digest</span>
                  <span className="text-[11px] text-stone-500">Dispatch daily total collections summary to registered finance phones</span>
                </div>
                <input
                  type="checkbox"
                  checked={form.smsAlerts}
                  onChange={e => setForm({ ...form, smsAlerts: e.target.checked })}
                  className="w-4 h-4 text-[#E87A1E] rounded accent-[#E87A1E]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Access Policies */}
        {activeTab === 'security' && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Security Policies & Session Timeout
              </h3>
              <p className="text-stone-500 text-[11px]">
                Enforce mandatory 2FA, session validity, and IP white-listing for finance controllers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Session Inactivity Timeout (Minutes)</label>
                <input
                  type="number"
                  value={form.sessionTimeoutMinutes}
                  onChange={e => setForm({ ...form, sessionTimeoutMinutes: Number(e.target.value) })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Allowed Office IP Subnets</label>
                <input
                  type="text"
                  value={form.allowedIpWhitelist}
                  onChange={e => setForm({ ...form, allowedIpWhitelist: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">Enforce Mandatory Two-Factor (2FA)</span>
                <span className="text-[11px] text-stone-500">Require OTP authenticator for Super Admin and Finance Manager logins</span>
              </div>
              <input
                type="checkbox"
                checked={form.twoFactorRequired}
                onChange={e => setForm({ ...form, twoFactorRequired: e.target.checked })}
                className="w-4 h-4 text-[#E87A1E] rounded accent-[#E87A1E]"
              />
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            Last modified: Today by Super Admin
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-95 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Foundation Parameters</span>
          </button>
        </div>

      </form>

    </div>
  );
}
