import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyApp</Text>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        This is the new landing page for the application.
      </Text>

      {/* This link will point to your old home page */}
      <Link href="/home" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Enter App</Text>
        </Pressable>
      </Link>
    </View>
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
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
