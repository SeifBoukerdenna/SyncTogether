import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Input, Text, Button, SearchBar } from '@rneui/themed';
import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';

const CardEvent = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("01/01/2022");
    const [title, setTitle] = useState("Event Title");
    const [description, setDescription] = useState("Event Description");
    const [tags, setTags] = useState("Event, React Native");

    return (
        <View style={styles.cardEventContainer}>
            <View style={styles.dateContainer}>
                <Text h4 h4Style={{ color: theme.colors.white }}>{date}</Text>
            </View>
            <View style={styles.mediaContainer}>
                {/* <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} /> */}
            </View>
            <View style={styles.titleContainer}>
                <Text h4 h4Style={{ color: theme.colors.white }}>{title}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text>{"Event Descriptio, Event Descriptio, Event Descriptio, Event Descriptio, Event Descriptio"}</Text>
            </View>
            <View style={styles.tagsContainer}>
                <Text>{tags}</Text>
            </View>
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    cardEventContainer: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: theme.colors.grey,
        height: 200,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: theme.colors.black,
    },
    dateContainer: {
        alignItems: 'flex-start',
        marginLeft: theme.spacings.m,
    },
    mediaContainer: {
        width: '100%',
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        alignItems: 'flex-start',
        marginLeft: theme.spacings.m,
    },
    descriptionContainer: {
        marginTop: theme.spacings.m,
        alignItems: 'flex-start',
        marginLeft: theme.spacings.m,
    },
    tagsContainer: {
        alignItems: 'flex-end',
        marginRight: theme.spacings.m,
    }
});

export default CardEvent;