import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { retrieveToken } from '@/core/auth/authSlice';
import { useAppDispatch } from './useAppDispatch';

function useLoginToken(): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokenCookie = Cookies.get('token');
    dispatch(retrieveToken({ token: tokenCookie }));
  }, [dispatch]);
}

export { useLoginToken };
