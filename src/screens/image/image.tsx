import React, { useEffect, useState } from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';

import { PixabayUrl } from '../../constants/urls';
import { PADDING } from '../../constants/styles';
import { Colors } from '../../constants/colors';

import { ImageInterface, ImageResultInterface } from '../../interfaces/image';

import Content from '../../components/image/content';
import ImageComponent from '../../components/image/imageComponent';
import ListImage from '../../components/listImage/listImage';

import CustomText from '../../ui/text/text';
import Loader from '../../ui/loader/loader';
import { showAlert } from '../alertOverlay/alertOverlay';

type Title = 'Similar Images' | 'Popular Images';

const ImageScreen: NavigationFunctionComponent<ImageInterface> = ({
    componentId,
    id,
    webformatURL,
    webformatHeight,
    webformatWidth,
    tags,
    user,
    userImageURL,
    views,
    downloads,
    favorites,
    comments,
    likes,
    pageURL
}) => {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [loader, setLoader] = useState(true);
    const [title, setTitle] = useState<Title>('Similar Images');

    const controller = new AbortController();
    const signal = controller.signal;

    useEffect(() => {
        (async () => {
            try {
                let images = await fetch(PixabayUrl + '&q=' + tags.replace(/,\s/g, ' ').replace(/\s/g, '+'), { signal });
                let imagesArr: ImageResultInterface = await (images.json());
                if (imagesArr.hits.length < 2) {
                    images = await fetch(PixabayUrl + '&order=order');
                    imagesArr = await images.json();
                    setTitle("Popular Images");
                }
                setImages([...imagesArr.hits.filter(i => i.id != id)]);
                setLoader(false);
            } catch (err) {
                if (err.name != 'AbortError') {
                    showAlert({
                        title: err.name,
                        message: err.message
                    });
                }
            }
        })()
    }, []);

    return <FlatList
        style={{
            backgroundColor: Colors.white
        }}
        ListHeaderComponent={
            <>
                <ImageComponent
                    id={id}
                    imageURL={webformatURL}
                    imageHeight={webformatHeight}
                    imageWidth={webformatWidth}
                />
                <Content
                    componentId={componentId}
                    user={user}
                    userImageURL={userImageURL}
                    views={views}
                    downloads={downloads}
                    favorites={favorites}
                    comments={comments}
                    likes={likes}
                    tags={tags}
                    pageURL={pageURL}
                />
                <CustomText
                    style={{
                        display: images.length > 0 ? "flex" : "none"
                    }}
                    size="h3"
                    padding={PADDING}
                    color={Colors.green}
                >{title}</CustomText>
            </>
        }
        ListEmptyComponent={
            <>
                {loader && <Loader key="a" />}
            </>
        }
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: i, index }) => {
            return <ListImage key={index} componentId={componentId} {...i} />
        }}
    />
}

export default ImageScreen;

ImageScreen.options = {
    topBar: {
        title: {
            text: 'Image'
        }
    }
}