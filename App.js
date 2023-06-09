import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Details from './pages/details';
import Home from './pages/home';
import Bookmarks from './pages/bookmarks';
import { Provider } from'react-redux';
import { store } from'./redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home"component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="Details"component={Details} options={{title:"Détails"}} />
            <Stack.Screen name="Bookmarks" component={Bookmarks} options={{title:"Mes jeux"}}/>
          </Stack.Navigator>
          <StatusBar hidden={true} style="auto" />
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});