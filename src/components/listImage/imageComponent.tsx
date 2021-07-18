import React, { FunctionComponent } from 'react';
import { Dimensions, Image } from 'react-native';
import { Colors } from '../../constants/colors';

import { BORDER_RADIUS, PADDING } from '../../constants/styles';

const { width } = Dimensions.get('window');

interface Props {
    id: number,
    imageURL: string,
    imageHeight: number,
    imageWidth: number
}

const ListImageComponent: FunctionComponent<Props> = ({
    id,
    imageURL,
    imageHeight,
    imageWidth
}) => {
    const ratio = imageHeight / imageWidth;

    const IMAGE_WIDTH = width - PADDING * 2;
    const IMAGE_MIN_HEIGHT = width * 0.7;
    const IMAGE_HEIGHT = IMAGE_WIDTH * ratio;

    const HEIGHT = IMAGE_HEIGHT < IMAGE_MIN_HEIGHT ? IMAGE_MIN_HEIGHT : IMAGE_HEIGHT;

    return <Image
        nativeID={id.toString()}
        source={{ uri: imageURL }}
        width={IMAGE_WIDTH}
        height={HEIGHT}
        style={{
            width: IMAGE_WIDTH,
            height: HEIGHT,
            borderRadius: BORDER_RADIUS,
            backgroundColor: Colors.lightGrey
        }}
        resizeMode="cover"
        progressiveRenderingEnabled={true}
    />
}

export default ListImageComponent