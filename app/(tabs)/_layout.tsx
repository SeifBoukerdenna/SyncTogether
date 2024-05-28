import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { theme } from 'src/Theme/theme'
import { Button, Text, Icon } from '@rneui/themed';
import { StyleSheet, View } from 'react-native'


export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarInactiveTintColor: theme.colors.white, tabBarActiveTintColor: theme.colors.primary, tabBarShowLabel: false, tabBarStyle: { backgroundColor: theme.colors.black, borderTopWidth: 0 } }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Icon size={28} name="home" color={color} />,
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="calendar"
                options={{
                    title: 'calendar',
                    tabBarIcon: ({ color }) => <Icon size={28} type='font-awesome' name="calendar" color={color} />,
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title: 'add',
                    tabBarIcon: ({ color }) => <View style={styles.circle}>
                        <Icon size={30} type='ionicon' name="add" color={color} />
                    </View>,
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Icon size={28} type='font-awesome' name="camera-retro" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    tabBarIcon: ({ color }) => <Icon name="cog" type="font-awesome" color={color} size={28} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="[id]/index"
                options={{
                    href: null,
                    headerShown: false

                }} />
            <Tabs.Screen
                name="[id]/edit"
                options={{
                    href: null,
                    headerShown: false

                }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.colors.white,
        backgroundColor: theme.colors.onBackground,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
});