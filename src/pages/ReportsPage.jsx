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
  Award,
  ChevronRight,
  Building,
  FileCheck2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { auditReports, fundAllocation } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export default function ReportsPage() {
  const { addToast } = useToast();
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Financial Audit', 'Impact Assessment', 'Governance & 80G'];

  const filteredReports = auditReports.filter(r => {
    const matchesYear = selectedYear === 'All' || r.year.includes(selectedYear);
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory || (selectedCategory === 'Financial Audit' && r.category.includes('Audit'));
    return matchesYear && matchesCat;
  });

  const handleDownload = (rep) => {
    addToast(`Downloading verified audit PDF: ${rep.title} (${rep.fileSize})... Complete!`, 'success');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Banner & Header */}
      <section className="bg-gradient-to-b from-[#FFF2E3]/70 via-[#FFFDF9] to-[#FDFBF7] pt-12 pb-16 border-b border-[#F3DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          


          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2E3] text-xs font-bold text-[#A34805] border border-[#F5DEC8] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E87A1E] animate-pulse"></span>
                STATUTORY DISCLOSURES & RADICAL FISCAL TRANSPARENCY
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#381602] leading-tight">
                Financial Statements & Seva Audits
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                We maintain open public books. Download independent statutory chartered accountant statements, annual returns, Section 80G filings, and geo-tagged Annadan meal reconciliations.
              </p>
            </div>

            {/* Certifications Badge */}
            <div className="bg-white p-4 rounded-2xl border border-[#F3DEC8] shadow-xs flex items-center gap-3 shrink-0">
              <ShieldCheck className="w-8 h-8 text-[#E87A1E] shrink-0" />
              <div>
                <span className="font-bold text-xs text-[#381602] block">Clean Audit Opinion</span>
                <span className="text-[11px] text-stone-500 block">Unqualified statutory certification</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        
        {/* Fund Allocation Summary Card */}
        <div className="bg-white text-stone-900 p-8 sm:p-12 rounded-3xl border border-[#F3DEC8] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E87A1E]">
                Audited Fund Utilization FY 2025-2026
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602] mt-1">
                Where Every Single Contribution Goes
              </h2>
            </div>
            <div className="bg-[#FFF2E3] px-4 py-2 rounded-full border border-[#F5DEC8] flex items-center gap-2 text-xs font-bold text-[#A34805] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#E87A1E]" />
              <span>100% Tax Deductible (80G / 501c3)</span>
            </div>
          </div>

          {/* Allocation Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-stone-100 shadow-inner">
            <div style={{ width: `${fundAllocation.directField}%` }} className="bg-[#E87A1E] h-full" title="88% Direct Ground Seva"></div>
            <div style={{ width: `${fundAllocation.education}%` }} className="bg-[#F58220] h-full" title="7% Community Education"></div>
            <div style={{ width: `${fundAllocation.admin}%` }} className="bg-[#D2640C] h-full" title="5% Admin & Legal Compliance"></div>
          </div>

          {/* 3 Detail Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#FFF2E3]/60 p-5 rounded-2xl border border-[#F5DEC8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#381602]">88% Direct Field Seva</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E87A1E]"></span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct deployment for bulk grain procurement, daily community kitchen cooking, mobile dispensary medicines, and emergency disaster kits.
              </p>
            </div>

            <div className="bg-[#FFF2E3]/60 p-5 rounded-2xl border border-[#F5DEC8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#381602]">7% Community Education</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F58220]"></span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tablets, science experiment kits, notebooks, evening remedial classrooms, and women's self-help tailoring stipends.
              </p>
            </div>

            <div className="bg-[#FFF2E3]/60 p-5 rounded-2xl border border-[#F5DEC8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#381602]">5% Admin & Governance</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D2640C]"></span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Statutory audit fees, digital server hosting, encryption gateways, and compliance filings with central charity commissioners.
              </p>
            </div>
          </div>
        </div>

        {/* Audit Reports List Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#381602]">
                Downloadable Reports & Filings
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Full-length PDF audits signed by certified public chartered accountants.
              </p>
            </div>
            
            {/* Year Filters */}
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
                      <span className="text-xs text-stone-500 font-medium font-mono">{rep.year}</span>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#381602]">
                      {rep.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                      {rep.subtitle}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#E87A1E] font-semibold mt-2.5">
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
                  className="px-6 py-3.5 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 shrink-0 w-full sm:w-auto justify-center"
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
