import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { logout } from '../redux/authSlice';

const axiosCustomize = axios.create({
  baseURL: 'http://localhost:9998/',
})

let axiosRuduxStore: any
export const injectStore = (mainStore: any) => { axiosRuduxStore = mainStore }

axiosCustomize.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('accessToken')

  config.headers.Authorization = `Bearer ${accessToken}`

  return config;
}, function (error) {

  return Promise.reject(error);
});

axiosCustomize.interceptors.response.use(function (response) {

  return response && response.data ? response.data : response;
}, function (error) {

  if (error.status === 410) {
    axiosRuduxStore.dispatch(logout())
  }

  return Promise.reject(error);
});


export default axiosCustomize