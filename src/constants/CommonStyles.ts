import { StyleSheet } from "react-native";
import Color from "./Color";

export const commonStyles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'WorkSansBold'
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'WorkSansRegular'
    },

    headerTitle: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'WorkSansBold'
    }

})
