import { rest } from 'msw';

export const handlers = [
  // Mock login
  rest.post('/api/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'mock-token', user: { id: 1, email } })
      );
    }
    return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
  }),

  // Mock generations
  rest.get('/api/generations', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        generations: [
          {
            id: 1,
            prompt: 'A cat wearing sunglasses',
            style: 'Cartoon',
            imageUrl: '/mock/image1.jpg',
            createdAt: new Date().toISOString(),
          },
        ],
      })
    );
  }),
];
