
// // import { rest } from 'msw';
// import * as msw from 'msw';
// const { http } = msw;
// import { rest } from 'msw/lib/types/setupWorker/glossary';

// // Type annotations for TS
// // import type { RestRequest, ResponseComposition, RestContext } from 'msw';

// export const handlers = [
//   // Mock login
//   http.post('/api/auth/login', async (req: { json: () => PromiseLike<{ email: any; password: any; }> | { email: any; password: any; }; }, res: (arg0: any, arg1: undefined) => any, ctx: { status: (arg0: number) => any; json: (arg0: { token: string; }) => any; }) => {
//     const { email, password } = await req.json();
//     if (email === 'test@example.com' && password === 'password') {
//       return res(
//         ctx.status(200),
//         ctx.json({ token: 'mock-token' })
//       );
//     }
//     return res(ctx.status(401));
//   }),

//   // Mock generations
//   http.get('/api/generations', (req: any, res: (arg0: any, arg1: any) => any, ctx: { status: (arg0: number) => any; json: (arg0: { prompt: string; image: string; }[]) => any; }) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         { prompt: 'Cyberpunk cat', image: 'mock-image.png' }
//       ])
//     );
//   }),
// ];
