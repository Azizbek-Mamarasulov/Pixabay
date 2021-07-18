import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { Colors } from '../../constants/colors';
import { MARGIN, PADDING } from '../../constants/styles';
import CustomText from '../../ui/text/text';
import Tag from '../tag/tag';

interface Props {
    tags: string[],
    titleColor?: string,
    containerStyle?: ViewStyle
}

const Tags: NavigationFunctionComponent<Props> = ({
    componentId,
    tags,
    titleColor = Colors.black,
    containerStyle
}) => {
    const search = (text: string, name: string) => {
        Navigation.push(componentId, {
            component: {
                name: "Search",
                passProps: {
                    search: text
                },
                options: {
                    topBar: {
                        title: {
                            text: name
                        }
                    }
                }
            }
        })
    }

    const list = tags.map(i => {
        return <Tag onPress={() => search(i, i)} color={Colors.green} key={i} >{i}</Tag>
    });
    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: PADDING,
            ...containerStyle
        }}
    >
        <CustomText color={titleColor} size="h4" marginRight={MARGIN} >#Tags</CustomText>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {list}
        </ScrollView>
    </View>
}

export default Tags;