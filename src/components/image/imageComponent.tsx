import React, { FunctionComponent } from 'react';
import { Dimensions, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import { BORDER_RADIUS } from '../../constants/styles';

const { width } = Dimensions.get('window');

interface Props {
    id: number,
    imageURL: string,
    imageHeight: number,
    imageWidth: number
}

const ImageComponent: FunctionComponent<Props> = ({
    id,
    imageURL,
    imageHeight,
    imageWidth
}) => {
    const ratio = imageHeight / imageWidth;
    const IMAGE_MIN_HEIGHT = width * 0.7;
    const IMAGE_HEIGHT = width * ratio;

    const HEIGHT = IMAGE_HEIGHT < IMAGE_MIN_HEIGHT ? IMAGE_MIN_HEIGHT : IMAGE_HEIGHT;

    return <Image
        nativeID={id.toString()}
        source={{ uri: imageURL }}
        style={{
            width,
            height: HEIGHT,
            borderBottomLeftRadius: BORDER_RADIUS,
            borderBottomRightRadius: BORDER_RADIUS,
            backgroundColor: Colors.lightGrey
        }}
        progressiveRenderingEnabled={true}
        width={width}
        height={HEIGHT}
        resizeMode="cover"
    />
}

export default ImageComponent;