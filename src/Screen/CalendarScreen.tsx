import React from 'react';
import { Text, Button } from '@rneui/themed';
import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';
import { supabase } from 'supabase';
import { useQuery } from '@tanstack/react-query';
import { MarkedDates } from 'react-native-calendars/src/types';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { EventType } from '@src/Component/Event/types';

import CalendarComponent from '@src/Component/Calendar/CalendarComponent';
import CalendarButton from '@src/Component/Calendar/CalendarButton';
import getCurrentDayFormatted from '@src/utils/getCurrentDay';
import EventComponent from '@src/Component/Event/EventComponent';
import EmptyListComponent from '@src/Component/EmptyListComponent';

const fetchEvents = async (): Promise<EventType[]> => {
    const { data, error } = await supabase.from('Event').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data || [];
};

const CalendarScreen = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const { data: events, error, isLoading } = useQuery<EventType[], Error>({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    const markedDates: MarkedDates = {};

    if (events) {
        events.forEach(event => {
            const date = event.date;
            const [hour, minute] = event.hour.split(':');
            if (!markedDates[date]) {
                markedDates[date] = { marked: true, dots: [{ color: theme.colors.primary }] };
            }
            event.hour = hour.toString() + ":" + minute.toString();
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{getCurrentDayFormatted()}</Text>
            </View>
            <CalendarButton />
            <CalendarComponent markedDates={markedDates} />
            {isLoading && (
                <Button buttonStyle={styles.loadingButton} color={theme.colors.primary} title="Solid" type="solid" loading />
            )}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
            {events && (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <EventComponent key={item.id} id={item.id} title={item.title} hour={item.hour} date={item.date} description={item.description} />
                    )}
                    ListEmptyComponent={EmptyListComponent}
                />
            )}
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
    loadingButton: {
        margin: theme.spacings.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    }
});

export default CalendarScreen;