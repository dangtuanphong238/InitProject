import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightBase, TouchableOpacity } from 'react-native';

import colors from '../theme/colors'

export default function Button({ title, onPress, color = 'light' }) {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: colors[color]}]}
            onPress={onPress}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 75,
        padding: 15,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.brown,
        fontWeight: "bold",
        textTransform: 'uppercase',
        fontSize: 18,
    }
})