import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";
import { StyleSheet, View } from "react-native"
import { Button, Text, ButtonGroup } from '@rneui/base';
import { useState } from "react";


const CalendarButton = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const onPressButton = (index: React.SetStateAction<number>) => {
        setSelectedIndex(index === selectedIndex ? -1 : index);
    };

    return (
        <View style={styles.buttonContainer}>
            <Button title="Month" titleStyle={selectedIndex == 0 ? styles.titleStyleSelected : styles.titleStyleNotSelected} buttonStyle={selectedIndex == 0 ? styles.buttonSelected : styles.buttonNotSelected} onPress={() => onPressButton(0)} />
            <Button title="Week" titleStyle={selectedIndex == 1 ? styles.titleStyleSelected : styles.titleStyleNotSelected} buttonStyle={selectedIndex == 1 ? styles.buttonSelected : styles.buttonNotSelected} onPress={() => onPressButton(1)} />
            <Button title="Day" titleStyle={selectedIndex == 2 ? styles.titleStyleSelected : styles.titleStyleNotSelected} buttonStyle={selectedIndex == 2 ? styles.buttonSelected : styles.buttonNotSelected} onPress={() => onPressButton(2)} />
        </View>
    )
}


const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.onBackground,
    },
    titleStyleSelected: {
        color: 'white'
    },
    titleStyleNotSelected: {
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonSelected: {
        margin: theme.spacings.s,
        alignItems: 'center',
        width: 100,
        borderRadius: 15,
        backgroundColor: theme.colors.primary
    },
    buttonNotSelected: {
        margin: theme.spacings.s,
        alignItems: 'center',
        width: 100,
        borderRadius: 15,
        backgroundColor: theme.colors.white
    }
})

export default CalendarButton;