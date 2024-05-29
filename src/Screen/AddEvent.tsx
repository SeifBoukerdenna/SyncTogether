import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';
import { useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import addEventToSupabase from '@src/Api/Event/addEvent';

enum Status {
    Idle = 'idle',
    Error = 'error',
    Success = 'success'
}


import { tag, tagColors } from '@src/Component/Event/types';



const AddEvent: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const styles = makeStyles(theme);

    const [status, setStatus] = useState<Status>(Status.Idle);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());
    const [selectedTags, setSelectedTags] = useState<tag[]>([]);

    const queryClient = useQueryClient();

    const { mutate, status: mutationStatus } = useMutation({
        mutationFn: addEventToSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['events'],
            });
            setStatus(Status.Success);
            setTitle('');
            setDescription('');
            setSelectedTags([]);
            router.push('/calendar');
        },
        onError: (error: Error) => {
            console.error(error.message);
            setStatus(Status.Error);
        }
    });

    const handleAddEvent = () => {
        const eventData = {
            title,
            description,
            date: date.toISOString().split('T')[0],
            hour: hour.toTimeString().split(' ')[0],
            tags: selectedTags
        };
        mutate(eventData);
    };

    const toggleTag = (tag: tag) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
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
                <View style={styles.tagsContainer}>
                    {Object.values(tag).map(tag => (
                        <TouchableOpacity
                            key={tag}
                            style={[
                                styles.tagButton,
                                {
                                    borderColor: theme.colors.white,
                                    borderWidth: 1

                                },
                                selectedTags.includes(tag) && styles.selectedTagButton
                            ]}
                            onPress={() => toggleTag(tag)}
                        >
                            <Text style={styles.tagButtonText}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {mutationStatus === 'pending' ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                ) : (
                    <>
                        <Button
                            title="Add Event"
                            onPress={handleAddEvent}
                            buttonStyle={styles.button}
                        />
                        <Button
                            title="Cancel"
                            titleStyle={{ color: theme.colors.white }}
                            onPress={() => { router.push(`/calendar`) }}
                            buttonStyle={styles.buttonOutline}
                            type='outline'
                        />
                    </>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.white,
        marginBottom: 20,
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
    buttonOutline: {
        marginTop: 20,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 15,
        width: '100%',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
    },
    tagButton: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    selectedTagButton: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    tagButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default AddEvent;
