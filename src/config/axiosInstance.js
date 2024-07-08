import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;

//setting axios.defaults.withCredentials = true ensures that all subsequent Axios requests will send cookies automatically without needing to set withCredentials in every request config.
// axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = import.meta.env.VITE_API_TIMEOUT;

export default axiosInstance;



//Axios lets us create custom instances for API requests.
// Each instance is a separate client that can carry its own configuration and options like base URLs, timeouts, and headers.
// This is particularly useful when you need to make multiple requests to the same API or when you want to apply consistent configuration options
//headers, which provide an additional source of information for each API call.
//https://rapidapi.com/guides/custom-axios-instance