import {useLayoutEffect} from "react"
import {View, StyleSheet} from "react-native"
import IconButton from "../components/UI/IconButton"
import {GlobalStyles} from "../constants/styles"

export default function ManageResult({route, navigation}) {
    const editedResultId = route.params?.resultId
    const isEditing = !!editedResultId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Wijzig cijfer' : 'Voeg cijfer toe'
        })
    }, [navigation, isEditing])

    function deleteResultHandler() {

    }

    return <View style={styles.container}>

        {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton
                    icon='trash'
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteResultHandler} />
            </View>
        )
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})