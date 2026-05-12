// Import Modules
import toast from "react-hot-toast";
import axios from '../lib/axios.lib';
import { create } from "zustand/react";

// Requirement Hooks
const useRequirement = create((set) => ({

    loading: false,
    RequirementReqData: null,
    RequirementReqDataListMD: null,
    RequirementReqDataListUser: null,
    CreateCIHTrxnReq: async (payload) => {

        set({ loading: true });

        try {

            await axios.post('/requirements/create_transaction_request', payload);


            if (payload.cash_flow_type === 'Cash Given')
            {

                set({ loading: false });

                toast.success("Created transaction request", {
                    style: {
                        border: '1px solid #6392E5',
                        color: '#005bea',
                        background: '#f1f1f1',
                    }
                });

                return true;

            } else if (payload.cash_flow_type === 'Cash Return')
            {

                set({ loading: false });

                toast.success("Transaction Returned", {
                    style: {
                        border: '1px solid #6392E5',
                        color: '#005bea',
                        background: '#f1f1f1',
                    }
                });

                return true;

            }



        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred creating a requirement request", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

            return false;


        }

    },

    updateExpenseTransaction: async (payload) => {

        set({ loading: true });

        try {

            await axios.put(
                `/requirements/update/expense/${payload.trxn_id}/transaction/request`,
                {
                    transaction_title: payload.transaction_title, trxn_remarks: payload.trxn_remarks,
                    payment_mode: payload.payment_mode, expense_type: payload.expense_type, amount: payload.amount,
                    given_payment_mode: payload.given_payment_mode, given_amount: payload.given_amount
                }
            );

            set({ loading: false });

            toast.success("Expense Transaction Updated", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            return true;

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred creating a requirement request", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

            return false;

        }

    },

    getAllTrxnReq: async () => {

        set({ loading: true });

        try {

            const res = await axios.get(`/requirements/get_all_trxn_requests`);

            set({ loading: false, RequirementReqDataListMD: res.data.requests });

        } catch (e) {

            set({ loading: false, RequirementReqDataListMD: null });

            toast.error(e.response?.data?.msg || "An error occurred fetching a requirement requests", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },

    getAllReqByUser: async (user) => {

        set({ loading: true });

        try {

            const res = await axios.get(`/requirements/get_all_trxn_requests/${user}`)

            set({ loading: false, RequirementReqDataListUser: res.data.requests });

        } catch (e) {

            set({ loading: false, RequirementReqDataListUser: null });

            toast.error(e.response?.data?.msg || "An error occurred fetching a requirement request based on user", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },

    PendingDeniedStatus: async (trxn_id, newStatus, given_amount, given_payment_mode, given_sender_name, user_name) => {

        set({ loading: true });

        try {

            await axios.put(`/requirements/update/${trxn_id}/transaction`, { trxn_id, newStatus, given_amount, given_payment_mode, given_sender_name, user_name });

            set({ loading: false });

            return toast.success(`${newStatus} the transaction`, {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred while updating requirement request", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },

    approveStatus: async (trxn_id, given_amount, given_payment_mode, given_sender_name, user_name) => {

        set({ loading: true });

        try {

            await axios.put(`/requirements/transactions/${trxn_id}/approve`, { given_amount, given_payment_mode, given_sender_name, user_name });

            set({ loading: false });

            return toast.success(`Approved the transaction`, {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred while approving transaction status", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },

    returnedStatus: async ({
                               trxn_id,
                               given_amount,
                               total_return_amount,
                               return_payment_mode,
                               return_sender_name,
                               user_name
                           }) => {

        set({ loading: true });

        try {

            await axios.put(`/requirements/transactions/${trxn_id}/return`, {
                given_amount, total_return_amount, return_payment_mode, return_sender_name, user_name
            });

            set({ loading: false });

            return toast.success(`Approved the transaction`, {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred while approving transaction status", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },

    DeleteTransaction: async (trxn_id) => {

        set({ loading: true });

        try {

            await axios.delete(`/requirements/delete/${trxn_id}/transaction`);

            set({ loading: false });

            return toast.success(`Transaction Deleted`, {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred while deleting a transaction", {
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

export {
    useRequirement
};