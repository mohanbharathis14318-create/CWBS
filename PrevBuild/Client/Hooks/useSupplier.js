// Import Modules
import toast from "react-hot-toast";
import axios from '../lib/axios.lib';
import { create } from "zustand/react";

// Supplier Hooks
export const useSupplier = create((set) => ({
    supplierData: null,
    supplierList: null,
    loading: false,
    addSupplier: async ({supplier_name, company_name, phone_number, business_type, supplier_address, gst_number, pan_number, company_type, bank_name, bank_account_number, ifsc_code, upi_number}) => {

        set({ loading: true });

        try {

            const res = await axios.post('/supplier/create_supplier', { supplier_name, company_name, phone_number, business_type, supplier_address, gst_number, pan_number, company_type, bank_name, bank_account_number, ifsc_code, upi_number });

            set({ supplierData: res.data, loading: false });

            return toast.success("Added supplier.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ supplierData: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Adding a Supplier", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    fetchSuppliers: async () => {

        try {

            const res = await axios.get('/supplier/get_supplier');

            console.log(res.data.suppliers);

            set({ supplierList: res.data.suppliers });

        } catch (e) {

            set({ supplierList: null });

            toast.error(e.response.data.msg || "An error occurred Fetching a Supplier data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    getSupplierDetailsById: async (id) => {

        set({ loading: true });

        try {

            const res = await axios.get(`/supplier/get_supplier_details/${id}`);

            console.log(res.data)

            set({ supplierData: res.data.SupplierData, loading: false });

            return res.data.SupplierData;

        } catch (e) {

            console.error("Error fetching bank details:", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to fetch supplier details" });

            return toast.error(e.response?.data?.msg || "Failed to fetch supplier details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },
    updateSupplierDetails: async ({ supplier_name, company_name, phone_number, business_type, supplier_address, gst_number, pan_number, company_type, bank_name, bank_account_number, ifsc_code, upi_number, id }) => {

        set({ loading: true });

        try {

            await axios.put(`/supplier/update_supplier_details/${id}`, { supplier_name, company_name, phone_number, business_type, supplier_address, gst_number, pan_number, company_type, bank_name, bank_account_number, ifsc_code, upi_number });

            set({ loading: false });

            return toast.success("Supplier Detail updated successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ UpdatedSupplierDetail: null, loading: false });

            toast.error(e.response.data.msg || "An error occurred Updating a Supplier Details", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },
    deleteSupplierDetail: async (supplier_id) => {

        set({ loading: true });

        try {

            await axios.delete(`/supplier/delete_supplier_detail/${supplier_id}`);

            set({ loading: false });

            return toast.success("Supplier Detail deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred Deleting a Supplier Detail", {
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