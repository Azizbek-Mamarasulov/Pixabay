import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { BORDER_RADIUS, PADDING, USER_IMAGE } from '../../constants/styles';
import { Colors } from '../../constants/colors';

import ImageName from './imageName';

import IconText from '../../ui/iconText/iconText';

interface Props {
    user: string,
    userImageURL: string,
    downloads: number,
    views: number,
    onPress: () => void
}

const ListImageDetails: FunctionComponent<Props> = ({
    user,
    userImageURL,
    downloads,
    views,
    onPress
}) => {
    return <View
        style={{
            borderRadius: BORDER_RADIUS,
            top: -BORDER_RADIUS,
            backgroundColor: Colors.white,
            overflow: "hidden",
            elevation: 5
        }}
    >
        <TouchableNativeFeedback onPress={onPress}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: BORDER_RADIUS,
                    backgroundColor: Colors.white,
                    padding: PADDING,
                    minHeight: 2 * PADDING + USER_IMAGE
                }}
            >
                <ImageName userName={user} userImage={userImageURL} />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <IconText iconName="ios-eye" title={views} />
                    <IconText iconName="ios-download" title={downloads} marginLeft={10} />
                </View>
            </View>
        </TouchableNativeFeedback>
    </View>
}

export default ListImageDetails;