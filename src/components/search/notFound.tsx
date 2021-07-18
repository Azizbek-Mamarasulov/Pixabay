import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../constants/colors';
import CustomText from '../../ui/text/text';

const NotFoundComponent = () => {
    return <View
        style={{
            ...StyleSheet.absoluteFillObject,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <Icon name="ios-image" size={100} color={Colors.lightGrey} />
        <CustomText color={Colors.grey} size="h3">Nothing is found!</CustomText>
    </View>
}

export default NotFoundComponent;