import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationFunctionComponent } from 'react-native-navigation';
import LottieView from 'lottie-react-native';

import { ImageInterface, ImageResultInterface } from '../../interfaces/image';

import { PixabayUrl } from '../../constants/urls';

import SearchImageComponent from '../../components/search/image';
import { openImageHandler } from '../../components/listImage/openImage';

import SearchLottie from '../../lotties/photoLoader.json';
import NotFoundComponent from '../../components/search/notFound';
import Loader from '../../ui/loader/loader';
import { showAlert } from '../alertOverlay/alertOverlay';
import { ON_END_REACHED_THRESHOLD } from '../../constants/properties';
import { SEARCH_IMAGE_SPACE } from '../../constants/styles';
import { View } from 'react-native';

interface Props {
    search: string
}

const PER_PAGE = 48;

const SearchScreen: NavigationFunctionComponent<Props> = ({
    search,
    componentId
}) => {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [loader, setLoader] = useState(true);
    const [loadMore, setLoadMore] = useState(false);
    const [isHandling, setIsHandler] = useState(true);
    const [page, setPage] = useState(1);
    const lottieAnimation = useRef<LottieView>(null);

    const controller = new AbortController();
    const signal = controller.signal;

    const loadImageHandler = () => {
        if (!isHandling) {
            return;
        }
        setLoadMore(true);
        setIsHandler(false);
        fetch(PixabayUrl + '&per_page=' + PER_PAGE + '&q=' + search.replace(/\s/g, '+') + '&page=' + page, { signal })
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
                    setImages(prev => [...prev, ...i.hits]);
                    if (page * PER_PAGE < i.totalHits) {
                        setIsHandler(true);
                    }
                    setPage(prev => prev + 1);
                } else {
                    setIsHandler(true);
                }
            })
            .catch((err: Error) => {
                if (err.name != 'AbortError') {
                    setIsHandler(true);
                    showAlert({
                        title: err.name,
                        message: err.message
                    });
                }
            })
            .finally(() => {
                setLoader(false);
                setLoadMore(false);
            })
    }

    useEffect(() => {
        lottieAnimation.current?.play(0, 100);
        loadImageHandler();
        return () => {
            controller.abort();
        }
    }, [])

    if (loader) {
        return <LottieView source={SearchLottie} ref={lottieAnimation} />
    }

    if (!loader && images.length == 0) {
        return <NotFoundComponent />
    }

    const ItemSeparator = () => (
        <View
            style={{
                height: SEARCH_IMAGE_SPACE
            }}
        ></View>
    )

    return <FlatList
        numColumns={4}
        data={images}
        columnWrapperStyle={{
            justifyContent: "space-between"
        }}
        ItemSeparatorComponent={ItemSeparator}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: i }) => {
            return <SearchImageComponent
                id={i.id}
                onPress={() => openImageHandler({ componentId, ...i })}
                imageURL={i.webformatURL}
            />
        }}
        onEndReached={loadImageHandler}
        ListFooterComponent={
            !loader && loadMore ? <Loader /> : null
        }
    />
}

export default SearchScreen;

SearchScreen.options = {
    topBar: {
        title: {
            text: "Search"
        }
    }
}