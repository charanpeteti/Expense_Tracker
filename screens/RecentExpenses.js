import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext,useEffect,useState} from 'react';
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses(){
    const [isFetching, setIsFetching] = useState(true);

    const [error,setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    

    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true);
            try{
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch(error){
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    },[]);

    function errorHandler(){
        setError(null);
    }

    if (error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching){
        return <LoadingOverlay/>
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today,7);

        return (expense.date >= date7daysAgo) && (expense.date <= today);
    });

    return <ExpensesOutput expenses={recentExpenses} title="Last 7 days" fallbackText="No expenses registered for last 7days"/>
}
export default RecentExpenses;