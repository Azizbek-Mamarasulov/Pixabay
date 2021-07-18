import React, { FunctionComponent } from 'react';
import { Image, View } from 'react-native';

import { USER_IMAGE } from '../../constants/styles';

import CustomText from '../../ui/text/text';

import UserImage from '../../images/user.png';

interface Props {
    userImage: string,
    userName: string
}

const ImageName: FunctionComponent<Props> = ({ userName, userImage }) => {
    let source = userImage ? { uri: userImage } : UserImage;

    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }}
    >
        <Image style={{
            width: USER_IMAGE,
            height: USER_IMAGE,
            borderRadius: USER_IMAGE
        }}
            source={source}
            width={USER_IMAGE}
            height={USER_IMAGE}
        />
        <CustomText size="h4" marginLeft={10}>{userName.length > 15 ? userName.slice(0, 15) : userName}</CustomText>
    </View>
}

export default ImageName;