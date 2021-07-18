import React, { FunctionComponent } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '../../constants/colors';
import { FONT_SIZE } from '../../constants/fontSize';
import { FontSizeType } from '../../interfaces/fontSize';

interface Props extends TextInputProps {
    fontSize?: FontSizeType
}

const Input: FunctionComponent<Props> = ({
    fontSize = "h5",
    style,
    ...rest
}) => {
    let size = FONT_SIZE[fontSize];

    return <TextInput
        maxLength={100}
        {...rest}
        style={[
            {
                borderBottomColor: Colors.lightGrey,
                borderBottomWidth: 2,
                fontSize: size
            },
            style
        ]}
    />
}

export default Input;