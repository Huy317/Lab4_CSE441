import Icon from "@react-native-vector-icons/material-design-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const ProfileContact = ({route, navigation}) => {
    const {name, avatar, phone, cell, email, favorite} = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: avatar}} style={styles.avatar}/>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.inlineText}>
                    <Icon name="phone" size={20} color="white" />
                    <Text style={styles.headerPhone}>{phone}</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <View style={styles.iconCol}>
                        <Icon name="email" size={40} color="black" />
                    </View>
                    <View style={styles.textCol}>
                        <Text style={styles.infoHeader}>Email</Text>
                        <Text style={styles.infoText}>{email}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconCol}>
                        <Icon name="phone" size={40} color="black" />
                    </View>
                    <View style={styles.textCol}>
                        <Text style={styles.infoHeader}>Work</Text>
                        <Text style={styles.infoText}>{cell}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconCol}>
                        <Icon name="cellphone" size={40} color="black" />
                    </View>
                    <View style={styles.textCol}>
                        <Text style={styles.infoHeader}>Personal</Text>
                        <Text style={styles.infoText}>{phone}</Text>
                    </View>
                </View>

                <View style={styles.favoriteRow}>

                    <Icon name={favorite?"star-check":"star-check-outline"} size={40} color="black" />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",

    },
    infoContainer: {
        flex: 2,
        flexDirection: "column",
        paddingHorizontal: 20,
    },
    header: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    inlineText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    headerPhone: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

   
    iconCol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textCol: {
        flex: 3,
        flexDirection: 'column',
    },
    infoHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    infoText: {
        fontSize: 16,
        color: 'blue',
    },
    favoriteRow:{
        justifyContent: 'center',
        alignItems: 'center',
    },


})

export default ProfileContact;