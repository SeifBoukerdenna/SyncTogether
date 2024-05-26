import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, Icon } from '@rneui/themed';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';

interface EventProps {
    id: number;
    title: string;
    hour: string;
    date: string;
}

const EventComponent: React.FC<EventProps> = ({ id, title, hour, date }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [pressIn, setIsPressIn] = useState(false)

    return (
        <Button buttonStyle={pressIn ? styles.containerPressIn : styles.container} onPressOut={() => { setIsPressIn(false) }} onPressIn={() => { setIsPressIn(true) }}>
            <Icon name="event" size={24} color="white" style={styles.icon} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.info}>{`ID: ${id}`}</Text>
                <Text style={styles.info}>{`Date: ${date}`}</Text>
                <Text style={styles.info}>{`Hour: ${hour}`}</Text>
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
