// import Modules
import axios from '../lib/axios.lib.js';
import { create } from "zustand/react";
import toast from "react-hot-toast";

// Budget Hooks
export const useBudget = create ((set ) => ({

    BudgetData: null,
    BudgetDataList: null,
    loading: false,
    addBudgetDetails: async (formData) => {

        set({loading: true});

        try {

            const res = await axios.post('/budget/add_budget_details', formData)

            set({BudgetData: res.data, loading: false});

            toast.success("Added Budget Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            return true;

        } catch (e) {

            set({BudgetData: null, loading: false});

            toast.error(e.response.data.msg || "An error occurred Adding Budget Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.error(e);

            return false;


        }

    },

    fetchBudget: async () => {

        set({loading: true});

        try {

            const res = await axios.get('/budget/get_budget_details');

            console.log(res.data.BudgetData);

            set({BudgetDataList: res.data.BudgetData, loading: false});

            return res.data;

        } catch (e) {

            set({BudgetDataList: null, loading: false});

            toast.error(e.response.data.msg || "An error occurred Fetching a Budget Details data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    getBudgetDetailById: async (id) => {

        set({loading: true});

        try {

            const res = await axios.get(`/budget/get_budget_detail/${id}`);

            set({BudgetData: res.data.BudgetData, loading: false});

            return res.data.BudgetData;

        } catch (e) {

            console.error("Error fetching budget details:", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to fetch budget details" });

            return toast.error(e.response?.data?.msg || "Failed to fetch budget details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },
    updateBudget: async ({budget_month, budget_expenses_type, budget_particulars, budget_amount, id}) => {

        set({loading: true});

        try {

            await axios.put(`/budget/update_budget_detail/${id}`, {budget_month, budget_expenses_type, budget_particulars, budget_amount})

            set({ loading: false });

            return toast.success("Budget Detail updated successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ UpdatedBudgetDetail: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Updating a Budget Details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    deleteBudget: async (id) => {

        set({ loading: true });

        try {

            await axios.delete(`/budget/delete_budget_detail/${id}`);

            set({ loading: false });

            return toast.success("Budget Detail deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({loading: false});

            toast.error(e.response?.data?.msg || "An error occurred Deleting a Budget Detail", {
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