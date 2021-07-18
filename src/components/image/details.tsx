import React, {FunctionComponent} from 'react';
import {Dimensions, View} from 'react-native';

import {Colors} from '../../constants/colors';
import {BORDER_RADIUS, PADDING, MARGIN} from '../../constants/styles';

import Detail from './detail';

const {width} = Dimensions.get('window');

interface Props {
  views: number;
  downloads: number;
  favorites: number;
  likes: number;
  comments: number;
}

const DetailsComponent: FunctionComponent<Props> = ({
  views,
  downloads,
  favorites,
  comments,
  likes,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width - 2 * MARGIN,
        backgroundColor: Colors.lightGrey,
        borderRadius: BORDER_RADIUS,
        margin: MARGIN,
        padding: PADDING,
      }}>
      <Detail iconName="ios-eye" title="Views" value={views.toString()} />
      <Detail iconName="ios-heart" title="Likes" value={likes.toString()} />
      {favorites && (
        <Detail
          iconName="ios-star"
          title="Favorites"
          value={favorites.toString()}
        />
      )}
      <Detail
        iconName="ios-arrow-down"
        title="Downloads"
        value={downloads.toString()}
      />
      <Detail
        iconName="ios-chatbox"
        title="Comments"
        value={comments.toString()}
      />
    </View>
  );
};

export default DetailsComponent;
