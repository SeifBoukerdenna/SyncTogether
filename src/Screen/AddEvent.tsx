// AddEvent.tsx

import React, { useEffect, useState } from 'react';
import { supabase } from 'supabase';
import { View, StyleSheet, Alert, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';

const AddEvent: React.FC = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);



    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUserId(session?.user?.id || null); // Correct way to set the userId
        })();
    }, []);

    const handleAddEvent = async () => {
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    user_id: userId, // Use the userId from state
                    title,
                    description,
                    date: date.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
                    hour: hour.toTimeString().split(' ')[0]  // Format the hour as HH:MM:SS
                },
            ]);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Event added successfully');
        }
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
                <Button
                    title="Add Event"
                    onPress={handleAddEvent}
                    buttonStyle={styles.button}
                />
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