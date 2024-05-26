// src/index.tsx
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'src/components/LinearGradient';
import { ThemeProvider } from 'src/Context/ThemeContext';
import { useTheme } from 'src/hooks/useTheme';
import { Theme } from 'src/Theme/theme.d';

const Index: React.FC = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <LinearGradient colors={[theme.colors.primary, theme.colors.darkPurple]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Dashboard</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.calendarButton}>
              <Text style={styles.buttonText}>Go to Calendar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.black,

  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacings.m,
  },
  header: {
    padding: theme.spacings.l,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacings.s,
    marginBottom: theme.spacings.m,
  },
  headerText: {
    color: theme.colors.onSecondary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: theme.spacings.m,
  },
  calendarButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacings.m,
    paddingHorizontal: theme.spacings.xl,
    borderRadius: theme.spacings.s,
  },
  buttonText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacings.m,
    borderRadius: theme.spacings.s,
    marginVertical: theme.spacings.s,
  },
  sectionTitle: {
    color: theme.colors.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacings.s,
  },
  widget: {
    backgroundColor: theme.colors.lightPurple,
    padding: theme.spacings.m,
    borderRadius: theme.spacings.s,
  },
  widgetText: {
    color: theme.colors.onPrimary,
    marginBottom: theme.spacings.xxs,
  },
});

const Root: React.FC = () => (
  <ThemeProvider>
    <Index />
  </ThemeProvider>
);

export default Root;