import appConfig from '../../app/config/app-config';
import { rest } from 'msw';

const apiUrl = appConfig.apiUrl;

export const login_handlers = [
  rest.post(apiUrl + '/auth/local', (req, res, ctx) => {
    return res(
      ctx.body(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      ),
      ctx.status(201)
    );
  }),
];
