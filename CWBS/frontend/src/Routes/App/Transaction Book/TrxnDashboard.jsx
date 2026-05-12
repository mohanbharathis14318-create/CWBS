// Import Modules
import {useEffect, useState} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Import Hooks
import { useTrxn } from '../../../Hooks/useTransaction.js'

// Import Components
import Loading_Screen from '../../../components/Loading_Screen.jsx'

const TrxnDashboard = () => {

    const { fetchBudgetExpense, budgetData, expenseData, loading } = useTrxn();

    const [data, setData] = useState([]);

    useEffect(() => {

        fetchBudgetExpense();

    }, [fetchBudgetExpense]);

    useEffect(() => {

        if (budgetData.length && expenseData.length) {
            const chartData = budgetData.map((budgetItem) => {
                const matchExpense = expenseData.filter(
                    (exp) => exp.date?.slice(0, 7) === budgetItem.budget_month
                );

                console.log(matchExpense);

                const totalExpense = matchExpense.reduce(
                    (sum, exp) => sum + parseFloat(exp.total_amount || 0),
                    0
                );

                return {
                    month: budgetItem.budget_month,
                    budget: parseFloat(budgetItem.budget_amount),
                    expense: totalExpense,
                };
            });

            setData(chartData);
            console.log("Chart Data:", chartData);
        }
    }, [budgetData, expenseData]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">📊 Budget vs Expense Dashboard</h1>

            {

                loading ?

                (

                    <Loading_Screen />

                )

                : data.length === 0

                ?

                (

                    <p>No data available.</p>

                )

                :

                (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                            <Bar dataKey="expense" fill="#8884d8" name="Expense" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
        </div>
    );
};

export default TrxnDashboard;