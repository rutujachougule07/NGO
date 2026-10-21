import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  RefreshCw, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Lock, 
  Save, 
  Building2, 
  Radio, 
  ExternalLink 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminRazorpay() {
  const { 
    razorpayConfig, 
    toggleRazorpayMode, 
    updateRazorpayKeys, 
    testRazorpayConnection 
  } = useAdmin();
  const { addToast } = useToast();

  const [showSecret, setShowSecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [keyId, setKeyId] = useState(razorpayConfig.keyId);
  const [keySecret, setKeySecret] = useState(razorpayConfig.keySecret);

  const handleSaveKeys = (e) => {
    e.preventDefault();
    updateRazorpayKeys({ keyId, keySecret });
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(razorpayConfig.webhookUrl);
    addToast('Webhook URL copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Gateway Infrastructure • Module #11</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Razorpay Integration & Settlement Gateway
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Securely configure UPI QR webhooks, live credentials, automated settlement schedules, and statutory zero-fee NGO parameters
          </p>
        </div>

        {/* Live vs Test Mode Toggle */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[#F3DEC8] shadow-xs self-start">
          <span className="text-xs font-bold text-stone-600 pl-2">Mode:</span>
          <button
            onClick={toggleRazorpayMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              razorpayConfig.mode === 'Live'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-amber-500 text-white shadow-xs'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{razorpayConfig.mode} Environment</span>
          </button>
        </div>
      </div>

      {/* Gateway Status Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 p-6 rounded-3xl border border-emerald-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Gateway Health: {razorpayConfig.connectionStatus}
              </h3>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Live webhook response: <strong className="text-emerald-800">{razorpayConfig.webhookStatus}</strong> • Latency: <strong>{razorpayConfig.syncLatency}</strong> • Last Sync: {razorpayConfig.lastSyncTime}
            </p>
          </div>
        </div>

        <button
          onClick={testRazorpayConnection}
          className="px-4 py-2 bg-white hover:bg-stone-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs active:scale-95 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Simulate Ping</span>
        </button>
      </div>

      {/* Two-Column Grid: Credentials Form & Settlement Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Secure Credentials Form */}
        <form onSubmit={handleSaveKeys} className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#381602] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#E87A1E]" />
              <span>Razorpay API Credentials</span>
            </h3>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Encrypted AES-256
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={keyId}
                onChange={e => setKeyId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-stone-700 block">Key Secret</label>
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-[11px] font-semibold text-[#A34805] hover:underline flex items-center gap-1"
                >
                  {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSecret ? 'Hide Key' : 'Reveal Key'}</span>
                </button>
              </div>
              <input
                type={showSecret ? 'text' : 'password'}
                value={keySecret}
                onChange={e => setKeySecret(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Never share or paste this Secret in public repositories.
              </span>
            </div>

            {/* Webhook Endpoint */}
            <div className="pt-2 border-t border-stone-100">
              <label className="font-bold text-stone-700 block mb-1">Webhook Listener Endpoint</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={razorpayConfig.webhookUrl}
                  className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2 font-mono text-stone-600 text-[11px]"
                />
                <button
                  type="button"
                  onClick={handleCopyWebhook}
                  className="p-2 border border-stone-300 rounded-xl hover:bg-stone-50 text-stone-700 transition shrink-0"
                  title="Copy URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white rounded-xl text-xs font-bold transition shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Verify Keys</span>
            </button>
          </div>
        </form>

        {/* Settlement Account Overview */}
        <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#E87A1E]" />
                <span>Designated Trust Settlement Account</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F3DEC8] space-y-1.5">
                <div className="text-[10px] font-bold text-stone-400 uppercase">Beneficiary Name</div>
                <div className="font-bold text-stone-900">{razorpayConfig.settlementAccount.accountHolder}</div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Bank:</span>
                    <span className="font-semibold text-stone-800">{razorpayConfig.settlementAccount.bankName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Account No:</span>
                    <span className="font-mono font-bold text-stone-800">{razorpayConfig.settlementAccount.accountNumberMasked}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">IFSC Code:</span>
                    <span className="font-mono font-semibold">{razorpayConfig.settlementAccount.ifsc}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Branch:</span>
                    <span>{razorpayConfig.settlementAccount.branch}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 text-[11px] space-y-1">
                <span className="font-bold text-stone-900 block">Automated Payout Cycle:</span>
                <p>{razorpayConfig.settlementAccount.cycle}</p>
                <p className="text-emerald-700 font-bold">
                  ✓ Section 80G Merchant Commission Waived (0% Platform Cut)
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-stone-400 border-t border-stone-100 pt-3">
            Changes to settlement bank account require Managing Trustee 2FA Authorization.
          </div>
        </div>

      </div>

      {/* Webhook Events Checklist & Recent Sync Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Events */}
        <div className="bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#381602]">
            Subscribed Webhook Events
          </h3>
          <p className="text-xs text-stone-500">
            Real-time listener hooks dispatching instant WhatsApp 80G receipts
          </p>

          <div className="space-y-2 pt-2">
            {razorpayConfig.activeEvents.map(evt => (
              <div key={evt.event} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-[#381602] block">{evt.event}</span>
                  <span className="text-[10px] text-stone-400">{evt.desc}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Live Sync Activity Log */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#F3DEC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#381602]">
                Recent Synchronization Activity Log
              </h3>
              <p className="text-xs text-stone-500">
                Incoming webhook payloads from Razorpay production servers
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              All Systems Operational
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFFDF9] border-b border-[#F3DEC8] text-stone-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Event Type</th>
                  <th className="py-2.5 px-3">Txn ID</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Latency</th>
                  <th className="py-2.5 px-3 text-right">HTTP Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {razorpayConfig.syncLogs.map(log => (
                  <tr key={log.id} className="hover:bg-stone-50">
                    <td className="py-3 px-3 font-mono font-bold text-[#381602]">{log.event}</td>
                    <td className="py-3 px-3 font-mono text-stone-600">{log.txnId}</td>
                    <td className="py-3 px-3 font-bold text-[#E87A1E]">{log.amount}</td>
                    <td className="py-3 px-3 text-stone-500 text-[11px]">{log.timestamp}</td>
                    <td className="py-3 px-3 text-stone-500 font-mono text-[11px]">{log.latency}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
