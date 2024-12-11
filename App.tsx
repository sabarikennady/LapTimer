import React from 'react';
import { SafeAreaView } from 'react-native';
import LapTimer from './src/LapTimer';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LapTimer />
    </SafeAreaView>
  );
};

export default App;
