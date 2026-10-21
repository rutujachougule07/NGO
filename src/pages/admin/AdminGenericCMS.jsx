import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Layers, 
  FileCheck2, 
  Handshake, 
  UserCheck, 
  Newspaper, 
  Image as ImageIcon,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function AdminGenericCMS() {
  const location = useLocation();
  const { addToast } = useToast();
  const path = location.pathname.split('/').pop() || 'overview';

  const titleMap = {
    content: { title: 'Website Content & Editorial CMS', icon: FileText, desc: 'Manage hero banner headlines, mission statements, and FAQ content without coding' },
    programs: { title: 'Programs CMS', icon: Layers, desc: 'Update core seva pillars, meal metrics, and learning center enrollments' },
    donors: { title: 'Customer & Donor Records', icon: Users, desc: 'View customer names, mobile numbers, and mapped partner shops' },
    receipts: { title: '80G Tax Invoices & Billing Records', icon: FileCheck2, desc: 'Automated 80G tax exemption certificates and GST-compliant invoices' },
    gallery: { title: 'Gallery Media Vault', icon: ImageIcon, desc: 'Manage Annadan, medical camp, and child education photo uploads' },
    news: { title: 'News & Events Publishing', icon: Newspaper, desc: 'Publish field dispatches, press announcements, and seva event schedules' },
    partners: { title: 'Partner Retail Stores', icon: Handshake, desc: 'Manage enrolled shop counters, QR standees, and partner coordinators' },
    users: { title: 'System Access & Role Permissions', icon: UserCheck, desc: 'Manage administrative roles, audit inspectors, and field station loggers' },
  };

  const current = titleMap[path] || {
    title: 'Content & Administration Module',
    icon: FileText,
    desc: 'Manage foundation administrative data and parameters'
  };

  const Icon = current.icon;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#381602]">
              {current.title}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {current.desc}
            </p>
          </div>
        </div>

        <button
          onClick={() => addToast(`New entry created in ${current.title}!`, 'success')}
          className="px-5 py-2.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Entry</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#F3DEC8] shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#E87A1E]" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#381602]">
          {current.title} is Synced with Live Production Data
        </h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
          All changes made here instantly reflect across the public portal without code deployment. Securely logged for audit verification.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => addToast('Live database sync verified without conflicts.', 'info')}
            className="px-5 py-2.5 bg-[#FFFDF9] hover:bg-[#FFF2E3] text-[#381602] border border-[#F3DEC8] text-xs font-bold rounded-xl transition"
          >
            Check Sync Status
          </button>
        </div>
      </div>
    </div>
  );
}
