import { useTheme } from 'src/hooks/useTheme';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from 'src/Theme/theme.d';
import { Button, Text, Icon } from '@rneui/themed';



export default function Tab() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            <Text h1>About Screen</Text>
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

