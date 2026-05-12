// Import Modules
import {
    ArrowBigDownDash,
    ArrowBigUpDash,
    Banknote,
    Briefcase,
    Calendar, CircleCheck, CircleX, Clock, IndianRupee,
    Info,
    ReceiptIndianRupee, SquarePen,
    Tag, Trash,
    User
} from "lucide-react";

const TransactionCard = ({ item, title }) => {

    let icon, style;

    if (item.cash_flow_type === "Cash Given") {

        icon = <ArrowBigDownDash />;
        style = "flex gap-2 items-center bg-[#D9E1EF] border border-[#8CAEE9] text-[#005BEA] p-2 rounded-full";

    } else if (item.cash_flow_type === "Cash Return") {

        icon = <ArrowBigUpDash />;
        style = "flex gap-2 items-center bg-[#D1FAE5] border border-[#10B981] text-[#065F46] p-2 rounded-full";

    }


    return (
        <div>
            <div className="flex flex-col gap-4 border border-[#8CAEE9] bg-[#F1F1F1] hover:scale-102 transition-all duration-200 rounded p-4">

                <div className="flex gap-4 justify-between items-center">

                    <p className="flex items-center gap-2 font-bold text-[#005BEA] text-xl tracking-widest">
                        <Info />
                        { item.transaction_title }
                    </p>

                    <div className={style}>

                        { icon }
                        { item.cash_flow_type }

                    </div>

                </div>

                <hr className="border-t border-[#8CAEE9]"/>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <Calendar />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Date:
                        </strong>
                        { new Date().toDateString(item.created_at) }
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <Tag />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Description:
                        </strong>
                        { item.trxn_remarks }
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <User />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Returned By:
                        </strong>
                        { item.user_name }
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <Briefcase />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Designation:
                        </strong>
                        { item.user_designation }
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <Banknote />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Payment Mode:
                        </strong>
                        { item.return_payment_mode }
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <ArrowBigDownDash />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Expense Type:
                        </strong>
                        { item.expense_type }
                    </p>
                </div>

                <div className="flex gap-4 items-center">
                    <span className="text-[#005BEA]">
                        <ReceiptIndianRupee />
                    </span>
                    <p className="flex gap-2">
                        <strong>
                            Transaction Type:
                        </strong>
                        { item.cash_flow_type }
                    </p>
                </div>

                <hr className="border-t border-[#8CAEE9]"/>

                <div className="flex flex-wrap gap-4 justify-between items-center text-xl">

                    <div>
                        <p className="font-bold text-[#202020]">
                            {title}
                        </p>
                    </div>

                    <div className="flex gap-1 items-center text-[#005BEA]">
                        <span>
                            <IndianRupee />
                        </span>

                        <strong>
                            { item.cash_flow_type === "Cash Given" && item.amount }
                            { item.cash_flow_type === "Cash Return" && item.total_balance_amount }
                        </strong>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default TransactionCard;