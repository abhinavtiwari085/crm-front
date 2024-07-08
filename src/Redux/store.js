import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../Redux/Slices/AuthSlice';
import ticketSliceReducer from '../Redux/Slices/TicketSlice';

//configure  store :The standard method for creating a Redux store. It uses the low-level Redux core createStore 
//core redux createstore(reducer,middleware,enhancher)
//devtool: it will be used to indicate whether configureStore should automatically enable support for the Redux DevTools browser extension.
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        tickets: ticketSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true 
});

export default store;