const initialState = {
  id: localStorage.getItem('id') || '',
  token: localStorage.getItem('token') || '',
  isLogin: localStorage.getItem('token') ? true : false,
  name: localStorage.getItem('name') || '',
  businessName: localStorage.getItem('businessName') || '',
  photo: localStorage.getItem('photo') || '',
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isLogin: true };
    case 'LOGOUT':
      return { ...state, ...action.payload, isLogin: false };
    default:
      return state;
  }
};

export default Reducers;
