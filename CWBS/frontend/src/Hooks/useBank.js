// Import Modules
import toast from "react-hot-toast";
import axios from '../lib/axios.lib';
import { create } from "zustand/react";

// Bank Hooks
export const useBank = create((set) => ({

    BankData: null,
    BankDataList: null,
    loading: false,
    addBankDetails: async ({ holder_name, ifsc_code, bank_account_number, branch_name, bank_name, balance_amount, cash, account_type }) => {

        set({ loading: true });

        try {

            const res = await axios.post('/bank/add_bank_details', { holder_name, ifsc_code, bank_account_number, branch_name, bank_name, balance_amount, cash, account_type })

            set({ BankData: res.data, loading: false });

            return toast.success("Added Bank Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ BankData: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Adding Bank Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    fetchBank: async () => {

        set({ loading: true });

        try {

            const res = await axios.get('/bank/get_bank_details');

            console.log(res.data.banks);

            set({ loading: false, BankDataList: res.data.banks });

        } catch (e) {

            set({ loading: false, BankDataList: null });

            toast.error(e.response.data.msg || "An error occurred Fetching a Bank Details data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    getBankDetailsById: async (id) => {

        set({ loading: true });

        try {

            const res = await axios.get(`/bank/get_bank_details/${id}`);

            console.log(res.data)

            set({ BankData: res.data.BankData, loading: false });

            return res.data.BankData;

        } catch (e) {

            console.error("Error fetching bank details:", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to fetch bank details" });

            return toast.error(e.response?.data?.msg || "Failed to fetch bank details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },
    updateBankDetails: async ({ holder_name, ifsc_code, bank_account_number, branch_name, bank_name, balance_amount, cash, account_type, id }) => {

        set({ loading: true });

        try {

            await axios.put(`/bank/update_bank_details/${id}`, { holder_name, ifsc_code, bank_account_number, branch_name, bank_name, balance_amount, cash, account_type });

            set({ loading: false });

            return toast.success("Bank Details updated successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ UpdatedBankDetail: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Updating a Bank Details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    deleteBankDetails: async (bank_id) => {

        set({ loading: true });

        try {

            await axios.delete(`/bank/delete_bank_details/${bank_id}`);

            set({ loading: false });
            
            return toast.success("Bank Detail deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response.data.msg || "An error occurred Deleting a Bank Detail", {
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