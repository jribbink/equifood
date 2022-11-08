import axios from 'axios';

// Fetcher for SWR
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
