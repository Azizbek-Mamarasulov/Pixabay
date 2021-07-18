import React, { FunctionComponent } from 'react';
import { Picker } from '@react-native-community/picker';
import { PickerProps } from '@react-native-community/picker/typings/Picker';
import { View, ViewStyle } from 'react-native';
import CustomText from '../text/text';

import { Colors } from '../../constants/colors';
import { NOT_SELECTED } from '../../constants/text';

interface Props extends PickerProps {
    items: string[],
    containerStyle?: ViewStyle,
    label?: string,
    defaulText?: string,
    defaulTextColor?: string
}

const Select: FunctionComponent<Props> = ({
    containerStyle,
    items,
    label,
    defaulText = "Select to choose",
    defaulTextColor = Colors.grey,
    ...rest
}) => {
    const list = items.map(i => {
        if (i.length == 0) {
            return <Picker.Item key={i} value={NOT_SELECTED} label={defaulText} color={defaulTextColor} />
        }
        return <Picker.Item key={i} value={i} label={i} color={Colors.black} />
    })

    return <View style={containerStyle}>
        {label && <CustomText size="h4" color={Colors.lightBlack}>{label}</CustomText>}
        <Picker {...rest}>
            {list}
        </Picker>
    </View>
}

export default Select;