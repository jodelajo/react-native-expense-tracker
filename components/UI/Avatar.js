import { View, StyleSheet, Image} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";

export default function Avatar({source, size}) {
    // const authCtx = useContext(AuthContext)
    // console.log(source)
    const sizeStyle = {
        width: size,
        height: size
    }


    return (
        <View>
            <Image source={source} size={size} style={[styles.avatar, sizeStyle]} />
        </View>
    )
}
const styles = StyleSheet.create({
    avatar: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
        // width: 100,
        // height: 100,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      },
})