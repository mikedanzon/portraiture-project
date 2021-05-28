const initialState = {
  id: '',
  token: localStorage.getItem('token') || '',
  isLogin: localStorage.getItem('token') ? true : false,
  name: '',
  businessName: '',
  photo: '',
  address: '',
  email: '',
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isLogin: true };
    case 'LOGOUT':
      return {
        ...state,
        id: '',
        token: '',
        name: '',
        businessName: '',
        photo: '',
        address: '',
        email: '',
        isLogin: false,
      };
    default:
      return state;
  }
};

export default authReducers;
