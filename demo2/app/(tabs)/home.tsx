import { Image } from 'expo-image';
import { Platform, StyleSheet, Pressable, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
   <Link href="/login" asChild>
           <Pressable style={styles.button}>
             <Text style={styles.buttonText}>Enter </Text>
           </Pressable>
         </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E2C', // A dark, modern background
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#A9A9B8',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5A67D8',
    borderRadius: 50,
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 14,
    paddingHorizontal: 50,
  },
});
