// src/index.tsx
import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Image } from 'react-native';
import LinearGradient from 'src/components/LinearGradient';
import { ThemeProvider } from 'src/Context/ThemeContext';
import { useTheme } from 'src/hooks/useTheme';
import { Theme } from 'src/Theme/theme.d';
import { Button, Text, Icon } from '@rneui/themed';


const Index: React.FC = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text h1 h1Style={styles.h1Style}>synConnect</Text>
          <Text h4 h4Style={styles.h4Style}>Enhance your bond together</Text>
        </View>
        <Image
          style={styles.item}
          source={{ uri: "https://assets.api.uizard.io/api/cdn/stream/24ef11f5-895a-47df-a435-07e5b49624d2.png'" }}
        />
        <Button buttonStyle={styles.button} color={theme.colors.white} type='solid'><Icon type='font-awesome' name="heart" color="black" /></Button>
        <Text h4 h4Style={styles.h4Style}>Stay connected and organized together.
        </Text>
        <Text style={styles.subTitle}>
          Explore new activities as a couple
        </Text>

      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({
  button: {
    margin: theme.spacings.s,
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
  },
  subTitle: {
    fontSize: theme.fontSize.m,
    color: theme.colors.white
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.onBackground,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacings.l,
  },
  h1Style: {
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  h4Style: {
    color: theme.colors.white,
  },
  item: {
    width: '100%',
    aspectRatio: 1,
  },
  contentContainer: {
    alignItems: 'center',
    gap: theme.spacings.xxl,
    padding: theme.spacings.m,
  },
});

const Root: React.FC = () => (
  <ThemeProvider>
    <Index />
  </ThemeProvider>
);

export default Root;