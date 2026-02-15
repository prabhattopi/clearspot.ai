import type { SitesResponse } from '../types/site';

// MOCK DATA
const MOCK_SITES = [
  { id: '1', name: 'Orlando Solar Farm', capacity: 45, status: 'active' as const },
  { id: '2', name: 'Tampa Bay Station', capacity: 20, status: 'maintenance' as const },
  { id: '3', name: 'Miami Grid Node', capacity: 12, status: 'inactive' as const },
  { id: '4', name: 'Jacksonville Hub', capacity: 60, status: 'active' as const },
];

export const fetchSites = async (page: number = 1): Promise<SitesResponse> => {
  // SIMULATE NETWORK DELAY (1 second)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    sites: MOCK_SITES,
    pagination: {
      page: page,
      total: MOCK_SITES.length,
      limit: 10,
    },
  };
};