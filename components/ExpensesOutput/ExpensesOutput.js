import {View , Text,StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({expenses, title, fallbackText}){

    let content = <Text style={styles.infotext}>{fallbackText}</Text>

    if (expenses.length >0){
        content = <ExpensesList expenses={expenses}/>
    }

    return (
    <View style={styles.container}>
        <ExpensesSummary expenses={expenses} titleName={title}/>
        {content}
    </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infotext: {
        color: 'white',
        fontSize:16,
        textAlign:'center',
        marginTop: 32
    }
})