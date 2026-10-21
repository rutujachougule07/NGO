import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  Calendar, 
  Search, 
  ExternalLink,
  Award
} from 'lucide-react';
import { auditReports, fundAllocation } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function ReportsPage() {
  const { addToast } = useToast();
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredReports = auditReports.filter(r => 
    selectedYear === 'All' || r.year.includes(selectedYear)
  );

  const handleDownload = (rep) => {
    addToast(`Preparing PDF: ${rep.title} (${rep.fileSize})... Download started!`, 'success');
  };

  return (
    <div className="bg-[#FDFBF7] py-14 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E87A1E]"></span>
            RADICAL TRANSPARENCY & GOVERNANCE
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#381602] leading-tight">
            Financial Statements & Seva Audits
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            We operate with complete clarity and open books. Review our independent auditor reports, tax filings, Annadan meal counts, and community relief reconciliations.
          </p>
        </div>

        {/* Fund Allocation Summary Card */}
        <div className="bg-white text-stone-900 p-8 sm:p-10 rounded-3xl border border-[#F3DEC8] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E87A1E]">
                Audited Financial Ledger FY 2025-2026
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] mt-1">
                Where Every Single Cent Goes
              </h2>
            </div>
            <div className="bg-[#FFF2E3] px-4 py-2 rounded-full border border-[#F5DEC8] flex items-center gap-2 text-xs font-bold text-[#A34805] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
              <span>100% Tax Deductible (80G / 501c3)</span>
            </div>
          </div>

          {/* Allocation Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-stone-100">
            <div style={{ width: `${fundAllocation.directField}%` }} className="bg-[#E87A1E] h-full" title="88% Direct Ground Seva"></div>
            <div style={{ width: `${fundAllocation.education}%` }} className="bg-[#F58220] h-full" title="7% Community Education"></div>
            <div style={{ width: `${fundAllocation.admin}%` }} className="bg-[#D2640C] h-full" title="5% Admin & Legal Compliance"></div>
          </div>

          {/* 3 Detail Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#FFF2E3]/60 p-4 rounded-2xl border border-[#F5DEC8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#381602]">88% Direct Field Seva</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E]"></span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct deployment for fresh grains, daily community Annadan, mobile dispensary medicines, emergency kits, and volunteer frontline supplies.
              </p>
            </div>

            <div className="bg-[#FFF2E3]/60 p-4 rounded-2xl border border-[#F5DEC8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#381602]">7% Community Education</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F58220]"></span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Student study materials, evening remedial classrooms, teacher stipends, and youth vocational skills workshops.
              </p>
            </div>

            <div className="bg-[#FFF2E3]/60 p-4 rounded-2xl border border-[#F5DEC8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#381602]">5% Admin & Legal Compliance</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D2640C]"></span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Independent statutory audits, regulatory compliance filings, bank encryption gateways, and transparent digital receipting.
              </p>
            </div>
          </div>
        </div>

        {/* Audit Reports List */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
              Downloadable Reports & Audits
            </h3>
            
            <div className="flex items-center gap-2">
              {['All', '2026', '2024', '2023'].map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                    selectedYear === year
                      ? 'bg-[#E87A1E] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-[#F3DEC8] hover:bg-[#FFF2E3]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.map(rep => (
              <div
                key={rep.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF2E3] text-[#E87A1E] border border-[#F5DEC8] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-[#A34805] bg-[#FFF2E3] px-2.5 py-0.5 rounded-full border border-[#F5DEC8]">
                        {rep.category}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">{rep.year}</span>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#381602]">
                      {rep.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                      {rep.subtitle}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#E87A1E] font-semibold mt-2">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {rep.auditOpinion}
                      </span>
                      <span>•</span>
                      <span className="text-stone-500">{rep.downloads.toLocaleString()} verified downloads</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(rep)}
                  className="px-6 py-3 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition active:scale-95 shrink-0 w-full sm:w-auto justify-center"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download {rep.fileSize}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
