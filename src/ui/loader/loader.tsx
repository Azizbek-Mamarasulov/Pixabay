import React, { FunctionComponent } from 'react';
import { ViewStyle } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { Colors } from '../../constants/colors';
import { LOADER_SIZE, MARGIN } from '../../constants/styles';

interface Props {
    style?: ViewStyle,
    margin?: number,
    size?: number,
    color?: string
}

const Loader: FunctionComponent<Props> = ({
    style,
    color = Colors.green,
    margin = MARGIN,
    size = LOADER_SIZE
}) => {
    return <BarIndicator style={{
        marginVertical: margin,
        ...style
    }} color={color} size={size} />
}

export default Loader;