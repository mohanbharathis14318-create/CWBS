// Import Modules
import { useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
    SquarePen,
    Trash
} from 'lucide-react';
import { Link } from "react-router-dom";

// Import Assets
import emptyBox from "../../../assets/img/empty-box.png";

// Import Hooks
import { useSupplier } from "../../../Hooks/useSupplier.js";

// Import Asset
import Loading_Screen from "../../../components/Loading_Screen.jsx";

const SupplierBoard = () => {

    // Supplier Hooks
    const { fetchSuppliers, deleteSupplierDetail, supplierList, loading } = useSupplier();

    useEffect(() => {

        fetchSuppliers()

    }, [fetchSuppliers]);

    // Delete Supplier Detail
    const HandleDeleteSupplier = useCallback(async (id) => {

        const delete_success = await deleteSupplierDetail(id);

        if (delete_success) return await fetchSuppliers();

    }, [deleteSupplierDetail, fetchSuppliers]);

    if (loading) return <Loading_Screen />

    return (
        <div>
            <section className="border border-[#A9C1EA] rounded p-4">
                <div className="my-2">

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{delay: 0.1 }}
                        className="head text-xl my-2">
                        Supplier Board
                    </motion.div>
                    <motion.hr
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="border-[#6392E5]"/>

                </div>

                {

                    Array.isArray(supplierList) && supplierList.length === 0

                    &&

                    (
                        <div className="grid justify-center items-center tracking-widest rounded p-16 my-4">
                            <div className="grid justify-center">
                                <img className="w-60" src={emptyBox} alt="empty-box-img"/>
                            </div>
                            <div className="grid text-center gap-4">
                                <p className="text-2xl text-[#202020]">
                                    Empty.........!
                                </p>
                                <p className="text-xl text-[#005BEA]">
                                    Please Add the Supplier Details
                                </p>
                            </div>

                        </div>
                    )

                }

                {
                    Array.isArray(supplierList) && supplierList.length > 0 && supplierList.map((supplier) => (

                        <div key={ supplier.supplier_id } className="grid my-6">
                            <div className="border-l-10 border-[#005BEA] bg-[#F1F1F1] drop-shadow-lg transition-all duration-200 p-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mx-10 py-4 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{delay: 0.1 }}>
                                <span className="text-[#005BEA]">
                                    Contact Person Name
                                </span><br/>
                                        { supplier.full_name }
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 0.2 }}>
                                <span className="text-[#005BEA]">
                                    Company Name
                                </span><br/>
                                        { supplier.company_name }
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{delay: 0.3 }}>
                                        <span className="text-[#005BEA]">Phone</span><br/>
                                        +91 { supplier.phone }
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 0.4 }}>
                                <span className="text-[#005BEA]">
                                    Business Type
                                </span><br/>
                                        { supplier.business_type }
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 0.5 }}>
                                <span className="text-[#005BEA]">
                                    GST Number
                                </span><br/>
                                        { supplier.gst_number }
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{delay: 0.6 }}>
                                <span className="text-[#005BEA]">
                                    PAN Number
                                </span><br/>
                                        { supplier.pan_number }
                                    </motion.div>


                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{delay: 0.7 }}>
                                <span className="text-[#005BEA]">
                                    Bank Name
                                </span><br/>
                                        { supplier.bank_name }
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 0.8 }}>
                                <span className="text-[#005BEA]">
                                    Bank Account Number
                                </span><br/>
                                        { supplier.bank_account_number }
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{delay: 0.9 }}>
                                <span className="text-[#005BEA]">
                                    IFSC Number
                                </span><br/>
                                        { supplier.ifsc_code }
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{delay: 1 }}>
                                <span className="text-[#005BEA]">
                                    Company Type
                                </span><br/>
                                        { supplier.company_type }
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 1.2 }}>
                                <span className="text-[#005BEA]">
                                    UPI Number
                                </span><br/>
                                        { supplier.upi_number }
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 1.3 }}>
                                <span className="text-[#005BEA]">
                                    Address
                                </span><br/>
                                        { supplier.supplier_address }
                                    </motion.div>

                                </div>
                                <div className="flex justify-end gap-2 p-4">
                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 1.4 }}>
                                        <Link to={`/app-area/suppliers/update_supplier_detail/${supplier.supplier_id}`}
                                              className="flex items-center gap-2 text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                                            <SquarePen />
                                            Edit
                                        </Link>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 100 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{delay: 1.5 }}>
                                        <button onClick={() => HandleDeleteSupplier(supplier.supplier_id)}
                                              className="flex items-center gap-2 text-[#005BEA]  text-xl border border-[#6392E5] bg-[#D9E1EF] hover:bg-[#C9D8F3] p-4 rounded">
                                            <Trash />
                                            Delete
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                    ))
                }

            </section>
        </div>
    );
};

export default SupplierBoard;