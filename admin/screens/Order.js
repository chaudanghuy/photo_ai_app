import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Order = () => {
  const [orderNumberQuery, setOrderNumberQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Total</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Refunded</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Paid</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Please enter the full order number query"
          value={orderNumberQuery}
          onChangeText={setOrderNumberQuery}
        />
        {/* Placeholder for search icon */}
      </View>

      <View style={styles.dateSelection}>
        <Text style={styles.dateText}>Selection Time:</Text>
        <Text style={styles.dateRange}>2024/2/18 - 2024/2/25</Text>
      </View>

      <ScrollView style={styles.orderList}>
        {/* Order Item Component should be mapped here based on actual data */}
        <View style={styles.orderItem}>
          <Text style={styles.orderDetail}>Number of orders paid today: 169</Text>
          <Text style={styles.orderNumber}>Order Number: T024022597220925240167xK5994</Text>
          <View style={styles.orderInfo}>
            <Text style={styles.infoText}>Payment equipment: ROOM2</Text>
            <Text style={styles.infoText}>Device Number: TFD20240109-05994-PAHBYUSC</Text>
            <Text style={styles.infoText}>Price: 80000</Text>
            <Text style={styles.infoText}>Number of Purchases: 1</Text>
            <Text style={styles.infoText}>Number of Additional Prints: ROOM2数量</Text>
            <Text style={styles.infoText}>Create Time: 2024/02/25 20:25:25</Text>
            <Text style={styles.infoText}>Payment Time: 2024/02/25 20:25:25</Text>
          </View>
          <TouchableOpacity style={styles.refundButton}>
            <Text style={styles.refundButtonText}>Refund</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        {/* Navigation bar items should be listed here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF6A00',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FF6A00',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  activeTabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  dateSelection: {
    padding: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  dateRange: {
    fontSize: 16,
    color: '#666',
  },
  orderList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  orderDetail: {
    fontSize: 16,
    color: '#FF6A00',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  orderInfo: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  refundButton: {
    backgroundColor: '#FF6A00',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  refundButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default Order;
