import React from 'react';
import { motion } from 'motion/react';
import { Search, Briefcase, MapPin, ArrowRight, Sparkles, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Job } from '@/src/types';

export function Navbar() {
  return (
    <nav className="h-16 flex items-center justify-between px-8 bg-white border-b border-brand-border sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <span className="text-xl font-semibold tracking-tight">Pathways</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-secondary">
        <a href="#opportunities" className="text-brand-primary border-b-2 border-brand-primary pb-1">Opportunities</a>
        <a href="#advice" className="hover:text-brand-primary transition-colors">Career Advice</a>
        <a href="#" className="hover:text-brand-primary transition-colors">Resume Builder</a>
        <a href="#" className="hover:text-brand-primary transition-colors">Mentorship</a>
      </div>
      <button className="px-5 py-2 bg-brand-primary text-white rounded-full text-sm font-medium shadow-sm hover:opacity-90 transition-opacity">
        My Profile
      </button>
    </nav>
  );
}

export function SearchArea() {
  return (
    <div className="p-6 bg-white border-b border-brand-border bg-gradient-to-b from-white to-brand-bg/30">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Job title, keywords, or company" 
            className="w-full pl-10 pr-4 py-3 bg-brand-muted rounded-xl border-none text-sm focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
          <div className="absolute left-3 top-3.5 opacity-40">
            <Search className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full md:w-64 relative">
          <input 
            type="text" 
            defaultValue="Greater Metro Area" 
            className="w-full pl-10 pr-4 py-3 bg-brand-muted rounded-xl border-none text-sm focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
          <div className="absolute left-3 top-3.5 opacity-40">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        <button className="px-8 py-3 bg-brand-secondary text-white rounded-xl font-medium hover:bg-brand-primary transition-colors shadow-sm">
          Search Jobs
        </button>
      </div>
    </div>
  );
}

