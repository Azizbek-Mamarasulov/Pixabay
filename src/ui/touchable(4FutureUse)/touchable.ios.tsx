import React, { FunctionComponent } from 'react';
import { TouchableOpacityProps, TouchableOpacity as ReactTouchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TouchableProps extends TouchableOpacityProps {
    isReactNative?: boolean
}

const PlatformTouchable: FunctionComponent<TouchableProps> = ({ children, isReactNative = false, ...rest }) => {
    if (isReactNative) {
        return <ReactTouchable {...rest} >{children}</ReactTouchable>;
    }
    return <TouchableOpacity {...rest} >{children}</TouchableOpacity>;
}

export default PlatformTouchable;