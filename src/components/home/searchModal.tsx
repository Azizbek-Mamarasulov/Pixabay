import React, { useState } from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants/colors';
import Modal from 'react-native-modal';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';

import { BORDER_RADIUS, PADDING } from '../../constants/styles';

import Input from '../../ui/input/input';
import Select from '../../ui/select/select';
import CustomButton from '../../ui/button/button';
import { CATEGORY_OPTIONS, COLOR_OPTIONS, ORIENTATION_OPTIONS } from '../../constants/searchOptions';
import { NOT_SELECTED } from '../../constants/text';

interface Props {
    isVisible: boolean,
    setIsVisible: (bool: boolean) => void
}

type Query = 'q' | 'orientation' | 'category' | 'colors';

const CATEGORY_LIST = ["", ...CATEGORY_OPTIONS];
const COLOR_LIST = ["", ...COLOR_OPTIONS];

interface Body {
    [prop: string]: {
        type: Query,
        value: string,
        options: string[],
        placeholder?: string,
        label?: string
    }
}

const state: Body = {
    search: {
        type: "q",
        value: "",
        options: [],
        placeholder: "Search..."
    },
    orientation: {
        type: "orientation",
        value: ORIENTATION_OPTIONS[0],
        options: ORIENTATION_OPTIONS,
        label: "Orientation"
    },
    category: {
        type: "category",
        value: CATEGORY_LIST[0],
        options: CATEGORY_LIST,
        label: "Category"
    },
    colors: {
        type: "colors",
        value: COLOR_LIST[0],
        options: COLOR_LIST,
        label: "Color"
    }
}

const SearchModal: NavigationFunctionComponent<Props> = ({
    componentId,
    isVisible,
    setIsVisible
}) => {
    const [content, setContent] = useState<Body>(state)

    const searchHandler = () => {
        let query = '';
        for (let x in content) {
            const el = content[x];
            const value = el.value;
            if (value.trim().length != 0 && value != NOT_SELECTED) {
                query += '&' + el.type + '=' + value
            }
        }
        
        setIsVisible(false);
        Navigation.push(componentId, {
            component: {
                name: "Search",
                passProps: {
                    search: query
                }
            }
        });
    }


    const valueChangedHandler = (value: string, key: string) => {
        const c = { ...content };
        const el = c[key];
        el.value = value;
        setContent(c);
    }


    const contentList = [];
    for (let x in content) {
        contentList.push({
            key: x,
            config: content[x]
        })
    }

    const showContent = contentList.map(i => {
        if (i.config.type == "q") {
            return <Input
                key={i.key}
                fontSize="h4"
                value={i.config.value}
                placeholder={i.config.placeholder}
                onChangeText={text => valueChangedHandler(text, i.key)}
            />
        }
        return <Select
            key={i.key}
            label={i.config.label}
            items={i.config.options}
            selectedValue={i.config.value}
            containerStyle={{
                paddingVertical: PADDING / 2
            }}
            onValueChange={text => valueChangedHandler(text.toString(), i.key)}
        />
    });

    return <Modal
        isVisible={isVisible}
        backdropOpacity={0.3}
        avoidKeyboard={true}
        onBackButtonPress={() => setIsVisible(false)}
        style={{
            margin: 0
        }}
    >
        <View
            style={{
                backgroundColor: Colors.white,
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                borderTopLeftRadius: BORDER_RADIUS,
                borderTopRightRadius: BORDER_RADIUS,
                padding: PADDING
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: PADDING,
                    paddingTop: 0
                }}
            >
                <View
                    style={{
                        width: 100,
                        borderBottomColor: Colors.lightGrey,
                        borderBottomWidth: 2
                    }}
                ></View>
            </View>
            {showContent}
            <CustomButton
                onPress={searchHandler}
                title="Search"
                type="filled"
            />
        </View>
    </Modal>
}

export default SearchModal;