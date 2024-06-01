import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from 'src/hooks/useTheme';
import React from 'react';
import { Theme } from 'src/Theme/theme.d';
import { Button, Text, Icon } from '@rneui/themed';
import Settings from '@src/Component/Settings/Settings';


export default function Tab() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <Settings />
        </SafeAreaView>
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