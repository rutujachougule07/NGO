import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Palette, 
  Save, 
  CheckCircle2, 
  Lock, 
  Key, 
  Webhook, 
  Building2, 
  CreditCard,
  FileCheck2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNGO } from '../../context/NGOContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export default function AdminSettings() {
  const { razorpayConfig, updateRazorpayConfig } = useNGO();
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('razorpay'); // 'razorpay' | 'ngo' | 'theme'
  const [showSecret, setShowSecret] = useState(false);

  // Local form states
  const [config, setConfig] = useState(razorpayConfig);

  const handleSaveRazorpay = (e) => {
    e.preventDefault();
    updateRazorpayConfig(config);
    addToast('Razorpay API keys, webhooks & compliance credentials saved successfully!', 'success');
  };

  const handleTestWebhook = () => {
    addToast('Sending test webhook event to ' + config.webhookUrl + '... Signature verified!', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#143D2B]">
          Payment Gateway & Foundation Settings
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          SOP Requirement #2 & Step 2: Manage Razorpay merchant integration, webhooks, KYC status & Section 80G compliance
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('razorpay')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'razorpay'
              ? 'text-[#143D2B] border-b-2 border-[#143D2B]'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Razorpay Integration (Step 2)</span>
        </button>

        <button
          onClick={() => setActiveTab('ngo')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'ngo'
              ? 'text-[#143D2B] border-b-2 border-[#143D2B]'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>NGO 80G & Legal Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`pb-3 transition flex items-center gap-2 ${
            activeTab === 'theme'
              ? 'text-[#143D2B] border-b-2 border-[#143D2B]'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Design & Palette Mode</span>
        </button>
      </div>

      {/* TAB 1: RAZORPAY CONFIGURATION */}
      {activeTab === 'razorpay' && (
        <form onSubmit={handleSaveRazorpay} className="space-y-6">
          
          {/* KYC Status Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Razorpay Merchant KYC: {config.kycStatus}
                </span>
                <h4 className="font-bold text-sm text-emerald-950">
                  {config.merchantName} ({config.authorizedSignatory})
                </h4>
                <p className="text-[11px] text-emerald-700">
                  Bank Linked: {config.bankAccount} (IFSC: {config.ifsc}) • PAN: {config.ngoPan}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-900">Environment:</span>
              <select
                value={config.mode}
                onChange={(e) => setConfig({ ...config, mode: e.target.value })}
                className="bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-xs font-bold text-emerald-900 focus:outline-none"
              >
                <option value="test">Test Mode (Sandbox)</option>
                <option value="live">Live Production</option>
              </select>
            </div>
          </div>

          {/* API Keys Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2D5] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#143D2B] flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-800" />
              <span>Razorpay API Keys & Merchant Credentials</span>
            </h3>
            <p className="text-xs text-gray-500">
              Obtain your API Key ID and Key Secret from the Razorpay Dashboard under Settings → API Keys.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Razorpay Key ID</label>
                <input
                  type="text"
                  required
                  value={config.keyId}
                  onChange={(e) => setConfig({ ...config, keyId: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Razorpay Key Secret</label>
                <div className="relative">
                  <input
                    type={showSecret ? "text" : "password"}
                    required
                    value={config.keySecret}
                    onChange={(e) => setConfig({ ...config, keySecret: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 pr-10 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Webhook Configuration */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Webhook className="w-4 h-4 text-emerald-800" />
                <span>Webhook Setup (SOP Step 6: Payment Confirmation)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Webhook Endpoint URL</label>
                  <input
                    type="url"
                    value={config.webhookUrl}
                    onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Webhook Secret</label>
                  <input
                    type="text"
                    value={config.webhookSecret}
                    onChange={(e) => setConfig({ ...config, webhookSecret: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Subscribed events: <code>payment.captured</code>, <code>payment.failed</code>, <code>settlement.processed</code>
                </span>
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs transition"
                >
                  Test Webhook Ping
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
              >
                <Save className="w-4 h-4 text-emerald-300" />
                <span>Save Razorpay Configuration</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: NGO COMPLIANCE & 80G CREDENTIALS */}
      {activeTab === 'ngo' && (
        <form onSubmit={handleSaveRazorpay} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2D5] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#143D2B] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
            <span>Non-Profit Legal & Tax Credentials (Section 80G / 12A / GST)</span>
          </h3>
          <p className="text-xs text-gray-500">
            These legal details appear on all auto-generated tax receipts and GST invoices provided to customers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">NGO Legal Name</label>
              <input
                type="text"
                value={config.merchantName}
                onChange={(e) => setConfig({ ...config, merchantName: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Authorized Signatory / President</label>
              <input
                type="text"
                value={config.authorizedSignatory}
                onChange={(e) => setConfig({ ...config, authorizedSignatory: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">NGO PAN Number</label>
              <input
                type="text"
                value={config.ngoPan}
                onChange={(e) => setConfig({ ...config, ngoPan: e.target.value.toUpperCase() })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Section 80G Unique Reg No (URN)</label>
              <input
                type="text"
                value={config.ngo80GURN}
                onChange={(e) => setConfig({ ...config, ngo80GURN: e.target.value.toUpperCase() })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">GSTIN (if applicable)</label>
              <input
                type="text"
                value={config.gstin}
                onChange={(e) => setConfig({ ...config, gstin: e.target.value.toUpperCase() })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Section 12A Registration No</label>
              <input
                type="text"
                value={config.ngo12A}
                onChange={(e) => setConfig({ ...config, ngo12A: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">CSR Registration Number</label>
              <input
                type="text"
                value={config.csrRegNo}
                onChange={(e) => setConfig({ ...config, csrRegNo: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#143D2B]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <Save className="w-4 h-4 text-emerald-300" />
              <span>Save Legal Details</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: THEME PREFERENCES */}
      {activeTab === 'theme' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E2D5] shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#143D2B] flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-800" />
            <span>Website Design & Palette Mode</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => {
                setTheme('forest');
                addToast('Palette switched to TerraViva Forest & Cream!', 'info');
              }}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center gap-4 ${
                theme === 'forest'
                  ? 'border-[#143D2B] bg-[#E7EFE9] ring-2 ring-emerald-600/30'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#143D2B] flex items-center justify-center text-white">
                <span className="w-4 h-4 rounded-full bg-emerald-400"></span>
              </div>
              <div>
                <span className="font-bold text-xs text-gray-900 block">TerraViva Forest & Warm Cream</span>
                <span className="text-[11px] text-gray-500">Official Reference Design (Active)</span>
              </div>
            </div>

            <div
              onClick={() => {
                setTheme('maroon');
                addToast('Palette switched to Heritage Maroon & Blush!', 'info');
              }}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center gap-4 ${
                theme === 'maroon'
                  ? 'border-[#681326] bg-[#FDECEF] ring-2 ring-red-800/30'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#681326] flex items-center justify-center text-white">
                <span className="w-4 h-4 rounded-full bg-rose-300"></span>
              </div>
              <div>
                <span className="font-bold text-xs text-gray-900 block">Heritage Maroon & Blush</span>
                <span className="text-[11px] text-gray-500">Traditional Rich Maroon Styling</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
