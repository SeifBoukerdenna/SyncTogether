import { StyleSheet, View } from "react-native";
import { Text, Button } from '@rneui/themed';
import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';

const bottomFooterComponent = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            <Text h4 h4Style={styles.textBottom}>End of the timeline</Text>
            <Button buttonStyle={styles.button} title={"Add more"} color={theme.colors.primary} />
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        bottom: 0,
        marginBottom: 10,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        borderRadius: 20,
        width: '100%'
    },
    textBottom: {
        color: theme.colors.white,
    }
})

export default bottomFooterComponent;

