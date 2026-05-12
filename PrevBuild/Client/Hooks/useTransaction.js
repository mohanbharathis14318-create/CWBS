// Import Modules
import toast from "react-hot-toast";
import axios from '../lib/axios.lib';
import { create } from "zustand/react";


// Trxn Dashboard
const useTrxn = create((set) => ({

    budgetData: [],
    expenseData: [],
    loading: false,
    fetchBudgetExpense: async () => {

        set({ loading: true });

        try {

            const [budgetRes, expenseRes] = await Promise.all([

                axios.get('/budget/get_budget_details'),

                axios.get('/accounting/get_office_expenses'),

            ]);

            set({ budgetData: budgetRes.data.BudgetData, expenseData: expenseRes.data.OFE, loading: false });

        } catch (e) {

            set({ budgetData: [], expenseData: [], loading: false });

            toast.error(e.response.data.msg || "An error occurred Fetching Budget and Expense.", {
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

// Accounting Hooks

// || Office Investment
const useOfficeAccount = create((set) => ({

    OfficeAccountInvestmentData: null,
    OfficeAccountInvestmentDataList: null,
    loading: false,
    createAccountInvestment: async ({ daily_activity_type, date, particulars, investment_type, amount, payment_mode, transaction_remark }) => {

        set({ loading: true });

        try {

            const res = await axios.post('/accounting/create_office_investment', { daily_activity_type, date, particulars, investment_type, amount, payment_mode, transaction_remark })

            set({ OfficeAccountInvestmentData: res.data, loading: false });

            return toast.success("Added Office Investment Data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ OfficeAccountInvestmentData: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Creating Office Account Entries.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    fetchOfficeInvestment: async () => {

        try {

            const res = await axios.get('/accounting/get_account_office_investment');

            console.log(res.data);

            set({ OfficeAccountInvestmentDataList: res.data.ACI });

        } catch (e) {

            set({ OfficeAccountInvestmentDataList: null });

            toast.error(e.response.data.msg || "An error occurred Fetching a office investment data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    getAOIById: async (id) => {

        set({loading: true});

        try {

            const res = await axios.get(`/accounting/get_office_investment/${id}`);

            set({OfficeAccountInvestmentData: res.data.AOIData, loading: false});

            return res.data.AOIData;

        } catch (e) {

            console.error("Error fetching office investment details:", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to fetch office investment" });

            return toast.error(e.response?.data?.msg || "Failed to fetch office investment", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },
    updateOfficeInvestment: async ({ daily_activity_type, date, particulars, investment_type, amount, payment_mode, transaction_remark, id }) => {

        set({ loading: true });

        try {

            const res = await axios.put(`/accounting/update_office_investment/${id}`, { daily_activity_type, date, particulars, investment_type, amount, payment_mode, transaction_remark })

            set({ loading: false });

            return toast.success("Updated Office Investment Data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            toast.error(e.response.data.msg || "An error occurred Updating a office investment data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    deleteOfficeInvestment: async (aci_id) => {

        set({ loading: true });

        try {

            await axios.delete(`/accounting/delete_office_investment/${aci_id}`);

            set({ loading: false });

            return toast.success("Office investment Data deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred Deleting a Office Investment Data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.error(e)

        }

    },


    // Office Expense
    OfficeExpenseData: null,
    OfficeExpenseList: null,
    createOfficeExpense: async ({ daily_activity_type, date, particulars, type, base_amount, payment_mode, transaction_remark, discount, s_gst_percent, s_gst_amount, c_gst_percent, c_gst_amount, i_gst_percent, i_gst_amount, total_amount }) => {

        set({ loading: true });

        try {

            const res = await axios.post('/accounting/create_office_expenses', { daily_activity_type, date, particulars, type, base_amount, payment_mode, transaction_remark, discount, s_gst_percent, s_gst_amount, c_gst_percent, c_gst_amount, i_gst_percent, i_gst_amount, total_amount })

            set({ OfficeExpenseData: res.data, loading: false });

            return toast.success("Added Office Expense Data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ OfficeExpenseData: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Creating Office Expense Data.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    fetchOfficeExpense: async () => {

        try {

            const res = await axios.get('/accounting/get_office_expenses');

            console.log(res.data);

            set({ OfficeExpenseList: res.data.OFE });

        } catch (e) {

            set({ OfficeExpenseList: null });

            toast.error(e.response.data.msg || "An error occurred Fetching a office expense data", {
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


// || Cash In Hands
const useCashInHand = create((set) => ({

    CashInHandData: null,
    CashInHandDataList: null,
    loading: false,
    addCashInHandDetails: async ({ daily_activity, CIH_transaction_type, CIH_designation, CIH_holders_name, CIH_remarks, amount }) => {

        set({ loading: true });

        try {

            const res = await axios.post('/accounting/add_cih_details', { daily_activity, CIH_transaction_type, CIH_designation, CIH_holders_name, CIH_remarks, amount })

            set({ CashInHandData: res.data, loading: false });

            return toast.success("Added Cash In Hand Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ CashInHandData: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Adding Cash In Hand Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    fetchCashInHand: async () => {

        try {

            const res = await axios.get('/accounting/get_cih_details');

            console.log(res.data);

            set({ CashInHandDataList: res.data.expenseReq });

        } catch (e) {

            set({ CashInHandDataList: null });

            toast.error(e.response.data.msg || "An error occurred Fetching a Cash In Hand Details data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    getCashInHandDetailsById: async (id) => {

        set({ loading: true });

        try {

            const res = await axios.get(`/accounting/get_cih_details/${id}`);

            console.log(res.data)

            set({ CashInHandData: res.data.CashInHandData, loading: false });

            return res.data.CashInHandData;

        } catch (e) {

            console.error("Error fetching Cash In Hand details:", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to fetch Cash In Hand details" });

            return toast.error(e.response?.data?.msg || "Failed to fetch Cash In Hand details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },
    updateCIH: async ({ daily_activity, CIH_transaction_type, CIH_holders_name, CIH_designation, CIH_remarks, amount, id }) => {

        set({ loading: true });

        try {

            await axios.put(`/accounting/update_cih_details/${id}`, { daily_activity, CIH_transaction_type, CIH_holders_name, CIH_designation, CIH_remarks, amount });

            set({ loading: false });

            return toast.success("Cash In Hand Details updated successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ UpdatedCashInHandDetail: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Updating a Cash In Hand Details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    deleteCIH: async (cih_id) => {

        set({ loading: true });

        try {

            await axios.delete(`/accounting/delete_cih_details/${cih_id}`);

            set({ loading: false });

            return toast.success("Cash In Hand Detail deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response.data?.msg || "An error occurred Deleting a Cash In Hand Detail", {
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


// Office A/C Hooks
export {
    useTrxn,
    useOfficeAccount,
    useCashInHand
}
