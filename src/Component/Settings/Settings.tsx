import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native"

import Profile from "./Profile";
import Appearance from "./Appearance";
import Logout from "./Logout";

const Settings = () => {
    const theme = useTheme();
    const router = useRouter();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            <Profile />
            <Appearance />
            <Logout />
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 16,
    }
})

export default Settings;