import React, { FC } from 'react';
import { toast, ToastContainer } from 'react-toastify';
//
import 'react-toastify/dist/ReactToastify.css';

export const AppToastProvider: FC = () => {
    return <ToastContainer />;
};

export default toast;
