// File: src/components/landing/SubjectCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface SubjectItem {
  id: string;
  code: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge: string;
  topics: string[];
}

export function SubjectCard({ subject }: { subject: SubjectItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-slate-400 transition-colors shadow-xs">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
            {subject.icon}
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
            {subject.badge}
          </span>
        </div>

        <div>
          <div className="text-[11px] font-mono text-slate-500 uppercase">
            {subject.code}
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            {subject.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {subject.description}
          </p>
        </div>

        {/* Daftar Topik Inti */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Cakupan Pembelajaran:
          </div>
          <div className="space-y-1">
            {subject.topics.map((topic, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                <span className="truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          href={subject.href}
          className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-900 hover:text-blue-900 transition-colors group"
        >
          <span>Eksplorasi Modul & Silabus</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
