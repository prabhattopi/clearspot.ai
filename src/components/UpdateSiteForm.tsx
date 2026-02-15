import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Site } from '../types/site';
import { Loader2, Save } from 'lucide-react';

interface UpdateSiteFormProps {
  site: Site;
}

export const UpdateSiteForm = ({ site }: UpdateSiteFormProps) => {
  const [capacity, setCapacity] = useState(site.capacity);
  const queryClient = useQueryClient();

  // Task 3.2: Mutation with Optimistic Update
  const mutation = useMutation({
    mutationFn: (newCapacity: number) => {
      return api.put<Site>(`/sites/${site.id}`, { capacity: newCapacity });
    },
    // When mutate is called:
    onMutate: async (newCapacity) => {
      // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['sites'] });

      // 2. Snapshot the previous value
      const previousSites = queryClient.getQueryData(['sites']);

      // 3. Optimistically update to the new value
      queryClient.setQueryData(['sites'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          sites: old.sites.map((s: Site) => 
            s.id === site.id ? { ...s, capacity: newCapacity } : s
          ),
        };
      });

      // Return context object with the snapshot
      return { previousSites };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, _newCapacity, context) => {
      queryClient.setQueryData(['sites'], context?.previousSites);
      alert(`Update failed: ${err.message}`);
    },
    // Always refetch after error or success to ensure server sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(capacity);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 mt-2">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Update Capacity (MW)
        </label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {mutation.isPending ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span className="ml-2">Save</span>
      </button>
    </form>
  );
};