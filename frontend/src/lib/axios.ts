import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";
import { BASE_URL } from "./constant";


const axiosService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add the Authorization header
axiosService.interceptors.request.use(async (config) => {
    const auth = Cookies.get("auth");
    if (auth) {
        const { access } = JSON.parse(auth);
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

// Response interceptor to handle errors
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err)
);

// Function to refresh the authentication token
const refreshAuthLogic = async (failedRequest : any) => {
    const auth = Cookies.get("auth");
    if (auth) {
        const { refresh } = JSON.parse(auth);

        return axios.post("/token/refresh/", { refresh }, {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                Authorization: `Bearer ${refresh}`,
            },
        }).then((resp) => {
            const { access } = resp.data;
            // Update the Authorization header with the new access token
            failedRequest.response.config.headers["Authorization"] = `Bearer ${access}`;
            
            // Update the auth cookie with the new access token
            Cookies.set("auth", JSON.stringify({
                access, refresh
            }));

            return Promise.resolve();
        }).catch(() => {
            // If the refresh token is invalid, remove the auth cookie
            Cookies.remove("auth");
            return Promise.reject();
        });
    }
    return Promise.reject();
};

// Attach the refresh logic to the axios service
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export default axiosService;