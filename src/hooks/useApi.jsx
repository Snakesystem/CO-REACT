// src/api.js

import axios from 'axios';
import ErrorBoundary from '../components/template/slice/ErrorBoundary';
import Swal from 'sweetalert2';
import { useLoadingApi } from './useLoadingApi';
import { useSweetAlert } from './useSweetAlert';

const axiosInstance = axios.create({
  baseURL: 'http://opening.micropiranti.id/api/', // untuk Ganti dengan URL dasar API
  timeout: 10000, // Waktu timeout request
  
});

export const useApi = () => {
  const { startLoading, stopLoading, setErrorMsg, clearError } = useLoadingApi();
  const { showAlert } = useSweetAlert();

  const getRequest = async (url, params = {}) => {
    startLoading();
    clearError();
    try {
      const response = await axiosInstance.get(url, { params });
      if(response.status !== 200) {
        return <ErrorBoundary fallback={response.statusText}/>
      } 

      return response.data;
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Oops..., ${error.response.status} ${error.response.statusText}`,
        html: <p>Please check url <span className="text-info">{error.request.responseURL}</span></p>,
        confirmButtonText: 'Ok',
      }, 'sm',
        'default-popup-background',
        'default-backdrop')
      throw error;
    } finally {
      stopLoading();
    }
  };

  const postRequest = async (url, data) => {
    startLoading();
    clearError();
    try {
      const response = await axiosInstance.post(url, data);
      if(response.status !== 200) {
        Swal.error({
          title: "Error",
          text: response.message,
          icon: "error"
        })
      }
      return response.data;
    } catch (error) {
      setErrorMsg(error.response ? error.response.data : 'Network Error');
      throw error;
    } finally {
      stopLoading();
    }
  };

  const putRequest = async (url, data) => {
    startLoading();
    clearError();
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      setErrorMsg(error.response ? error.response.data : 'Network Error');
      throw error;
    } finally {
      stopLoading();
    }
  };

  const deleteRequest = async (url) => {
    startLoading();
    clearError();
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      setErrorMsg(error.response ? error.response.data : 'Network Error');
      throw error;
    } finally {
      stopLoading();
    }
  };

  return { getRequest, postRequest, putRequest, deleteRequest };
};
