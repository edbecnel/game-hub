import axios from 'axios';

export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '39753f7c318d4ca4a62f0ea5c0395dee'
    }
})