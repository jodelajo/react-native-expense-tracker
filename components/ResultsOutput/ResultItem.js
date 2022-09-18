import {Pressable, View, Text, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../util/date";
import {useNavigation} from "@react-navigation/native"


export default function ResultItem({id, major, course, result, date, amount}) {
    const navigation = useNavigation()
    const resultOutput = result
    console.log('result output', resultOutput)
    console.log('amount', amount)

    function resultPressHandler() {
        navigation.navigate("ManageResult", {
            resultId: id
        })
    }

    return <Pressable onPress={resultPressHandler} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.resultItem, major ? styles.resultItemMajor : styles.resultItemMinor]}>
            <View style={styles.leftContainer}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{course}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={[styles.resultContainer, result < 5.5 ? styles.insufficient : styles.sufficient]}>
                    <Text style={[styles.result, result < 5.5 ? styles.insufficient : styles.sufficient]}>{Number(result).toFixed(1)}</Text>
                </View>
            </View>
            <View style={[styles.amountContainer, result < 5.5 ? styles.negativeAmount: styles.positiveAmount]}>
                <Text style={[styles.result,result < 5.5 ? styles.negativeAmount: styles.positiveAmount]}>€ {amount.toFixed(2)}</Text>
            </View>
           
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    pressed: {
        opacity: .5,
    },
    resultItem: {
        paddingLeft: 12,
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .4,
        minWidth: '100%',
    },
    leftContainer: {
        paddingVertical: 6,
        paddingRight: 8,
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
    },
    negativeAmount: {
        backgroundColor: GlobalStyles.colors.insufficient,
        fontSize: 16,
    },
    positiveAmount: {
        backgroundColor: GlobalStyles.colors.sufficient,
        fontSize: 16,
    },
    resultItemMajor: {
        backgroundColor: GlobalStyles.colors.major,
    },
    resultItemMinor: {
        backgroundColor: GlobalStyles.colors.minor,
    },
    sufficient: {
        backgroundColor: GlobalStyles.colors.primary500,
        color: GlobalStyles.colors.sufficient,
        fontSize: 16,
    },
    insufficient: {
        backgroundColor: GlobalStyles.colors.primary500,
        color: GlobalStyles.colors.insufficient,
        fontSize: 16,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    resultContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        width: 60,
    },
    amountContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end' ,
        borderTopRightRadius: 4,
        borderBottomRightRadius:4,
        width: '30%',
       
    },
    result: {
        fontWeight: 'bold',
    }
})