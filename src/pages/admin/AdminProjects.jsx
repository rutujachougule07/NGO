import React, { useState } from 'react';
import { Plus, FolderKanban, Search, CheckCircle2, Clock, Users, ArrowUpRight, Heart } from 'lucide-react';
import { featuredProjects } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';

export default function AdminProjects() {
  const { addToast } = useToast();
  const [projects, setProjects] = useState(featuredProjects);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#143D2B]">
            Field Projects & Initiatives CMS
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor ground milestones, update funding goals, and deploy drone survey audits
          </p>
        </div>

        <button
          onClick={() => addToast('New project draft initialized! Complete the ecological survey form.', 'info')}
          className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#0E2E20] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-[#E7E2D5] shadow-xs flex flex-col justify-between">
            <div className="h-44 relative">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#143D2B]">
                {p.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800">{p.location}</span>
                <h3 className="font-bold text-sm text-gray-900 mt-0.5">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#143D2B] font-serif">${p.raised.toLocaleString()}</span>
                  <span className="text-gray-400">Target: ${p.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${Math.min(100, (p.raised / p.target) * 100)}%` }}></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => addToast(`Field update logged for ${p.title}!`, 'success')}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
