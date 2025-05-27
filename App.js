import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SplashScreen from './screens/SplashScreen';
import FavScreen from './screens/FavScreen';
import constants from './utils';
import { createDrawerNavigator,CustomDrawerContent } from '@react-navigation/drawer';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import { FavoritesProvider } from './context/favcontext';
import { FavoritesContext } from './context/favcontext';


const stack=createNativeStackNavigator();
const Drawer =createDrawerNavigator();
function DrawerNavigator(){
  return(
<Drawer.Navigator
  screenOptions={({ route }) => ({
    // ✅ Drawer styling
    drawerStyle: {
      backgroundColor: '#808080', // grey background for drawer
      width: 240,
    },
    drawerActiveTintColor: 'black',
    drawerActiveBackgroundColor: '#A9A9A9',
    drawerInactiveTintColor: '#ecf0f1',
    drawerItemStyle: {
      marginVertical: 11,
    },
    drawerLabelStyle: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    // ✅ Header styling (this part was missing)
    headerStyle: {
      backgroundColor: '#121212', // match drawer
    },
    headerTintColor: '#ffffff', // white back button + title
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },

    // ✅ Drawer icons
    drawerIcon: ({ focused, color, size }) => {
      if (route.name === 'Home') {
        return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
      } else if (route.name === 'Fav') {
        return <FontAwesome name={focused ? 'star' : 'star-o'} size={size} color={color} />;
      }
    }
  })}
>
    <Drawer.Screen
    name="Home"
    component={HomeScreen}>  
      </Drawer.Screen>
    <Drawer.Screen
    name="Fav"
    component={FavScreen}
    ></Drawer.Screen>
  </Drawer.Navigator>
  );
}
  

export default function App() {
  return (
    <FavoritesProvider>
   <NavigationContainer>
    <stack.Navigator
    screenOptions={{
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#ffffff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <stack.Screen name='Splash'
      component={SplashScreen}
      options={{headerShown:false}}
      ></stack.Screen>
      <stack.Screen name='Main'
      component={DrawerNavigator}
      options={{headerShown:false}}
    
      ></stack.Screen>
      <stack.Screen name='Details'
      component={DetailsScreen}
      
      ></stack.Screen>
    </stack.Navigator>
   </NavigationContainer>
   </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    drawerHeader: {
    height: 150,
    backgroundColor: '#1e272e', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    backgroundColor: '#e74c3c', 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
  

