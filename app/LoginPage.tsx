import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input, Text } from '@rneui/themed'
import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";
import useSessionStore from '@src/stores/sessionStore'

export default function Auth() {

    const theme = useTheme();
    const styles = makeStyles(theme);



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { session, setSession } = useSessionStore()

    async function signInWithEmail() {
        setSession(true as unknown as any)
        setLoading(true)
        // const { error } = await supabase.auth.signInWithPassword({
        //     email: email,
        //     password: password,
        // })

        // if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        setSession(session)

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    inputStyle={{ color: theme.colors.white }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Enter your email address"
                    placeholderTextColor={theme.colors.darkGrey}
                    autoCapitalize={'none'}
                    style={{ textAlign: 'center' }}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    inputStyle={{ color: theme.colors.white }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.colors.darkGrey}
                    autoCapitalize={'none'}
                    style={{ textAlign: 'center' }}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title="Sign in"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Sign up"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                />
            </View>
        </View>
    )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        padding: theme.spacings.xl,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    title: {
        fontSize: 28,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 40,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
    },
    buttonTitle: {
        color: theme.colors.white
    },
})
