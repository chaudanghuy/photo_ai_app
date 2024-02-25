import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'react-native-elements';

// Validation Schema
const EditDeviceSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
  photo_time: Yup.object().shape({
    shooting_time: Yup.number().required('Required').positive().integer(),
    shutter_time: Yup.number().required('Required').positive().integer(),
  }),
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

const Device = ({ handleEditFormShow }) => (
  <Formik
    initialValues={{
      code: '',
      photo_time: {
        shooting_time: 0,
        shutter_time: 0,
      },
      print_price: '',
      product_price: [],
      contact_number_for_failure: '',
      status: '',
    }}
    validationSchema={EditDeviceSchema}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
      <ScrollView>
        <Input
          label="Code"
          onChangeText={handleChange('code')}
          onBlur={handleBlur('code')}
          value={values.code}
        />
        <Input
          label="Shooting Time"
          onChangeText={handleChange('photo_time.shooting_time')}
          onBlur={handleBlur('photo_time.shooting_time')}
          value={String(values.photo_time.shooting_time)}
          keyboardType="numeric"
        />
        <Input
          label="Shutter Time"
          onChangeText={handleChange('photo_time.shutter_time')}
          onBlur={handleBlur('photo_time.shutter_time')}
          value={String(values.photo_time.shutter_time)}
          keyboardType="numeric"
        />
        <Input
          label="Print Price"
          onChangeText={handleChange('print_price')}
          onBlur={handleBlur('print_price')}
          value={values.print_price}
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
);

export default Device;
