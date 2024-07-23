import { legacy_createStore as createStore } from 'redux';

// Define action types
const SET_ROLE = 'SET_ROLE';

// Action creators
export const setRole1 = (role) => ({
  type: SET_ROLE,
  payload: role,
});

const initialState = {
  sidebarShow: true,
  theme: 'light',
  role: '', // default role, change as per your logic
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE:
      return { ...state, role: action.payload };
    case 'set':
      return { ...state, ...action };
    default:
      return state;
  }
};


const store = createStore(changeState);
export default store;



// import { legacy_createStore as createStore } from 'redux';
// import changeState from './reducer';

// const store = createStore(changeState);

// export default store;
