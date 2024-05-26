import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarComponent from '@src/Component/CalendarComponent';
import getCurrentDayFormatted from '@src/utils/getCurrentDay';
import { Button, Text, ButtonGroup } from '@rneui/base';

const CalendarScreen = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const [selectedIndex, setSelectedIndex] = useState(-1);


    const onPressButton = (index: React.SetStateAction<number>) => {
        setSelectedIndex(index === selectedIndex ? -1 : index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{getCurrentDayFormatted()}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Month" titleStyle={selectedIndex == 0 ? styles.titleStyleSelected : styles.titleStyleNotSelected} buttonStyle={selectedIndex == 0 ? styles.buttonSelected : styles.buttonNotSelected} onPress={() => onPressButton(0)} />
                <Button title="Week" titleStyle={selectedIndex == 1 ? styles.titleStyleSelected : styles.titleStyleNotSelected} buttonStyle={selectedIndex == 1 ? styles.buttonSelected : styles.buttonNotSelected} onPress={() => onPressButton(1)} />
                <Button title="Day" titleStyle={selectedIndex == 2 ? styles.titleStyleSelected : styles.titleStyleNotSelected} buttonStyle={selectedIndex == 2 ? styles.buttonSelected : styles.buttonNotSelected} onPress={() => onPressButton(2)} />
            </View>

            <CalendarComponent />
        </SafeAreaView>
    );
};

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.onBackground,
    },
    header: {
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleStyleSelected: {
        color: 'white'
    },
    titleStyleNotSelected: {
        color: 'black'
    },
    buttonNotSelected: {
        margin: theme.spacings.s,
        alignItems: 'center',
        width: 100,
        borderRadius: 15,
        backgroundColor: theme.colors.white
    },
    buttonSelected: {
        margin: theme.spacings.s,
        alignItems: 'center',
        width: 100,
        borderRadius: 15,
        backgroundColor: theme.colors.primary
    },
    buttonText: {
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Center buttons vertically
        justifyContent: 'space-around'
    },
    selectedButton: {
        backgroundColor: 'gray',
    },
    selectedButtonText: {
        color: 'white',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})



export default CalendarScreen;
