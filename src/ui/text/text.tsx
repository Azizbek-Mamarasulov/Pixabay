import React, { FunctionComponent } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { FONT_SIZE } from '../../constants/fontSize';
import { FontSizeType } from '../../interfaces/fontSize';

export interface CustomTextInterface extends TextProps {
    size?: FontSizeType,
    padding?: number,
    paddingLeft?: number,
    paddingRight?: number,
    paddingHorizontal?: number,
    paddingVertical?: number,
    marginLeft?: number,
    marginRight?: number,
    marginVertical?: number,
    marginHorizontal?: number,
    style?: TextStyle,
    color?: string
}

const CustomText: FunctionComponent<CustomTextInterface> = ({
    size = 'h5',
    style,
    padding,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    children,
    color = Colors.black,
    ...rest
}) => {
    let fontSize = FONT_SIZE[size];

    return <Text {...rest} style={{
        fontSize,
        padding,
        paddingLeft,
        paddingRight,
        paddingHorizontal,
        paddingVertical,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        color,
        ...style
    }}>{children}</Text>
}

export default CustomText;