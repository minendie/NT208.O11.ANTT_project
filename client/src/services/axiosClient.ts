import { createAxiosClient } from "./createAxiosClient";


function getCurrentAccessToken() {
    return localStorage.getItem('jwtToken');
}

async function logout() {
    localStorage.clear() // clear the local storage 
    console.log('logout.....')
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const client = createAxiosClient({
    options: {
        baseURL: API_ENDPOINT,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true,
        }
    },
    getCurrentAccessToken,
    logout
})