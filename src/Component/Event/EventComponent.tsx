import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, Icon } from '@rneui/themed';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';
import { supabase } from 'supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { EventType } from './types';

const deleteEventFromSupabase = async (id: number) => {
    const { data, error } = await supabase.from('Event').delete().match({ id });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const EventComponent: React.FC<EventType> = ({ id, title, hour, date }) => {
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
            onPress={() => { router.navigate(`/event/${id}`) }} //navigate to the page with id as user
        >
            <Icon name="event" size={24} color="white" style={styles.icon} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.info}>{`ID: ${id}`}</Text>
                <Text style={styles.info}>{`Date: ${date}`}</Text>
                <Text style={styles.info}>{`Hour: ${hour}`}</Text>
            </View>
            <Button buttonStyle={{ backgroundColor: 'transparent' }} onPress={() => mutation.mutate()}>
                <Icon name="trash" type='feather' size={24} color="white" style={styles.icon} />
            </Button>
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
    buttonStyleTrash: {

    },
    containerPressIn: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.black,
        padding: 10,
        borderRadius: 20,
        margin: 15,
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
})


export default EventComponent;
