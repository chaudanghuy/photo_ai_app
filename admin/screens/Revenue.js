import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Revenue = () => {
  // Dummy data for room statistics
  const rooms = [
    {
      id: 'ROOM4',
      basePrice: '100000',
      extraPrintPrice: '20000',
      orderNumber: '85',
      income: '7440000',
    },
    // ... Add other rooms here
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Finance Management</Text>

      <View style={styles.dateSwitch}>
        <TouchableOpacity style={styles.dateButtonActive}>
          <Text style={styles.dateButtonTextActive}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>This Month</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.stat}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>2024-2-13 (Today)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.stat}>
          <Text style={styles.statLabel}>Stores</Text>
          <Text style={styles.statValue}>whole (6)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>Income 15140000</Text>
        <Text style={styles.orderText}>Order Number 205</Text>
      </View>

      {rooms.map((room) => (
        <View key={room.id} style={styles.roomContainer}>
          <Text style={styles.roomHeader}>{room.id}</Text>
          <View style={styles.roomStats}>
            <Text>Base Price: {room.basePrice}</Text>
            <Text>Extra Print Price: {room.extraPrintPrice}</Text>
            <Text>Order Number: {room.orderNumber}</Text>
            <Text>Income: {room.income}</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add your navigation bar here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F00',
    textAlign: 'center',
    marginVertical: 20,
  },
  dateSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  dateButtonText: {
    color: '#FFFFFF',
  },
  dateButtonActive: {
    backgroundColor: '#E65100',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  dateButtonTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  stat: {
    marginVertical: 10,
  },
  statLabel: {
    fontSize: 16,
    color: 'grey',
  },
  statValue: {
    fontSize: 18,
    color: '#FF6F00',
  },
  incomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  incomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  orderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  roomContainer: {
    backgroundColor: '#FFCCBC',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  roomStats: {
    flex: 1,
    justifyContent: 'center',
  },
  detailsButton: {
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: '#FFF',
  },
  // Add styles for your navigation bar
});

export default Revenue;
