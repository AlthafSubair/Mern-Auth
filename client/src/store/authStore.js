import {create} from 'zustand';
import axios from 'axios'

const API_URL = "https://mern-auth-4hju.onrender.com/api/auth";

axios.defaults.withCredentials = true;

export const userAuthStore = create((set) => ({
    user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

    signup: async(email,password, name) =>{
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/signin`, {email, password, name})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
        }
    },

    verifyemail: async(code) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/verfy-email`, {code})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            set({ error: error.response.data.message || "Error Verifying email", isLoading: false });
			throw error;
        }
    },
    login: async(email, password) =>{
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password})
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
            
        } catch (error) {
            set({ error: error.response.data.message || "Error Loging", isLoading: false });
			throw error;
        }
    },
    checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check_auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
    forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot_password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset_password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
}))