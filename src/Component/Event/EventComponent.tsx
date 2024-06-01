import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, Icon } from '@rneui/themed';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';
import { supabase } from 'lib/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { EventType, tag, tagColors } from './types';
import getFormattedDate from '@src/utils/getFormattedDate';

const deleteEventFromSupabase = async (id: number) => {
    const { data, error } = await supabase.from('Event').delete().match({ id });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const EventComponent: React.FC<EventType> = ({ id, title, hour, date, tags }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [pressIn, setIsPressIn] = useState(false);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteEventFromSupabase(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['events'],
            });
        }
    });

    const router = useRouter();

    return (
        <Button
            buttonStyle={pressIn ? styles.containerPressIn : styles.container}
            onPressOut={() => { setIsPressIn(false) }}
            onPressIn={() => { setIsPressIn(true) }}
            onPress={() => { router.navigate(`event/${id}/`) }}
        >
            <Icon name="event" size={24} color="white" style={styles.icon} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.info}>{`Date: ${getFormattedDate(date)}`}</Text>
                <Text style={styles.info}>{`Hour: ${hour}`}</Text>
                <View style={styles.tagsContainer}>
                    {tags?.map((tag, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: tagColors[tag as never] }]}>
                            <Text style={styles.tagText}>{tag as unknown as string}</Text>
                        </View>
                    ))}
                    <Button buttonStyle={{ backgroundColor: 'transparent' }} onPress={() => router.navigate(`event/${id}/edit`)}>
                        <Icon name="edit-2" type="feather" color={"white"} />
                    </Button>
                    <Button buttonStyle={{ backgroundColor: 'transparent' }} onPress={() => mutation.mutate()}>
                        <Icon name="trash" type='feather' size={24} color="white" style={styles.icon} />
                    </Button>
                </View>
            </View>
        </Button>
    );
};

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.black,
        padding: 10,
        borderRadius: 20,
        margin: 15,
    },
    containerPressIn: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.black,
        padding: 10,
        borderRadius: 20,
    },
    icon: {
        color: theme.colors.white,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        color: theme.colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    info: {
        color: theme.colors.white,
        fontSize: 14,
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
    }
});

export default EventComponent;
