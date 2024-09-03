import axios from 'axios';

import { CONFIG } from './config';

/** Http. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
