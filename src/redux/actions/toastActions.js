import { toast } from 'react-toastify';

export const toastSuccess = (msg) => {
  return (dispatch) => {
    toast.success(`${msg}`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
};

export const toastError = (msg) => {
  return (dispatch) => {
    toast.error(`${msg}`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
};

export const toastInfo = (msg) => {
  return (dispatch) => {
    toast.info(`${msg}`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
};

export const toastWarning = (msg) => {
  return (dispatch) => {
    toast.warn(`${msg}`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
};