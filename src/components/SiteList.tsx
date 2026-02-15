import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSites } from '../services/siteService';
import { Loader2, AlertCircle } from 'lucide-react';
import { UpdateSiteForm } from './UpdateSiteForm';

export const SiteList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['sites', page],
    queryFn: () => fetchSites(page),
  });

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-500" /></div>;
  if (isError) return <div className="p-4 bg-red-50 text-red-700 flex items-center"><AlertCircle className="mr-2" /> Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-4">
      {data?.sites.map((site) => (
        <div key={site.id} className="p-4 border rounded bg-white shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-bold">{site.name}</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{site.status}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Capacity (MW)</p>
            <UpdateSiteForm site={site} />
          </div>
        </div>
      ))}
      <div className="flex justify-between pt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
        <span className="text-sm text-gray-600">Page {page}</span>
        <button disabled className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};