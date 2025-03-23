
import { Stack, useRouter } from "expo-router";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

import Ionicons from "@expo/vector-icons/Ionicons";
export default function RootLayout() {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Stack >
    <Stack.Screen name="Auth/Login" options={{ headerShown: false }}/>
    <Stack.Screen name = "Tabs" 
    options={{
      headerShown: false,
    }}/>
        <Stack.Screen name="Product/ProductDetail" options={{ headerTransparent: true, headerTitle:" Chi tiết sản phẩm" }}/>
        <Stack.Screen name="Product/OrderHistory" options={{ headerTransparent: true, headerTitle:"Lịch sử mua hàng " }}/>

  </Stack>
  </PersistGate>
    </Provider>
  )
  
  
}
