import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateEventInSupabase from '@src/Api/Event/updateEvent';
import fetchEventFromSupabase from '@src/Api/Event/fetchEvent';
import { EventType, tag, tagColors } from '@src/Component/Event/types';

const EditEventPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();
    const styles = makeStyles(theme);

    const [selectedTags, setSelectedTags] = useState<tag[]>([]);

    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<EventType>({
        id: id as unknown as number,
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        hour: new Date().toTimeString().split(' ')[0],
    });


    const fetchMutation = useMutation({
        mutationFn: () => fetchEventFromSupabase(id as string),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['events'],
            });
            setFormData(data);
            setSelectedTags(data.tags || []); // Initialize selected tags
        }
    });

    const updateMutation = useMutation({
        mutationFn: (newEvent: EventType) => updateEventInSupabase(id as string, newEvent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['event', id] });
            router.replace(`/calendar`);
        },
        onError: (error) => {
            console.error('Error updating event:', error);
        },
    });

    const handleChange = (name: keyof EventType, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const updatedEvent = {
            ...formData,
            date: new Date().toISOString().split('T')[0],
            hour: new Date().toTimeString().split(' ')[0],
            tags: selectedTags,
        };
        updateMutation.mutate(updatedEvent);
    };

    useEffect(() => {
        fetchMutation.mutate();
    }, [id]);


    const getDateFromFormData = () => {
        if (!formData.date) return new Date();
        return new Date(formData.date);
    };

    const getTimeFromFormData = () => {
        if (!formData.hour) return new Date();
        const [hours, minutes] = formData.hour.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    };

    const toggleTag = (tag: tag) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

    return (
        <View style={styles.containerBigger}>
            <Text style={styles.header}>Event Details</Text>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Input
                        inputStyle={{ color: "white" }}
                        placeholderTextColor={"grey"}
                        textAlign='center'
                        placeholder={formData.title || "Title"}
                        value={formData.title}
                        onChangeText={(text) => handleChange('title', text)}
                        containerStyle={styles.inputContainer}
                    />
                    <Input
                        inputStyle={{ color: "white" }}
                        placeholderTextColor={"grey"}
                        placeholder={formData.description || "Description"}
                        textAlign='center'
                        value={formData.description}
                        onChangeText={(text) => handleChange('description', text)}
                        containerStyle={styles.inputContainer}
                    />
                    <View style={styles.datetimeContainer}>
                        <DateTimePicker
                            value={getDateFromFormData()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || getDateFromFormData();
                                handleChange('date', currentDate.toISOString().split('T')[0]);
                            }}
                        />
                        <DateTimePicker
                            value={getTimeFromFormData()}
                            mode="time"
                            display="default"
                            onChange={(event, selectedTime) => {
                                const currentTime = selectedTime || getTimeFromFormData();
                                handleChange('hour', currentTime.toTimeString().split(' ')[0]);
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
                    <Button
                        title="Edit Event"
                        onPress={handleSubmit}
                        buttonStyle={styles.button}
                    />
                    <Button
                        title="Cancel"
                        titleStyle={styles.buttonText}
                        onPress={() => { router.replace(`event/${id}`) }}
                        buttonStyle={styles.buttonOutline}
                        type='outline'
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
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
    containerBigger: {
        backgroundColor: theme.colors.onBackground,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginVertical: 10,
    },
    datetimeContainer: {
        justifyContent: 'center',
        flexDirection: "row",
        marginVertical: 10,
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.white,
        marginBottom: 20,
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
    eventCard: {
        backgroundColor: theme.colors.black,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        fontSize: theme.fontSize.l,
        color: theme.colors.white,
        padding: 10,
    },

    button: {
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        borderRadius: 15,
        width: '100%',
    },
    buttonOutline: {
        marginTop: 20,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 15,
        width: '100%',
    },
    buttonText: {
        color: theme.colors.white,
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

export default EditEventPage;
