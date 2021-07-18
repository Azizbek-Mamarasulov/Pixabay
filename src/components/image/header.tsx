import React, { FunctionComponent } from 'react';
import { Linking, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { PADDING } from '../../constants/styles';

import ImageName from '../listImage/imageName';

import RaisedButton from '../../ui/raisedButton/raisedButton';
import { showAlert } from '../../screens/alertOverlay/alertOverlay';

interface Props {
    userImageURL: string,
    user: string,
    pageURL: string
}

const HeaderComponent: FunctionComponent<Props> = ({
    userImageURL,
    user,
    pageURL
}) => {
    const openLink = async () => {
        try {
            const test = await Linking.canOpenURL(pageURL);
            if(test){
                await Linking.openURL(pageURL)
            }
        } catch (err) {
            showAlert({
                title: err.name,
                message: err.message
            })
        }
    }

    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: PADDING,
            paddingRight: 1.5 * PADDING
        }}
    >
        <ImageName userImage={userImageURL} userName={user} />
        <RaisedButton onPress={openLink} name="ios-share-social" color={Colors.red} />
    </View>
}

export default HeaderComponent;