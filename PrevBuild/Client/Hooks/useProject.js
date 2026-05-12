//Import Modules
import axios from '../lib/axios.lib.js';
import { create } from "zustand";
import toast from "react-hot-toast";

//Project Hooks
export const useProject = create((set )=> ({
    loading: false,
    ProjectData: null,
    ProjectDataList: null,
    addProjectDetails: async (payload) => {

        set({ loading: true });

        try {

            const res = await axios.post('/project/add_project', payload);

            set({ loading: false });

            return toast.success("Added New Project.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ProjectData: null, loading: false});

            toast.error(e.response.data.msg || "An error occurred Adding Project Details.", {
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

    fetchProject: async () => {

        set({ loading: true });

        try {

            const res = await axios.get('/project/get_project_details');

            console.log(res.data.ProjectData);

            set({ProjectDataList: res.data.ProjectData, loading: false});

            return res.data;

        } catch (e) {

            set({ProjectData: null, loading: false});

            toast.error(e.response.data.msg || "An error occurred Fetching a ProjectDetails.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e);

        }
    },


   getProjectDetailsById: async (id) => {

        set({ loading: true });

        try {

            const res = await axios.get(`/project/get_project/${id}`);

            set({ProjectData: res.data.ProjectData, loading: false});

            return res.data.ProjectData;

        } catch (e) {

            console.error("Error fetching project details", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to Fetching a Project Details." });

            return toast.error(e.response?.data?.msg || "Failed to Fetching Project Details.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });
        }

   },

    // Update Status
    updateStatus: async (id, status) => {

        set({ loading: true });

        try {

           await axios.put(`/project/update_status/${id}`, {status});

           set({ loading: false });

          return toast.success(`Added to ${status} project.`, {
              style: {
                  border: '1px solid #6392E5',
                  color: '#005bea',
                  background: '#f1f1f1',
              }
          });

        }  catch (e) {

            console.error("Error failed to project status", e);

            set({ loading: false, error: e.response?.data?.msg || "Failed to project status." });

            return toast.error(e.response?.data?.msg || "Failed to project status.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        }

    },


    deleteProject: async (id) => {

        set({ loading: true });

        try {

            await axios.delete(`/project/delete_project_detail/${id}`);

            set({ loading: false });

            return toast.success("Budget Detail deleted successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });


        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "An error occurred Deleting a Budget Detail", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

            console.log(e);
            return false;
        }

    },


    updateProject: async (id, payload) => {

        set({ loading: true });

        try {

            await axios.put(`/project/update_project/${id}`, payload);

            set({ loading: false });

            return toast.success("Project updated successfully.", {
                style: {
                    border: '1px solid #6392E5',
                    color: '#005bea',
                    background: '#f1f1f1',
                }
            });

        } catch (e) {

            set({ loading: false });

            toast.error(e.response?.data?.msg || "Failed to update project.", {
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




    })
);