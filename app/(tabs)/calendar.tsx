import { useTheme } from 'src/hooks/useTheme';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from 'src/Theme/theme.d';
import { Button, Text, Icon } from '@rneui/themed';
import CalendarScreen from 'src/Screen/CalendarScreen';


export default function Tab() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        // <View style={styles.container}>
        //     <Text h1>Calendar</Text>
        // </View>
        <CalendarScreen />

    );
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.onBackground,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

