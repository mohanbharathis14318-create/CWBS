// Import Modules
import toast from "react-hot-toast";
import axios from '../lib/axios.lib';
import { create } from "zustand/react";

// User Hooks
export const useUser = create((set) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    isLoggedIn: false,
    userList: null,
    register: async ({ user_name, user_password, confirm_password, user_phone, user_email, user_designation }) => {

        set({ loading: true });

        try {

            const res = await axios.post("/auth/register", { user_name, user_password, confirm_password, user_phone, user_email, user_designation });

            console.log(res.data);

            set({ user: res.data, loading: false });

            return toast.success("User registered successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response.data.msg || "An error occurred Registering a User", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }
    },
    login: async ({ user_email, user_phone, user_password , user_designation }) => {

        set({ loading: true });

        try {

            const res = await axios.post('/auth/login', { user_email, user_phone, user_password, user_designation });

            console.log(res.data);

            set({ user: res.data.user, isLoggedIn: true, loading: false });

        } catch (err) {

            set({ loading: false });

            toast.error(err.response.data.msg || "An error occurred", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }
    },
    checkAuth: async () => {

        set({ checkingAuth: true });

        try {

            const res = await axios.get("/auth/profile");

            console.log(res.data);

            set({ user: res.data.user, isLoggedIn: true, checkingAuth: false });

        } catch (err) {

            // Handle 401 error or others
            if (err.response?.status === 401) {
                console.warn("🔒 Not logged in: 401 Unauthorized");
            } else {
                console.error("❌ Auth check failed:", err.response?.data?.msg || err.message);
            }

            set({ user: null, isLoggedIn: false, checkingAuth: false });

        }

    },
    logout: async () => {

        set({ loading: true });

        try {

            await axios.post("/auth/logout");

            set({ user: null, isLoggedIn: false, loading: false });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg ||"An error occurred during logout", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },
    fetchAllUsers: async () => {

        set({ loading: true });

        try {

            const res = await axios.get("/auth/users");

            console.log(res.data);

            set({ userList: res.data.user, isLoggedIn: true, loading: false });


        } catch (e) {

            toast.error(e.response?.data?.msg ||"Failed to fetch users", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            set({ userList: null, isLoggedIn: false, loading: false });

        }

    },
    createUser: async ({ user_name, user_password, user_phone, user_email, user_designation }) => {

        set({ loading: true });

        try {

            const res = await axios.post('/auth/create_user', { user_name, user_password, user_phone, user_email, user_designation });

            console.log(res.data);

            set({ AddedUser: res.data, loading: false });

            return toast.success("User registered successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ AddedUser: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Creating a User", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    getUserById: async (id) => {

        set({ loading: true });

        try {

            const res = await axios.get(`/auth/get_user/${id}`);


            set({ userData: res.data, loading: false });

            return res.data;

        } catch (e) {
            set({ loading: false, error: e.response?.data?.msg || "Failed to fetch user" });
            toast.error(e.response?.data?.msg || "Failed to fetch user", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });
            console.error("Error fetching user:", e);
            return null;
        }
    },
    updateUser: async ({ user_name, user_password, user_phone, user_email, user_designation, id }) => {

        set({ loading: true });

        try {

            await axios.put(`/auth/update_user/${id}`, { user_name, user_password, user_phone, user_email, user_designation });

            set({ loading: false });

            return toast.success("User updated successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ UpdatedUser: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Updating a User", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    deleteUser: async (user_id) => {

        set({ loading: true });

        try {

            await axios.delete(`/auth/delete_user/${user_id}`);


            return toast.success("User deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response.data.msg || "An error occurred Deleting a User", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    }
}));

