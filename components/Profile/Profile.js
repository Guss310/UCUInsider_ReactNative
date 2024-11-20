// This is the component that will create the Profile screen. It will show the user's name, email and picture.

// This are imports of the component.
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../Contexts/AuthContext';

// This is the Profile component.
const Profile = () => {
  const { user } = useContext(AuthContext); // This line will get the user from the AuthContext.


  // This is the return of the component. It will show the user's name, email and picture.
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.picture }} style={styles.profileAvatar} />
      </View>
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
    </View>
  );
};

// This is the style of the component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  avatarContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#FF4500',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 500,
    elevation: 30,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 300,
    height: 300,
    borderRadius: 147,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
});


export default Profile;