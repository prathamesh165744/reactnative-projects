import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [showMainContent, setShowMainContent] = useState(false);
  const [progress, setProgress] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Check if the app has been launched before
    async function checkFirstLaunch() {
      try {
        const value = await AsyncStorage.getItem('hasAppLaunched');
        if (value === null) {
          // This is the first time the app is launched.
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasAppLaunched', 'true');
        } else {
          // The app has been launched before.
          setIsFirstLaunch(false);
        }
      } catch (e) {
        // Error handling for AsyncStorage
        console.error('Failed to read hasAppLaunched from AsyncStorage', e);
      }
    }
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    // This effect runs once the first launch check is complete
    if (isFirstLaunch !== null) {
      if (isFirstLaunch) {
        // First-time user: Animate the welcome screen and progress
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();

        let timer = setInterval(() => {
          setProgress((currentProgress) => {
            const nextProgress = currentProgress + 0.1;
            if (nextProgress >= 1) {
              clearInterval(timer);
              setTimeout(() => setShowMainContent(true), 500);
              return 1;
            }
            return nextProgress;
          });
        }, 300);
        return () => clearInterval(timer);
      } else {
        // Returning user: Show the progress bar immediately
        let timer = setInterval(() => {
          setProgress((currentProgress) => {
            const nextProgress = currentProgress + 0.2;
            if (nextProgress >= 1) {
              clearInterval(timer);
              setTimeout(() => setShowMainContent(true), 500);
              return 1;
            }
            return nextProgress;
          });
        }, 100);
        return () => clearInterval(timer);
      }
    }
  }, [isFirstLaunch]); // Dependency on isFirstLaunch

  // If we are still checking for first launch, show a blank loading screen.
  if (isFirstLaunch === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If it's the first launch, display the animated landing page.
  if (isFirstLaunch && !showMainContent) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Welcome to App!</Text>
          <Text style={styles.subtitle}>Discover amazing things. Your journey starts here.</Text>
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={progress}
              width={200}
              color="#4a90e2"
              unfilledColor="#f0f0f0"
              borderWidth={0}
            />
          </View>
        </Animated.View>
      </View>
    );
  }

  // If it's a returning user, only show the progress bar.
  if (!isFirstLaunch && !showMainContent) {
    return (
      <View style={styles.container}>
        <Progress.Bar
          progress={progress}
          width={200}
          color="#4a90e2"
          unfilledColor="#f0f0f0"
          borderWidth={0}
        />
      </View>
    );
  }

  // Once the progress bar is complete, show the main app content.
  return (
    <View style={styles.container}>
      <Text style={styles.mainContent}>Welcome Back!</Text>
      <Text style={styles.subtitle}>This is your main app page.</Text>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 40,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
  },
  mainContent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default App;