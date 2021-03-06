import axios from 'axios';
import Auth from './auth';
import FactoryService from './factory';
import CompanyService from './company';

const request = axios.create({
  baseURL:
    process.env.API_BASE_URL || 'https://staging-duplica-api.herokuapp.com',
  responseType: 'json'
});
const auth = Auth(request);

request.interceptors.request.use((config) => {
  const configWithHeaders = config;
  configWithHeaders.headers.Authorization = `Bearer ${auth.getToken()}`;
  return configWithHeaders;
});

const factoryService = FactoryService(request);
const companyService = CompanyService(request);

export default {
  auth,
  factoryService,
  companyService
};
