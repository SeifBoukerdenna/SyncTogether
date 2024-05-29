import { useTheme } from 'src/hooks/useTheme';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Theme } from 'src/Theme/theme.d';
import { Button, Text, Icon } from '@rneui/themed';
import Timeline from '@src/Component/Timeline/Timeline';

export default function Tab() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Timeline />

            </View>
        </SafeAreaView>
    );
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.onBackground,
    },
})

