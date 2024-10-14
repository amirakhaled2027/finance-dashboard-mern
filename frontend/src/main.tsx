import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/state/api.ts';

export const store = configureStore({
  //this will set up our api reducer path, 
  //so basically our redux toolkit query API slice we're padding it with api.reducer
  reducer: { [api.reducerPath]: api.reducer }, 
  //and then the middleware is just configuration that we need to setup with our api so that the redux toolkit query works
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
//same with setup listeners
setupListeners(store.dispatch);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
