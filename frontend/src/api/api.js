import { api, setAuthToken } from "./client";
import { AuthAPI } from "./endpoints";

// Create a default export that is the API instance
const API = api;

// Export the setToken function
export const setToken = setAuthToken;

// Export named exports for API endpoints
export const AuthEndpoints = AuthAPI;

// Export everything from client for backward compatibility
export { api, setAuthToken };

export default API;
