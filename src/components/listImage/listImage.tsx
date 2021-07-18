import React from 'react';
import { View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { ImageInterface } from '../../interfaces/image';

import { PADDING } from '../../constants/styles';

import ListImageDetails from './details';
import ListImageComponent from './imageComponent';

import { openImageHandler } from './openImage';

const ListImage: NavigationFunctionComponent<ImageInterface> = (props) => {
    const {
        id,
        webformatURL,
        webformatHeight,
        webformatWidth,
        user,
        userImageURL, downloads,
        views
    } = props;
    return <View
        style={{
            paddingHorizontal: PADDING,
            paddingVertical: PADDING / 3
        }}
    >
        <ListImageComponent
            id={id}
            imageURL={webformatURL}
            imageHeight={webformatHeight}
            imageWidth={webformatWidth}
        />
        <ListImageDetails
            onPress={() => openImageHandler(props)}
            user={user}
            userImageURL={userImageURL}
            downloads={downloads}
            views={views}
        />
    </View>
}

export default ListImage;