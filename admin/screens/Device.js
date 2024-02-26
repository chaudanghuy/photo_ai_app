import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validation Schema
const EditDeviceSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  number: Yup.string().required('Required'),
  photo_shooting_time: Yup.string().required('Required'),
  photo_suffer_time: Yup.string().required('Required'),
  store_id: Yup.string().required('Required'),
  photo_work_time: Yup.string().required('Required'),
  print_price: Yup.string().required('Required'),
  product_price: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string().required('Required'),
      price: Yup.string().required('Required'),
    })
  ),
  contact_number_for_failure: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
});

const Device = ({ deviceId, handleEditFormShow, stores }) => {
  const [myDevice, setMyDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch device by id
    const fetchDevice = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://localhost:8080/api/v1/devices/${deviceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMyDevice(data);
      setIsLoading(false);
    };

    fetchDevice();
  }, [deviceId]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Formik
          initialValues={{
            name: myDevice.name,
            number: myDevice.number,
            photo_shooting_time: myDevice.photo_shooting_time,
            photo_suffer_time: myDevice.photo_suffer_time,
            store_id: myDevice.store_id,
            photo_work_time: myDevice.photo_work_time,
            print_price: myDevice.print_price,
            product_price: myDevice.product_price,
            contact_number_for_failure: myDevice.contact_number_for_failure,
            status: myDevice.status,
            stores: stores
          }}
          validationSchema={EditDeviceSchema}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <ScrollView>
              <Input
                label="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Input
                label="Number"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.number}
              />
              <Input
                label="Photo Shooting Time"
                onChangeText={handleChange('photo_shooting_time')}
                onBlur={handleBlur('photo_shooting_time')}
                value={values.photo_shooting_time}
              />
              <Input
                label="Photo Suffer Time"
                onChangeText={handleChange('photo_suffer_time')}
                onBlur={handleBlur('photo_suffer_time')}
                value={String(values.photo_suffer_time)}
                keyboardType="numeric"
              />
              <View style={styles.row}>
                <Text style={styles.label}>Store</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.store_id}
                    onValueChange={(itemValue, itemIndex) => setFieldValue('store_id', itemValue)}
                    style={styles.picker}
                  >
                    {values.stores.map(store => (
                      <Picker.Item key={store.id} label={store.name} value={store.id} />
                    ))}
                  </Picker>
                </View>
              </View>
              <Input
                label="Photo Work Time"
                onChangeText={handleChange('photo_work_time')}
                onBlur={handleBlur('photo_work_time')}
                value={String(values.photo_work_time)}
                keyboardType="numeric"
              />
              <Input
                label="Print Price"
                onChangeText={handleChange('print_price')}
                onBlur={handleBlur('print_price')}
                value={String(values.print_price)}
                keyboardType="numeric"
              />
              {/* Dynamically add product prices */}
              {values.product_price.map((product, index) => (
                <View key={index}>
                  <Input
                    label="Product Name"
                    onChangeText={text => setFieldValue(`product_price[${index}].product_name`, text)}
                    value={product.product_name}
                  />
                  <Input
                    label="Price"
                    onChangeText={text => setFieldValue(`product_price[${index}].price`, text)}
                    value={product.price}
                  />
                </View>
              ))}
              <Button
                title="Add Product Price"
                onPress={() => {
                  const product_price = values.product_price.concat({ product_name: '', price: '' });
                  setFieldValue('product_price', product_price);
                }}
              />
              <Input
                label="Contact Number for Failure"
                onChangeText={handleChange('contact_number_for_failure')}
                onBlur={handleBlur('contact_number_for_failure')}
                value={values.contact_number_for_failure}
              />
              <Input
                label="Status"
                onChangeText={handleChange('status')}
                onBlur={handleBlur('status')}
                value={values.status}
              />
              <Button onPress={handleSubmit} title="Submit" />
              <Button onPress={() => handleEditFormShow(false)} title='Go Back' color='#000' />
            </ScrollView>
          )}
        </Formik>
      )};
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    ...Platform.select({
      android: {
        height: 50, // Adjust as needed
        color: '#000',
      },
      ios: {
        // iOS-specific styles if needed
      },
    }),
  },
});

export default Device;
