import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LanguageDropdown from '../components/LanguageDropdown';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* You can use an actual image or an icon library like react-native-vector-icons */}
        <Text style={styles.headerText}>PHOTO MOONG</Text>
      </View>
      <LanguageDropdown />
      <br />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LET'S START</Text>
      </TouchableOpacity>
      {/* Dropdown component will be a custom component or from a library like react-native-picker */}      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBEAFF', // The background color might need adjustment
  },
  header: {
    marginBottom: 50, // Adjust as per the design spacing
  },
  headerText: {
    fontSize: 32, // Adjust the size as needed
    fontWeight: 'bold',
    color: '#FF00FF', // This color is a placeholder, replace with the exact color from the design
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFC0CB', // This color is a placeholder, replace with the exact color from the design
    borderRadius: 20, // Adjust border radius to match the design
    elevation: 3, // This adds a drop shadow, adjust as needed
  },
  buttonText: {
    color: '#FFFFFF', // Adjust text color as per the design
    fontSize: 18, // Adjust font size as per the design
    fontWeight: '600',
  },
  // Add styles for the dropdown component here
});

export default Home;
