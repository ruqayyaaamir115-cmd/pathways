/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar, SearchArea, FilterSidebar, EmployabilityDashboard, JobCard, AdvicePortal, Footer } from './components/Layout';
import { Job } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col text-brand-ink">
      <Navbar />
      <SearchArea />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 flex gap-8">
        <FilterSidebar />
        
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-brand-primary">
              Recommended for you <span className="text-brand-accent font-normal ml-1">({jobs.length})</span>
            </h2>
            <div className="text-xs text-brand-secondary flex gap-4">
              <span>Sort by: <span className="text-brand-primary font-bold cursor-pointer">Newest First</span></span>
            </div>
          </div>

          <div className="flex flex-col gap-3 h-[calc(100vh-320px)] overflow-y-auto pr-3 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 bg-white border border-brand-border animate-pulse rounded-2xl" />
                ))
              ) : (
                jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            <AdvicePortal />
          </div>
        </div>

        <EmployabilityDashboard />
      </main>

      <Footer />
    </div>
  );
}

