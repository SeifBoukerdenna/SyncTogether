import { StyleSheet, View } from "react-native";
import { Button, Text, Image } from "@rneui/themed";
import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";

const Profile = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    return (
        <View>
            <Text h2 style={styles.text}>Profile</Text>
            <View style={styles.cardAccount}>
                <Image src="assets/images/logo_png" containerStyle={styles.media} />
                <View style={styles.profileInfo}>
                    <Text style={styles.text}>John Doe</Text>
                    <Text style={StyleSheet.compose(styles.text, styles.textEmail)}>elmelz6472@gmail.com</Text>
                </View>
                <Button buttonStyle={styles.buttonContainer} title={"Edit Profile"} />
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
    cardAccount: {
        // height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacings.m,
        borderRadius: 20,
        borderColor: theme.colors.grey,
        backgroundColor: theme.colors.black,
    }
})


export default Profile;
