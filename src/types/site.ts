export interface Site {
    id: string;
    name: string;
    capacity: number;
    status: 'active' | 'inactive' | 'maintenance'; // Added status for better UI
  }
  
  export interface SitesResponse {
    sites: Site[];
    pagination: {
      page: number;
      total: number;
      limit: number;
    };
  }