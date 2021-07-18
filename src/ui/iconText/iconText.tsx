import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ICON_SIZE } from '../../constants/styles';
import { Colors } from '../../constants/colors';
import CustomText from '../text/text';
import { numberToLetter } from '../../util/numberToLetter';

export interface IconTextInterface {
    iconName: string,
    title: number | string,
    marginLeft?: number,
    color?: string
}

const IconText: FunctionComponent<IconTextInterface> = ({
    iconName,
    title,
    marginLeft,
    color = Colors.grey
}) => {
    let t = title;

    if (typeof title == 'number') {
        t = numberToLetter(title);
    }

    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft
        }}
    >
        <Icon name={iconName} size={ICON_SIZE} color={color} />
        <CustomText size="h4" style={{
            marginLeft: 5
        }} color={color}>{t}</CustomText>
    </View>
}

export default IconText;