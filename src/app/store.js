import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import learningReducer from '../features/student/learningSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        learning: learningReducer,
    },
});
