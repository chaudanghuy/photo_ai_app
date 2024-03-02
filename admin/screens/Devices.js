import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from "react-native-elements";
import Device from "./Device";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const Root = createStackNavigator();

const Devices = () => {
  const [text, onChangeText] = useState('Search Device..');
  const [statusFilter, setStatusFilter] = useState('online');
  const [showForm, setShowForm] = useState(false);
  const [myDevices, setMyDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch('http://localhost:8080/api/v1/devices', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMyDevices(data);
        setIsLoading(false);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    filterDevices();
  }, [searchQuery, statusFilter, myDevices]);

  useEffect(() => {
      const fetchStores = async () => {
        try {
          const userToken = await AsyncStorage.getItem('userToken');
          const response = await fetch('http://localhost:8080/api/v1/stores', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setStores(data);          
        } catch(error) {

        }
      };

      fetchStores();
  }, []);

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

  function handleEditFormShow(isShowForm = true, chooseDevice = null) {
    setShowForm(isShowForm);
    if (chooseDevice === null) return setDeviceId(null);
    setDeviceId(chooseDevice);
  }  

  const filterDevices = () => {
    let tempDevices = [...myDevices];

    if (statusFilter) {
      tempDevices = tempDevices.filter(device => device.status === statusFilter);
    }

    if (searchQuery) {
      tempDevices = tempDevices.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDevices(tempDevices);
  }

  const DeviceCard = ({ _id, number, status, name, print_price, contact_number_for_failure, date_created, handleEditFormShow }) => {
    return (
      <TouchableOpacity onPress={() => handleEditFormShow(true, _id)}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.roomText}>{name}</Text>
            <View style={[styles.statusIndicator, { backgroundColor: status === 'online' ? 'green' : 'red' }]} />
            <Text style={styles.statusText}>{status}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text>Device: {number}</Text>
            <Text>Base Price: {print_price}</Text>
            <Text>Consumables Remaining: {contact_number_for_failure}</Text>
            <Text>Device Update Time: {date_created}</Text>
          </View>
          {/* Icon from react-native-vector-icons or your own custom icon */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {showForm ? (<Device deviceId={deviceId} handleEditFormShow={handleEditFormShow} stores={stores}/>) :

        (<><View style={styles.searchBar}>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setSearchQuery}
              placeholder={text}
              value={searchQuery}
            />
          </SafeAreaView>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setStatusFilter('online')}>
            <Text style={styles.radioText}>Online</Text>
            {statusFilter === 'online' && <View style={styles.radioDot} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setStatusFilter('offline')}>
            <Text style={styles.radioText}>Offline</Text>
            {statusFilter === 'offline' && <View style={styles.radioDot} />}
          </TouchableOpacity>
        </View>

          <View style={styles.container}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                data={filteredDevices}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <DeviceCard {...item} handleEditFormShow={handleEditFormShow} />
                )}
              />
            )}
          </View>

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
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
  },
  radioText: {
    marginRight: 10,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});

export default Devices;