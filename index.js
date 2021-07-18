/**
 * @format
 */

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Colors } from './src/constants/colors';
import AlertOverlay from './src/screens/alertOverlay/alertOverlay';

import HomeScreen from './src/screens/home/home';
import ImageScreen from './src/screens/image/image';
import SearchScreen from './src/screens/search/search';

Navigation.registerComponent('Home', () => gestureHandlerRootHOC(HomeScreen));
Navigation.registerComponent('Image', () => gestureHandlerRootHOC(ImageScreen));
Navigation.registerComponent('Search', () => gestureHandlerRootHOC(SearchScreen));
Navigation.registerComponent('Alert', () => gestureHandlerRootHOC(AlertOverlay));

Navigation.setDefaultOptions({
  topBar: {
    elevation: 0,
    title: {
      color: Colors.green,
      fontSize: 20
    }
  }
})

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });
});