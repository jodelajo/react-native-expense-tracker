import { View, Text } from "react-native"
import { errorMessages } from "../constants/errorMessages"

export default function Statistics() {

    const error = 'EMAIL_EXISTS'
    const message = Object.entries(errorMessages).map(([key, value]) => {
        if(key === error) {
            return value
        }
    })


    return ( <View>
        <Text>
           {message}
        </Text>
    </View>

    )
}