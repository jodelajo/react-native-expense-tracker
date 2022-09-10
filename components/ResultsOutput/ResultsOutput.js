import {View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

import ResultsList from "./ResultsList";
import ResultsSummary from "./ResultsSummary";

const DUMMY_RESULTS = [
    {
        id: 'e1',
        course: 'Wiskunde',
        major: true,
        result: 7,
        date: new Date('2022-04-01')
    },
    {
        id: 'e2',
        course: 'Nederlands',
        major: false,
        result: 5,
        date: new Date('2022-04-11')
    }, {
        id: 'e3',
        course: 'Frans',
        major: true,
        result: 6.3,
        date: new Date('2022-05-06')
    }, {
        id: 'e4',
        course: 'Biologie',
        major: false,
        result: 7.7,
        date: new Date('2022-05-21')
    }, {
        id: 'e5',
        course: 'Gym',
        major: false,
        result: 4,
        date: new Date('2022-05-29')
    }, {
        id: 'e6',
        course: 'Fries',
        major: true,
        result: 7,
        date: new Date('2022-06-03')
    }, {
        id: 'e7',
        course: 'Biologie',
        major: false,
        result: 5.4,
        date: new Date('2022-06-09')
    }, {
        id: 'e8',
        course: 'Gym',
        major: true,
        result: 7.2,
        date: new Date('2022-06-11')
    }, {
        id: 'e9',
        course: 'Fries',
        major: true,
        result: 5,
        date: new Date('2022-06-13')
    },
]

export default function ResultsOutput({results, resultPeriod}) {
    return (
        <View style={styles.container}>
            <ResultsSummary results={DUMMY_RESULTS} periodName={resultPeriod} />
            <ResultsList results={DUMMY_RESULTS} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    }
})