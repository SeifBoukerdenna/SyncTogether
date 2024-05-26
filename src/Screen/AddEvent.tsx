import React, { useState } from 'react';
import { supabase } from 'supabase';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';
import { useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Enum for form status
enum Status {
    Idle = 'idle',
    Error = 'error',
    Success = 'success'
}

// Function to add an event to Supabase
const addEventToSupabase = async (eventData: {
    title: string;
    description: string;
    date: string;
    hour: string;
}) => {
    const { data, error } = await supabase
        .from('Event')
        .insert([eventData]);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const AddEvent: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const styles = makeStyles(theme);

    const [status, setStatus] = useState<Status>(Status.Idle);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());

    const queryClient = useQueryClient();

    // Define the mutation
    const { mutate, status: mutationStatus } = useMutation({
        mutationFn: addEventToSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['events'],
            });
            setStatus(Status.Success);
            setTitle('');
            setDescription('');
            router.push('/calendar');
        },
        onError: (error: Error) => {
            console.error(error.message);
            setStatus(Status.Error);
        }
    });

    // Handle the add event button press
    const handleAddEvent = () => {
        const eventData = {
            title,
            description,
            date: date.toISOString().split('T')[0],
            hour: hour.toTimeString().split(' ')[0]
        };
        mutate(eventData);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Input
                    inputStyle={{ color: "white" }}
                    placeholderTextColor={"white"}
                    textAlign='center'
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    containerStyle={styles.inputContainer}
                />
                <Input
                    inputStyle={{ color: "white" }}
                    placeholderTextColor={"white"}
                    textAlign='center'
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    containerStyle={styles.inputContainer}
                />
                <View style={styles.datetimeContainer}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                        }}
                    />
                    <DateTimePicker
                        value={hour}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            const currentTime = selectedTime || hour;
                            setHour(currentTime);
                        }}
                    />
                </View>
                {mutationStatus === 'pending' ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                ) : (
                    <Button
                        title="Add Event"
                        onPress={handleAddEvent}
                        buttonStyle={styles.button}
                    />
                )}
                {status === Status.Error && (
                    <Text style={styles.errorText}>Failed to create event. Please try again.</Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};



const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    inputContainer: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        borderRadius: 15
    },
    selectDateContainer: {
        flexDirection: 'row',
        gap: 10
    },
    datetimeContainer: {
        justifyContent: 'center',
        flexDirection: "row",
        marginVertical: 10,
        padding: 10,
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 20,
    },

})



export default AddEvent;