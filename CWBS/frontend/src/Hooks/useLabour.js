// Import Modules
import toast from "react-hot-toast";
import axios from '../lib/axios.lib';
import { create } from "zustand/react";

// Labour hooks
const useLabour = create((set) => ({
    loading: false,

    LabourMaster: [],

    addLabour: async (payload) => {

        set({ loading: true });

        try {

            console.log(payload)

            const res = await axios.post(`/labour/add_labour`, payload);

            set({ loading: false });

            toast.success(res.data.msg || `Added Labour to the project`, {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            return true;

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred while adding labour", {
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

    fetchLabour: async () => {

        set({ loading: true });

        try {

            const res = await axios.get(`/labour/fetch_labour/data`);

            set({ loading: false, LabourMaster: res.data.LabourData });


        } catch (e) {


            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred while fetching labour data", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e)

        }

    },

    deleteLabour: async (id) => {

        set({ loading: true });

        try{

            await axios.delete(`/labour/delete/${id}/labour`);

            set({ loading: false });

            return toast.success("Labour has been deleted successfully", {

                style: {

                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',

                }
            })

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.date?.msg || "An error occurred while deleting labour", {

                style: {

                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',

                }
            });

            console.log(e);
        }
    }
}));

export {
    useLabour
};