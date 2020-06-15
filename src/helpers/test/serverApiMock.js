import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { failedLoginPayload, successLoginPayload } from 'data/testPayloads';


const server = setupServer(rest.post('/api/users/login', (req, res, ctx) => {
  return res(ctx.json(successLoginPayload));
}));

export const init = () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
};
