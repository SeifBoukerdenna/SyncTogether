import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import CalendarComponent from '@src/Component/Calendar/CalendarComponent';
import CalendarButton from '@src/Component/Calendar/CalendarButton'
import getCurrentDayFormatted from '@src/utils/getCurrentDay';
import { Text } from '@rneui/base';
import EventComponent from '@src/Component/Event/EventComponent';
import { MarkedDates } from 'react-native-calendars/src/types';

const CalendarScreen = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const eventComponents = [
        { id: 1, title: "Meeting", hour: "10:00 AM", date: "2024-05-28" },
        { id: 2, title: "Meeting", hour: "10:00 AM", date: "2024-05-15" },
    ]

    const [markedDates, setMarkedDates] = useState<MarkedDates>(() => {
        const dates: MarkedDates = {};
        eventComponents.forEach((event) => {
            dates[event.date] = {
                marked: true,
                dotColor: 'purple',
            };
        });
        return dates;
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{getCurrentDayFormatted()}</Text>
            </View>
            <CalendarButton />
            <ScrollView>
                <CalendarComponent markedDates={markedDates} />
                {eventComponents.map((event) => {
                    return <EventComponent key={event.id} id={event.id} title={event.title} hour={event.hour} date={event.date} />
                })}
            </ScrollView>
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
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})


export default CalendarScreen;
