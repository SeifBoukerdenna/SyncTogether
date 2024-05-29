import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from '@rneui/themed';
import { useTheme } from '@src/hooks/useTheme';
import { Theme } from '@src/Theme/theme.d';

const EmptyListComponent: React.FC = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            <Text h4 h4Style={styles.text}>No events found</Text>
            <Icon type='ionicon' name="sad-outline" color={"white"} size={35} />
        </View>
    );
};

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        color: theme.colors.white,
    }
});

export default EmptyListComponent;