import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import store, { fetchContactsSuccess, mapContacts } from "./src/Store";
import Contacts from "./src/Contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileContact from "./src/ProfileContact";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const ContactListScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{ title: 'Contact List' }}
          />
          <Stack.Screen
            name="ProfileContact"
            component={ProfileContact}
            options={({route}) => ({title: "contact profile",})}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
        favorite: Math.random() > 0.1 ? true : false,
      };
    };

    const storeData = async (value: any) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('contacts', jsonValue);
        console.log('Stored Contacts:', jsonValue);
      } catch (error) {
        console.error('Error storing contacts:', error);
      }
    }

    const fetchContacts = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=15');
        const data = await response.json();
        const mappedContacts = data.results.map(mapContacts);
        console.log('Mapped Contacts:', mappedContacts);
        storeData(mappedContacts);

      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }



    fetchContacts();
    

  }, []);

  return (
    <ContactListScreen/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default App;