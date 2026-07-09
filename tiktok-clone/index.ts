import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// Garantiza que la app funcione tanto en Expo Go como en una build nativa.
registerRootComponent(App);
