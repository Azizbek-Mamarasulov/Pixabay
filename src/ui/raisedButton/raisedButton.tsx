import React, { FunctionComponent } from 'react';
import { View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { ICON_SIZE, PADDING } from '../../constants/styles';
import { Colors } from '../../constants/colors';

interface Props {
    name: string,
    size?: number,
    color?: string,
    bgColor?: string,
    containerStyle?: ViewStyle,
    onPress: () => void
}

const RaisedButton: FunctionComponent<Props> = ({
    name,
    color = Colors.black,
    bgColor = Colors.transparent,
    size = ICON_SIZE,
    containerStyle,
    onPress
}) => {
    const bSize = 2 * PADDING + size;

    return <View
        style={{
            width: bSize,
            height: bSize,
            borderRadius: bSize / 5,
            backgroundColor: bgColor,
            elevation: 1,
            overflow: "hidden",
            ...containerStyle
        }}
    >
        <TouchableNativeFeedback onPress={onPress}>
            <View
                style={{
                    width: bSize,
                    height: bSize,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Icon name={name} size={size} color={color} />
            </View>
        </TouchableNativeFeedback>
    </View>
}

export default RaisedButton;