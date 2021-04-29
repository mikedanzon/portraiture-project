const initialState = {
  id: '',
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return state; // blm buat
    default:
      return state;
  }
};

export default Reducers;
