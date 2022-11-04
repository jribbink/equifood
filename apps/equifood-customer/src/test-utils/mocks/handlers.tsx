import appConfig from '../../app/app-config';
import { rest } from 'msw';

const apiUrl = appConfig.apiUrl;

export const login_handlers = [
  rest.post(apiUrl + '/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({ access_token: 'foo', expires: null }),
      ctx.status(201)
    );
  }),
];
