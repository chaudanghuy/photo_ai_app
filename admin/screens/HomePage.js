import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomepageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.revenue}>14860000</Text>
      <Text style={styles.revenueLabel}>Today's Revenue</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>145930000.02</Text>
          <Text style={styles.statLabel}>Gross Revenue</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>2969</Text>
          <Text style={styles.statLabel}>Gross Order Quantity</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>201</Text>
          <Text style={styles.statLabel}>Today's Order Quantity</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>4/6</Text>
          <Text style={styles.statLabel}>Number of Devices Online</Text>
        </View>
      </View>

      <Text style={styles.insufficientStock}>0/6</Text>
      <Text style={styles.insufficientStockLabel}>Number of Devices with Insufficient Stock</Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add a device</Text>
      </TouchableOpacity>      

      {/* Add your navigation bar here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 20,
  },
  revenue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6F00',
    backgroundColor: '#FFF3E0',
  },
  revenueLabel: {
    fontSize: 16,
    color: '#FF6F00',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statBlock: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
  },
  insufficientStock: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  insufficientStockLabel: {
    fontSize: 16,
    color: '#FF6F00',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  languageButton: {
    // Add styles for language button
  },
  languageButtonText: {
    // Add styles for language button text
  },
  // Add styles for your navigation bar
});

export default HomepageScreen;
