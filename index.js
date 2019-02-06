/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Agenda from './src/screens/agenda';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Agenda);
