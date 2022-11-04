import appConfig from '../../app/app-config';
import { rest } from 'msw';

const apiUrl = appConfig.apiUrl;

export const login_handler = rest.post(
  apiUrl + '/auth/login',
  (req, res, ctx) => {
    console.log('got here');
    return { data: { access_token: 'foo', expires: null } };
  }
);
