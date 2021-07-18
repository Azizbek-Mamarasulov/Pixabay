import React, {FunctionComponent} from 'react';
import {Dimensions, View} from 'react-native';

import {Colors} from '../../constants/colors';
import {MARGIN, PADDING} from '../../constants/styles';

import CustomText from '../../ui/text/text';
import IconText from '../../ui/iconText/iconText';

interface Props {
  iconName: string;
  title: string;
  value: string;
}

const {width} = Dimensions.get('window');

const Detail: FunctionComponent<Props> = ({iconName, title, value}) => {
  const WIDTH = (width - 2 * PADDING - 2 * MARGIN) / 4;
  return (
    <View
      style={{
        padding: PADDING,
        minWidth: WIDTH,
        display: 'flex',    
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      <IconText iconName={iconName} title={title} color={Colors.black} />
      <CustomText marginLeft={5} size="h4" color={Colors.black}>
        {value}
      </CustomText>
    </View>
  );
};

export default Detail;
