import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import store, { fetchContactsSuccess, mapContacts } from "./src/Store";
import Contacts from "./src/Contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileContact from "./src/ProfileContact";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Favorites from "./src/Favorites";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@react-native-vector-icons/material-design-icons";

const Stack = createStackNavigator();

const ContactListScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contacts List"
        
        component={Contacts}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={({ route }) => ({ title: "Contact Profile", })}
      />
    </Stack.Navigator>
  );
}

const FavoritesScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites List"
        component={Favorites}
        
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={({ route }) => ({ title: "Contact Profile", })}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route})=> ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";
          if (route.name === "Contacts") {
            iconName = focused ? "contacts" : "contacts-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "star-check" : "star-check-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
      
    >
      <Tab.Screen name="Contacts" component={ContactListScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  useEffect(() => {

    const mapContacts = (contacts: any) => {
      const { name, picture, phone, cell, email } = contacts;
      return {
        name: name.first + " " + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() > 0.5 ? true : false,
      };
    };

    const storeData = async (value: any) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('contacts', jsonValue);
        //console.log('Stored Contacts:', jsonValue);
      } catch (error) {
        console.error('Error storing contacts:', error);
      }
    }

    const fetchContacts = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=15');
        const data = await response.json();
        const mappedContacts = data.results.map(mapContacts);
        //console.log('Mapped Contacts:', mappedContacts);
        storeData(mappedContacts);

      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }



    fetchContacts();


  }, []);

  return (
    // <ContactListScreen/>
    // <FavoritesScreen />
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default App;