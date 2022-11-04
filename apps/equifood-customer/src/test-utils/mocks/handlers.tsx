import appConfig from '../../app/app-config';
import { rest } from 'msw';

const apiUrl = appConfig.apiUrl;

export const login_handlers = [
  rest.post(apiUrl + '/auth/login', (req, res, ctx) => {
    console.log('got here too');
    return { access_token: 'foo', expires: null };
  }),
];
