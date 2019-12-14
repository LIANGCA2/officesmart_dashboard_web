export const HttpConfiguration = {
  baseURL: process.env.VUE_APP_BACKEND_API_BASE_URL,
  timeout: isNaN(parseInt(process.env.VUE_APP_HTTP_REQUEST_TIMEOUT)) ? 0 : parseInt(process.env.VUE_APP_HTTP_REQUEST_TIMEOUT),
  withCredentials: true,
  debug: process.env.NODE_ENV !== 'production'
}
