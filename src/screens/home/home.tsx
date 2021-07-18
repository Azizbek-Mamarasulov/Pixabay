import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

import { ImageInterface, ImageResultInterface } from '../../interfaces/image';

import { Colors } from '../../constants/colors';
import { ICON_SIZE } from '../../constants/styles';
import { PixabayUrl } from '../../constants/urls';

import ListImage from '../../components/listImage/listImage';
import SearchModal from '../../components/home/searchModal';
import Tags from '../../ui/tags/tags';
import { CATEGORY_OPTIONS } from '../../constants/searchOptions';
import Loader from '../../ui/loader/loader';
import { showAlert } from '../alertOverlay/alertOverlay';
import { ON_END_REACHED_THRESHOLD } from '../../constants/properties';

const PER_PAGE = 20;

const HomeScreen: NavigationFunctionComponent = ({ componentId }) => {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isHandling, setIsHandling] = useState(true);

    const loadImage = () => {
        if (!isHandling) {
            return;
        }
        setIsHandling(false);
        setLoader(true);
        fetch(PixabayUrl + '&editors_choice=true&per_page=' + PER_PAGE + '&page=' + page)
            .then<ImageResultInterface | number>(i => {
                const status = i.status;
                if (status == 200) {
                    return i.json()
                } else {
                    return i.status
                }
            })
            .then(i => {
                if (typeof i != 'number') {
                    setImages(prevState => [...prevState, ...i.hits]);
                    if (page * PER_PAGE <= i.totalHits) {
                        setIsHandling(true);
                    }
                    setPage(page => page + 1);
                } else {
                    setIsHandling(true);
                }
            })
            .catch(err => {
                showAlert({
                    title: err.name,
                    message: err.message
                });
            })
            .finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        loadImage();
    }, []);


    useNavigationButtonPress(({ buttonId }) => {
        if (buttonId == 'searchButton') {
            setIsModalVisible(true);
        }
    }, componentId);

    return <>
        <FlatList
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <Tags
                    containerStyle={{
                        backgroundColor: Colors.white
                    }}
                    componentId={componentId}
                    tags={CATEGORY_OPTIONS}
                />
            }
            contentContainerStyle={{
                backgroundColor: Colors.white
            }}
            data={images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
                return <ListImage componentId={componentId} {...item} />
            }}
            onEndReached={loadImage}
            onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
            ListFooterComponent={
                <>
                    {images.length > 0 && loader && <Loader />}
                </>
            }
        />
        <SearchModal
            componentId={componentId}
            isVisible={isModalVisible}
            setIsVisible={setIsModalVisible}
        />
    </>
}

export default HomeScreen;

HomeScreen.options = {
    topBar: {
        title: {
            text: "Discovery"
        },
        rightButtons: [
            {
                id: "searchButton",
                icon: Icon.getImageSourceSync('ios-search', ICON_SIZE, Colors.green)
            }
        ]
    }
}