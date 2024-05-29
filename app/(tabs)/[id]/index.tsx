import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup, Icon } from '@rneui/themed';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import deleteEventFromSupabase from '@src/Api/Event/deleteEvent';
import fetchEventFromSupabase from '@src/Api/Event/fetchEvent';
import { tag, tagColors } from '@src/Component/Event/types';
import getFormattedDate from '@src/utils/getFormattedDate';
import { refetchInterval } from '@src/utils/constants';


const EventPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();
    const styles = makeStyles(theme);

    const queryClient = useQueryClient();

    const { data: event, isLoading, refetch } = useQuery({
        queryKey: ['event', id],
        queryFn: () => fetchEventFromSupabase(id as string),
        // refetchInterval: refetchInterval,
    });


    useEffect(() => {
        if (event?.hour === undefined) return;
        const [hour, minute] = event.hour.split(':');
        event.hour = hour.toString() + ":" + minute.toString();
    }, [])



    const addMutation = useMutation({
        mutationFn: () => fetchEventFromSupabase(id as string),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['events'],
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteEventFromSupabase(id as string),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            router.replace("/calendar");
        },
        onError: (error) => {
            console.error('Error deleting event:', error);
        },
    });


    useEffect(() => {
        addMutation.mutate();
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Event Details</Text>
            <View style={styles.eventCard}>
                {event ? (
                    <>
                        <Text style={styles.textStyle}>Title: {event.title}</Text>
                        <Text style={styles.textStyle}>Description: {event.description}</Text>
                        <View style={styles.infoRow}>
                            <Icon name="calendar" type="feather" color={theme.colors.primary} />
                            <Text style={styles.infoText}>{getFormattedDate(event.date)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="clock" type="feather" color={theme.colors.primary} />
                            <Text style={styles.infoText}>{event.hour}</Text>
                        </View>
                        <View style={styles.tagsContainer}>
                            {event.tags?.map((tag: tag, index: number) => (
                                <View key={index} style={[styles.tag, { backgroundColor: tagColors[tag as never] }]}>
                                    <Text style={styles.tagText}>{tag as unknown as string}</Text>
                                </View>
                            ))}
                            <Button buttonStyle={{ backgroundColor: 'transparent' }} onPress={() => router.navigate(`/${id}/edit`)}>
                                <Icon name="edit-2" type="feather" color={"white"} />
                            </Button>
                            <Button buttonStyle={{ backgroundColor: 'transparent' }} onPress={() => deleteMutation.mutate()}>
                                <Icon name="trash" type='feather' size={24} color="white" />
                            </Button>
                        </View>
                    </>
                ) : (
                    <Text style={styles.textStyle}>No event data available</Text>
                )}
            </View>
            <Button title="Go back"
                titleStyle={styles.buttonText}
                type='outline'
                buttonStyle={styles.button}
                onPress={() => { router.replace("/calendar") }} />
        </View>
    );
};

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.onBackground,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.white,
        marginBottom: 20,
    },
    icon: {
        color: theme.colors.white,
        marginRight: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    tag: {
        marginVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagText: {
        color: theme.colors.white,
        fontSize: 12,
    },
    actionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: theme.spacings.xxl
    },
    eventCard: {
        backgroundColor: theme.colors.black,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textStyle: {
        fontSize: 16,
        color: theme.colors.white,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: theme.colors.white,
        marginLeft: 10,
    },
    button: {
        borderRadius: 15,
        borderColor: theme.colors.primary,
        padding: 10,
        width: '100%',
    },
    buttonText: {
        color: theme.colors.white,
    }
});


export default EventPage;
