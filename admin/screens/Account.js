import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { Icon } from 'react-native-elements';

const Account = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://placekitten.com/100/100' }} // Placeholder image
          style={styles.profileImage}
        />
        <Text style={styles.username}>photomong</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon type="ionicon" name="settings" color="#000" />
          <Text style={styles.menuText}>Operation Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>619</Text>
          </View>
          <Icon type="ionicon" name="notifications" color="#000" />
          <Text style={styles.menuText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon type="ionicon" name="pricetag" color="#000" />
          <Text style={styles.menuText}>Effects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon type="ionicon" name="settings" color="#000" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Enable Wechat Notification For Device Issues</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isNotificationsEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  header: {
    backgroundColor: '#FF6F00',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    color: '#000',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuText: {
    marginTop: 5,
    color: '#000',
  },
  notificationBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  toggleLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  // Add more styles as needed
});

export default Account;
