// This component displays information about the app, such as its purpose, features, version, and developer.

// This are the imports of the project.
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

// This is the Info component.
const Info = () => (
  <ScrollView style={styles.container}>
    <View style={styles.infoHeader}>
      <Feather name="info" size={48} color="#FF4500" />
      <Text style={styles.infoTitle}>Acerca de UCUInsider</Text>
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoText}>
        UCUInsider es una aplicación de ejemplo inspirada en la popular plataforma Reddit. 
        Diseñada para demostrar las capacidades de React Native en la creación de interfaces 
        de usuario atractivas y funcionales.
      </Text>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Características</Text>
        <View style={styles.featureItem}>
          <Feather name="layout" size={20} color="#FF4500" />
          <Text style={styles.featureText}>Diseño intuitivo y atractivo</Text>
        </View>
        <View style={styles.featureItem}>
          <Feather name="refresh-cw" size={20} color="#FF4500" />
          <Text style={styles.featureText}>Versión más actualizada</Text>
        </View>
        <View style={styles.featureItem}>
          <Feather name="users" size={20} color="#FF4500" />
          <Text style={styles.featureText}>Tiene perfil de usuario</Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Versión</Text>
        <Text style={styles.versionText}>1.2.8</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoSectionTitle}>Desarrollado por</Text>
        <Text style={styles.developerText}>Gustavo González</Text>
      </View>
    </View>
  </ScrollView>
);


// This is the style of the component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  infoHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1a1a1a',
  },
  infoContent: {
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    fontSize: 16,
    color: '#333',
  },
  developerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Info;