export function FilterSidebar() {
  return (
    <aside className="w-56 space-y-6 shrink-0 hidden lg:block">
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-brand-accent mb-3">Job Type</h3>
        <ul className="space-y-3">
          {["Full-time", "Internship", "Part-time", "Remote"].map((type) => (
            <li key={type} className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  type === "Internship" ? "bg-brand-primary border-brand-primary text-white" : "bg-white border-brand-border group-hover:border-brand-primary"
                )}>
                  {type === "Internship" && <Check className="w-3 h-3" />}
                </div>
                <span className={cn(
                  "text-[13px] transition-colors",
                  type === "Internship" ? "font-medium text-brand-ink" : "text-brand-secondary group-hover:text-brand-primary"
                )}>
                  {type}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-brand-accent mb-3">Experience</h3>
        <ul className="space-y-3">
          {["Entry Level", "Mid Level", "Senior"].map((level) => (
            <li key={level} className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  level === "Entry Level" ? "bg-brand-primary border-brand-primary text-white" : "bg-white border-brand-border group-hover:border-brand-primary"
                )}>
                  {level === "Entry Level" && <Check className="w-3 h-3" />}
                </div>
                <span className={cn(
                  "text-[13px] transition-colors",
                  level === "Entry Level" ? "font-medium text-brand-ink" : "text-brand-secondary group-hover:text-brand-primary"
                )}>
                  {level}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-brand-border rounded-2xl">
        <p className="text-[11px] font-bold uppercase tracking-tight text-brand-primary mb-1 italic">Professional Insight</p>
        <p className="text-xs leading-relaxed text-brand-secondary">
          Internships at local agencies are often unlisted. Cold outreach can boost your success rate by 40%.
        </p>
      </div>
    </aside>
  );
}

export function EmployabilityDashboard() {
  return (
    <aside className="w-64 flex flex-col gap-6 shrink-0 hidden xl:flex">
      <div className="bg-brand-primary text-white p-6 rounded-[2rem] shadow-sm">
        <p className="text-[10px] uppercase tracking-widest opacity-80 mb-2">Fast-Track Goal</p>
        <h3 className="text-xl font-semibold mb-6 leading-tight">Get Hired in <span className="underline underline-offset-4 decoration-brand-border/40 text-brand-bg">30 Days</span></h3>
        <div className="space-y-5">
          {[
            { num: "01", text: "Optimize CV keywords" },
            { num: "02", text: "3 Virtual coffees per week" },
            { num: "03", text: "Draft personalized cover letters", active: true },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-3">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[10px]",
                item.active ? "bg-white/10" : "border border-white/20"
              )}>
                {item.num}
              </div>
              <p className={cn("text-[12px] opacity-90", item.active && "font-bold")}>{item.text}</p>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 py-2.5 bg-brand-bg text-brand-primary rounded-xl text-xs font-bold hover:brightness-95 transition-all">
          Join Workshops
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-soft">
        <h3 className="text-[13px] font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          Upcoming Deadlines
        </h3>
        <div className="space-y-4">
          <DeadlineItem title="City Council Grant" time="2 days" urgent />
          <DeadlineItem title="Graduate Program A" time="5 days" />
          <DeadlineItem title="Dev Fellowship 2026" time="1 week" />
        </div>
      </div>
    </aside>
  );
}

function DeadlineItem({ title, time, urgent }: { title: string; time: string; urgent?: boolean }) {
  return (
    <div className="flex justify-between items-center group cursor-default">
      <p className="text-[12px] font-medium text-brand-ink group-hover:text-brand-primary transition-colors">{title}</p>
      <p className={cn(
        "text-[10px] font-bold uppercase",
        urgent ? "text-red-500" : "text-brand-secondary"
      )}>{time}</p>
    </div>
  );
}

export function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      whileHover={{ borderColor: "var(--color-brand-primary)" }}
      className="bg-white p-5 rounded-2xl border border-brand-border transition-colors cursor-pointer group shadow-soft"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-brand-muted rounded-xl flex items-center justify-center text-brand-primary font-bold text-lg">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-[15px] group-hover:text-brand-primary transition-colors">{job.title}</h3>
            <p className="text-[12px] text-brand-secondary">{job.company} • {job.location}</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-3 py-1 bg-brand-muted rounded-full">
          Posted {job.posted}
        </span>
      </div>
      <p className="text-[13px] text-brand-secondary line-clamp-2 mb-4 leading-relaxed font-light">
        {job.description}
      </p>
      <div className="flex gap-2">
        {job.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-1 bg-brand-border text-brand-primary rounded font-medium">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function AdvicePortal() {
  const [prompt, setPrompt] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const getAdvice = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch("/api/career-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAdvice(data.advice);
    } catch (err) {
      setAdvice("I'm sorry, I couldn't reach the mentor right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="advice" className="mt-8 p-6 bg-white border border-brand-border rounded-[2rem] shadow-soft">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold italic text-brand-primary">The Career Mentor</h2>
          <p className="text-xs text-brand-secondary">Ask for gentle guidance on your career path.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <textarea
          placeholder="e.g., 'How do I explain a gap in my resume as a student?'"
          className="w-full p-4 bg-brand-muted/50 border border-brand-border rounded-xl h-24 text-[13px] focus:outline-none focus:ring-1 focus:ring-brand-primary/30 transition-all resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-brand-secondary italic">Powered by Gemini Labs</p>
          <button 
            onClick={getAdvice}
            disabled={loading}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg text-xs font-bold hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {loading ? "Seeking Insight..." : "Seek Advice"}
          </button>
        </div>
        
        {advice && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 bg-brand-muted rounded-xl border-l-4 border-brand-primary text-[13px] text-brand-ink leading-relaxed"
          >
            {advice}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-brand-border bg-white mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-accent rounded flex items-center justify-center text-white">
            <span className="text-[10px] font-bold">P</span>
          </div>
          <span className="text-sm font-semibold tracking-tight">Pathways</span>
          <span className="text-[10px] text-brand-secondary ml-4">© 2026 Pathfind Enterprise</span>
        </div>
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-wider text-brand-secondary">
          <a href="#" className="hover:text-brand-primary">Privacy</a>
          <a href="#" className="hover:text-brand-primary">Terms</a>
          <a href="#" className="hover:text-brand-primary">Ethics</a>
          <a href="#" className="hover:text-brand-primary">Contact</a>
        </div>
      </div>
    </footer>
  );
}
