import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import store, { fetchContactsSuccess, mapContacts } from "./src/Store";
import Contacts from "./src/Contacts";
import { Provider } from "react-redux";





const App = () => {
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        const mappedContacts = data.results.map(mapContacts);
        store.dispatch(fetchContactsSuccess(mappedContacts));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Contacts />
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default App;