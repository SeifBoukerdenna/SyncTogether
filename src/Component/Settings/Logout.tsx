import { StyleSheet, View } from "react-native";
import { Button, Text, Image } from "@rneui/themed";
import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";
import useSessionStore from "src/stores/sessionStore";
import { supabase } from "lib/supabase";
import { router, useRouter } from "expo-router";

const Logout = () => {
    const { session, setSession } = useSessionStore();
    const theme = useTheme();
    const styles = makeStyles(theme);
    const router = useRouter();


    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout failed:', error.message);
        } else {
            setSession(null);
            router.replace('/')
        }
    };



    return (
        <View>
            <Text h2 style={styles.text}>Logout</Text>
            <View style={styles.logoutCard}>
                <Button containerStyle={styles.containerStyle}
                    buttonStyle={styles.buttonContainer}
                    title={"Logout"}
                    onPress={handleLogout} />
            </View>
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 15,
    },
    text: {
        color: theme.colors.white,
        fontSize: 20
    },
    logoutCard: {
        padding: theme.spacings.l,
        marginTop: theme.spacings.m,
        borderRadius: 20,
        borderColor: theme.colors.grey,
        backgroundColor: theme.colors.black,
    }
})


export default Logout;
