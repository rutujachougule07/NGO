import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  CheckCheck, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Store, 
  Receipt, 
  ShieldCheck, 
  X,
  Send
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export default function AdminNotifications() {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    addBroadcastNotification 
  } = useAdmin();
  const { addToast } = useToast();

  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastDesc, setBroadcastDesc] = useState('');

  const filtered = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                          n.desc.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || 
                        (filterType === 'Unread' && !n.read) ||
                        (filterType === n.type);
    return matchesSearch && matchesType;
  });

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim()) return;
    addBroadcastNotification(broadcastTitle, broadcastDesc);
    setBroadcastTitle('');
    setBroadcastDesc('');
    setIsBroadcastOpen(false);
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF2E3] text-[#A34805] text-xs font-bold mb-1 border border-[#F5DEC8]">
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts & Notifications • Module #13</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#381602]">
            Notifications Center
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time notifications for incoming donations, shop KYC submissions, webhook alerts, and statutory tax deadlines
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsBroadcastOpen(true)}
            className="px-4 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Send Alert</span>
          </button>
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alerts by title or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#FFFDF9] border border-[#DDD7C9] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Unread', 'transaction', 'shop', 'settlement', 'system'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize whitespace-nowrap ${
                filterType === type
                  ? 'bg-[#381602] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                !notif.read
                  ? 'bg-white border-[#E87A1E]/50 shadow-xs ring-1 ring-[#E87A1E]/20'
                  : 'bg-white/80 border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                  notif.severity === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : notif.severity === 'warning'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#FFF2E3] text-[#A34805] border-[#F5DEC8]'
                }`}>
                  {notif.type === 'transaction' && <Receipt className="w-5 h-5" />}
                  {notif.type === 'shop' && <Store className="w-5 h-5" />}
                  {notif.type === 'settlement' && <ShieldCheck className="w-5 h-5" />}
                  {notif.type === 'system' && <Info className="w-5 h-5" />}
                  {notif.type === 'broadcast' && <Bell className="w-5 h-5" />}
                  {notif.type === 'compliance' && <AlertCircle className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#381602]">
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#E87A1E]"></span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {notif.desc}
                  </p>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    {notif.time}
                  </span>
                </div>
              </div>

              {!notif.read && (
                <span className="text-[10px] font-bold text-[#E87A1E] shrink-0">
                  New
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-2">
            <Bell className="w-10 h-10 text-stone-300 mx-auto" />
            <h4 className="font-serif text-base font-bold text-stone-700">No Notifications Found</h4>
            <p className="text-xs text-stone-400">All alerts have been reviewed or matched no search filter.</p>
          </div>
        )}
      </div>

      {/* Broadcast Modal */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#381602] flex items-center gap-2">
                <Send className="w-4 h-4 text-[#E87A1E]" />
                <span>Send Admin Broadcast</span>
              </h3>
              <button
                onClick={() => setIsBroadcastOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Alert Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Server Maintenance or Campaign Target"
                  value={broadcastTitle}
                  onChange={e => setBroadcastTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Message Details</label>
                <textarea
                  rows="3"
                  placeholder="Provide instructions or updates for admin and finance teams..."
                  value={broadcastDesc}
                  onChange={e => setBroadcastDesc(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E87A1E]"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white font-bold rounded-xl shadow-xs transition"
                >
                  Dispatch Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
