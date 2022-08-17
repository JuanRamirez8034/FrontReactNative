import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import NavegadorStack from './components/navigator/Stack';
import {Provider } from 'react-native-paper';




export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <NavegadorStack/>
      </NavigationContainer>
    </Provider>
  );
}
