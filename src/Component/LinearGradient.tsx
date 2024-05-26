// src/components/LinearGradient.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface LinearGradientProps {
    colors: [string, string];
    style?: any;
    children?: React.ReactNode;
}

const LinearGradient: React.FC<LinearGradientProps> = ({ colors, style, children }) => {
    return (
        <View style={[style, { flex: 1 }]}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors[0], opacity: 0.1 }]} />
            <View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        backgroundColor: colors[1],
                        opacity: 0.9,
                        transform: [{ rotate: '180deg' }],
                    },
                ]}
            />
            {children}
        </View>
    );
};

export default LinearGradient;