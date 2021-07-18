import React, { FunctionComponent } from 'react';
import { TextStyle, View, ViewStyle, TouchableNativeFeedback } from 'react-native';
import { Colors } from '../../constants/colors';
import { PADDING } from '../../constants/styles';
import { FontSizeType } from '../../interfaces/fontSize';
import CustomText from '../text/text';

interface Props {
    type?: "outlined" | "filled",
    title: string | number,
    fontSize?: FontSizeType,
    fontColor?: string,
    bgColor?: string,
    onPress: () => void
}

const CustomButton: FunctionComponent<Props> = ({
    type = "outlined",
    title,
    fontSize = "h3",
    fontColor = type == "outlined" ? Colors.black : Colors.white,
    bgColor = type == "outlined" ? Colors.transparent : Colors.green,
    onPress
}) => {
    let cStyle: ViewStyle = {
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor: bgColor
    }

    let tStyle: TextStyle = {
        color: fontColor
    }

    if (type == "filled") {
        cStyle = {
            backgroundColor: bgColor
        }
    }

    return <View
        style={{
            borderRadius: PADDING,
            overflow: "hidden",
            ...cStyle
        }}
    >
        <TouchableNativeFeedback onPress={onPress}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: PADDING
                }}
            >
                <CustomText size={fontSize} style={tStyle}>{title}</CustomText>
            </View>
        </TouchableNativeFeedback>
    </View>
}

export default CustomButton;