import React, { FunctionComponent } from 'react';
import { TouchableNativeFeedbackProps, TouchableNativeFeedback as ReactTouchable } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface TouchableProps extends TouchableNativeFeedbackProps {
    isReactNative?: boolean
}

const PlatformTouchable: FunctionComponent<TouchableProps> = ({ children, isReactNative = false, ...rest }) => {
    if (isReactNative) {
        return <ReactTouchable {...rest} >{children}</ReactTouchable>;
    }
    return <TouchableNativeFeedback {...rest} >{children}</TouchableNativeFeedback>;
}

export default PlatformTouchable;