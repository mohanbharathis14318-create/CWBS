// Import Modules
import { useEffect } from "react";

// Import Hooks
import { useOfficeAccount } from "../../Hooks/useTransaction.js";


const OfficeExpense = () => {



    const { fetchOfficeExpense, OfficeExpRequestedRender } = useOfficeAccount();

    useEffect(() => {

        fetchOfficeExpense();

    }, [fetchOfficeExpense]);

    return (
        <div>
            <div className="border border-[#6392E5] p-4 rounded">

                <div>
                    <p className="head text-xl">
                        Transaction Status (1)
                    </p>
                    <p>transaction status for Office Expense</p>
                </div>

                <div className="grid grid-cols-2 border border-[#6392E5] bg-[#f1f1f1] p-4 rounded">
                    <div className="flex gap-4 items-center">
                        <div>
                            <p className='font-bold text-[#005bea]'>
                                Daily Activity Type
                            </p>
                            <p>
                                Office Expense
                            </p>
                        </div>

                        <p className="text-[#005bea]/50">
                            |
                        </p>

                        <div>
                            <p className='font-bold text-[#005bea]'>
                                Date
                            </p>
                            <p>
                                2025-09-11
                            </p>
                        </div>

                        <p className="text-[#005bea]/50">
                            |
                        </p>

                        <div>
                            <p className='font-bold text-[#005bea]'>
                                Particulars
                            </p>
                            <p>
                                Summma
                            </p>
                        </div>
                    </div>

                    <div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default OfficeExpense;