import { useTheme } from 'src/hooks/useTheme';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from 'src/Theme/theme.d';
import { Button, Text, Icon } from '@rneui/themed';

import AddEvent from '@src/Screen/AddEvent';


export default function Tab() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            <AddEvent />
        </View>
    );
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.onBackground,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

