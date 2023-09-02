/** @format */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const customAxiosApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

const globalConfig: RetryConfig = {
  retry: 3,
  retryDelay: 1000,
};

customAxiosApi.interceptors.response.use(
  (response) => response,
  (err) => {
    const { config } = err;

    if (!config || !config.retry) {
      return Promise.reject(err);
    }
    config.retry -= 1;
    const delayRetryRequest = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("retry the request", config.url);
        resolve();
      }, config.retryDelay || 1000);
    });
    return delayRetryRequest.then(() => customAxiosApi(config));
  }
);
export { customAxiosApi, globalConfig };
