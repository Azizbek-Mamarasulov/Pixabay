import React from 'react';
import {View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';

import {Colors} from '../../constants/colors';
import {BORDER_RADIUS, MARGIN} from '../../constants/styles';

import HeaderComponent from './header';
import DetailsComponent from './details';

import Tags from '../../ui/tags/tags';

interface Props {
  user: string;
  userImageURL: string;
  views: number;
  downloads: number;
  favorites: number;
  comments: number;
  likes: number;
  tags: string;
  pageURL: string;
}

const Content: NavigationFunctionComponent<Props> = ({
  componentId,
  user,
  userImageURL,
  views,
  downloads,
  favorites,
  comments,
  likes,
  tags,
  pageURL,
}) => {
  return (
    <View
      style={{
        top: -BORDER_RADIUS,
        backgroundColor: Colors.white,
        borderRadius: BORDER_RADIUS,
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 2 * BORDER_RADIUS,
      }}>
      <HeaderComponent
        user={user}
        userImageURL={userImageURL}
        pageURL={pageURL}
      />
      <DetailsComponent
        comments={comments}
        downloads={downloads}
        favorites={favorites}
        likes={likes}
        views={views}
      />
      <Tags
        containerStyle={{
          marginHorizontal: MARGIN,
        }}
        componentId={componentId}
        tags={tags.split(', ')}
      />
    </View>
  );
};

export default Content;
