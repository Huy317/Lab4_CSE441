import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";




const Contacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    const ContactItem = (contact) => {
        contact = contact.contact;
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("ProfileContact", {
                    name: contact.name,
                    avatar: contact.avatar,
                    phone: contact.phone,
                    cell: contact.cell,
                    email: contact.email,
                    favorite: contact.favorite
                });
            }}>
                <View style={styles.itemContainer}>

                    <Image source={{ uri: contact.avatar }} style={styles.image} />



                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{contact.name}</Text>
                        <Text style={styles.phone}>{contact.phone}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const loadContacts = async () => {
        try {
            const value = await AsyncStorage.getItem("contacts");
            if (value !== null) {
                // console.log("contacts from storage", value);
                setContacts(JSON.parse(value));
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadContacts();
    }, []);


    // console.log(contacts);

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.phone}
                renderItem={({ item }) => <ContactItem contact={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    textContainer: {
        marginLeft: 20,
        justifyContent: "center",
        paddingLeft: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    phone: {
        fontSize: 16,
        color: "blue",
    },

});


export default Contacts;