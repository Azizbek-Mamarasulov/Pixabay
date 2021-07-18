import React, { FunctionComponent } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { MARGIN } from '../../constants/styles';
import CustomText, { CustomTextInterface } from '../text/text';

interface TagInterface extends CustomTextInterface {
    children: string | number,
    onPress: () => void
}

const Tag: FunctionComponent<TagInterface> = ({
    children,
    onPress,
    ...rest
}) => {
    return <TouchableNativeFeedback onPress={onPress} >
        <CustomText marginHorizontal={MARGIN} marginVertical={MARGIN / 2} {...rest}>{children}</CustomText>
    </TouchableNativeFeedback>
}

export default Tag;