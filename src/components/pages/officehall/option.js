import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

const WIDTH = 0

export default function option(props) {
    const { businessType, icon, navigation, linkPage } = props

    return (
        <TouchableOpacity style={[styles.draftContainer]} onPress={() => navigation.navigate(linkPage)} activeOpacity={0.7}>
            <Ionicons name={icon} size={34} style={{ color: '#8fb9fd' }} />
            <Text style={styles.draftType}>{businessType}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    draftContainer: {
        height: 90,
        width: 135,
        borderRadius: 8,
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 0,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
        margin: 10,
    },
    draftType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#64708e',
    },

})