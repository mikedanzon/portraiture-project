import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { URL_API } from '../helper/url';
import { toastError, toastInfo } from '../redux/actions/toastActions';

function Testing() {
  const dispatch = useDispatch();

  const onClickSave = (e) => {
    var image = e.target.files[0];
    let bodyFormData = new FormData();
    bodyFormData.append('issuedDate', '2021-06-06');
    bodyFormData.append('dueDate', '2021-06-12');
    bodyFormData.append('isPaid', false);
    bodyFormData.append('paidCost', 0);
    bodyFormData.append('billToName', 'asdasd');
    bodyFormData.append('billToAddress', 'asdasd');
    bodyFormData.append('image', image);
    axios
      .put(`${URL_API}/invoice?id_project=5&id_invoice=20`, bodyFormData)
      .then(() => {
        dispatch(toastInfo('Please wait connecting to server...'));
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  return (
    <>
      <input type="file" onChange={onClickSave} />
    </>
  );
}

export default Testing;
