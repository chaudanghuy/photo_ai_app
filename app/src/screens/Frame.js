import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Frame = () => {
  // These would be replaced with actual images for your products
  const photoStripImage = require('../images/photostrip.png');
  const multiFrameImage = require('../images/photostrip.png');

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>go back</Text>
        </TouchableOpacity>
        {/* Add other navigation buttons */}
      </View>
      <View style={styles.productsContainer}>
        <View style={styles.productCard}>
          <Text style={styles.productTitle}>PHOTOSTRIP</Text>
          <Image source={photoStripImage} style={styles.productImage} />
          <Text style={styles.priceText}>80.000 VND / 1 ẢNH IN</Text>
          {/* Add button or touchable for selection */}
        </View>
        <View style={styles.productCard}>
          <Text style={styles.productTitle}>MULTI-FRAME</Text>
          <Image source={multiFrameImage} style={styles.productImage} />
          <Text style={styles.priceText}>80.000 VND / 1 ẢNH IN</Text>
          {/* Add button or touchable for selection */}
        </View>
      </View>
      {/* Add any additional UI elements as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBEAFF', // Replace with the actual background color from your design
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    // Add styles for your navigation bar
  },
  navButton: {
    // Add styles for your navigation buttons
  },
  navButtonText: {
    // Add styles for the text inside your navigation buttons
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // Add padding or margins as needed
  },
  productCard: {
    backgroundColor: '#FFFFFF', // Replace with the actual card background color from your design
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    // Add shadow or other styles as needed
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    // Add color or other styles as needed
  },
  productImage: {
    width: 150, // Replace with the actual width from your design
    height: 150, // Replace with the actual height from your design
    marginBottom: 10,
    // Add resizeMode or other styles as needed
  },
  priceText: {
    fontSize: 16,
    // Add color or other styles as needed
  },
  // Add additional styles as needed
});

export default Frame;