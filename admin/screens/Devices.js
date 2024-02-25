import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from "react-native-elements";
import Device from "./Device";

const Root = createStackNavigator();

const DeviceCard = ({ room, status, deviceNumber, basePrice, extraPrintPrice, consumablesRemaining, updateTime, navigation, handleEditFormShow }) => {
  return (
    <TouchableOpacity onPress={() => handleEditFormShow(true)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.roomText}>{room}</Text>
          <View style={[styles.statusIndicator, { backgroundColor: status === 'online' ? 'green' : 'red' }]} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text>Device Number: {deviceNumber}</Text>
          <Text>Base Price: {basePrice}</Text>
          <Text>Extra Print Price: {extraPrintPrice}</Text>
          <Text>Consumables Remaining: {consumablesRemaining}</Text>
          <Text>Device Update Time: {updateTime}</Text>
        </View>
        {/* Icon from react-native-vector-icons or your own custom icon */}
      </View>
    </TouchableOpacity>
  );
}

const Devices = () => {
  const [text, onChangeText] = useState('Search Device name/number..');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  function RadioButton(props) {
    return (
      <>
        <View style={[{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              }} />
              : null
          }
        </View>
        <Text style={{ marginLeft: 2, marginTop: 3, paddingRight: 5 }}>{props.value}</Text>
      </>
    );
  }


  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  function handleEditFormShow(showFormToAddOrEdit) {
    setShowForm(showFormToAddOrEdit);
  }

  const devices = [
    {
      room: 'ROOM1',
      status: 'online',
      deviceNumber: 'TFD2024110-0601-0-PAHBY...',
      basePrice: '0.01',
      extraPrintPrice: '20000',
      consumablesRemaining: '582',
      updateTime: '2024/02/11 21:22'
    },
    {
      room: 'ROOM2',
      status: 'online',
      deviceNumber: 'TFD2024109-05994-PAHBY...',
      basePrice: '10000',
      extraPrintPrice: '20000',
      consumablesRemaining: '36',
      updateTime: '2024/01/27 01:02'
    },
    // ...add more devices as needed
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.deviceCount}>4/6</Text>
        <Text>Number of Devices Online</Text>
      </View> */}

      {showForm ? (<Device handleEditFormShow={handleEditFormShow} />) :

        (<><View style={styles.searchBar}>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </SafeAreaView>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
            <RadioButton value="All" />
            <RadioButton value="Online" />
            <RadioButton value="Offline" />
          </View>
        </View>

          {devices.map(device => (
            <DeviceCard key={device.deviceNumber} {...device} handleEditFormShow={handleEditFormShow} />
          ))}


          <View style={styles.buttonContainer}>
            <Button title={'Add Device'} onPress={() => setShowForm(true)} />
          </View></>)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    backgroundColor: '#fe6028',
    alignItems: 'center',
    padding: 16,
    color: 'white',
    fontSize: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  deviceCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
  },
  searchBar: {
    marginBottom: 16,
    // Add styles for search bar
  },
  card: {
    backgroundColor: 'orange',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
  },
  cardContent: {
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  footerLink: {
    // Add styles for footer links
  },
  link: {
    // Add styles for the link
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Devices;