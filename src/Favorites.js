import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";



const Favorites = ({ navigation }) => {

    const [contacts, setContacts] = useState([]);

    const checkFavorite = (contact) => {
        return contact.favorite;
    }

    const FavoriteItem = (contact) => {
        contact = contact.contact.item;
        console.log("favorites item contact: ", contact);
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ProfileContact", {
                        name: contact.name,
                        avatar: contact.avatar,
                        phone: contact.phone,
                        cell: contact.cell,
                        email: contact.email,
                        favorite: contact.favorite
                    })
                }}
            >
                <Image source={{uri: contact.avatar}} style={styles.favoriteIcon} />
            </TouchableOpacity>
        );
    }

    const loadContacts = async () => {
        try {
            const value = await AsyncStorage.getItem("contacts");
            if (value !== null) {
                // console.log("contacts from storage", value);
                const favoritesContacts = JSON.parse(value).filter(checkFavorite);
                console.log("favorites", favoritesContacts);
                setContacts(favoritesContacts);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadContacts();
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                data = {contacts}
                keyExtractor={(item) => item.phone}
                renderItem={(item) => <FavoriteItem contact={item} />}
                
                
            />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },

    favoriteIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2,
    }

})

export default Favorites;