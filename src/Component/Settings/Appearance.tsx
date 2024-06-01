import { StyleSheet, View } from "react-native";
import { Button, Text, Image } from "@rneui/themed";
import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";
;
const Profile = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View>
            <Text h2 style={styles.text}>Appearance</Text>
            <View style={styles.cardAppearance}>

            </View>
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    buttonContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 15
    },
    media: {
        aspectRatio: 1,
    },
    profileInfo: {
    },
    text: {
        color: theme.colors.white,
        fontSize: 20
    },
    textEmail: {
        textDecorationLine: 'underline'
    },
    cardAppearance: {
        // width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacings.m,
        borderRadius: 20,
        backgroundColor: theme.colors.black,
    }
})


export default Profile;
