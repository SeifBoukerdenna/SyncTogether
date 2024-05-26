// src/index.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './initialScreen';


const Stack = createStackNavigator();


const Index: React.FC = () => {
  return (
    <InitialScreen />
  );
};


export default Index;