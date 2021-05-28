import axios from 'axios';
import { toast } from 'react-toastify';
import { URL_API } from '../../helper/url';

export const deletePackage = (id) => {
  return (dispatch) => {
    // dispatch({
    //     type: SET_LOADING,
    // })

    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
      .delete(`${URL_API}/package/delete?packageId=${id}`, config)
      .then(() => {
        toast.success('Success, package deleted!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    // dispatch({
    //     type: SET_LOADING,
    // })
  };
};
