import React, { FunctionComponent } from 'react';
import { Dimensions, Image, ImageStyle } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Colors } from '../../constants/colors';
import { SEARCH_IMAGE_SPACE } from '../../constants/styles';

const { width } = Dimensions.get('window');

const WIDTH = (width / 4) - SEARCH_IMAGE_SPACE;

interface Props {
    id: number,
    imageURL: string,
    style?: ImageStyle,
    onPress: () => void
}

const SearchImageComponent: FunctionComponent<Props> = ({
    id,
    imageURL,
    style,
    onPress
}) => {
    return <TouchableNativeFeedback onPress={onPress}>
        <Image
            nativeID={id.toString()}
            style={{
                width: WIDTH,
                height: WIDTH,
                backgroundColor: Colors.lightGrey,
                ...style
            }}
            source={{ uri: imageURL }}
            width={WIDTH}
            height={WIDTH}
            resizeMode="cover"
        />
    </TouchableNativeFeedback>
}

export default SearchImageComponent;