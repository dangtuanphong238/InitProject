import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../theme/colors';
import defaultStyles from '../theme/styles';

export default function AppTextInput({ icon, width = '100%', ...otherProps}) {
    return (
        <View style={[styles.container, {width}]}>
            <Icon 
                style={styles.icon}
                name={icon}
                size={20}
                color={colors.light}
            />
            <TextInput
                placeholderTextColor={defaultStyles.colors.light}
                style={[defaultStyles.text, {flex: 1}]} // set flex to 1 to fix overflow text
                {...otherProps}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF30',
        borderRadius: 50,
        flexDirection: 'row',
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.white,
    },
    icon: {
        marginHorizontal: 10,
    }
})