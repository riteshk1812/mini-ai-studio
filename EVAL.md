| Feature/Test                 | Implemented | File/Path                                       |
| ---------------------------- | ----------- | ----------------------------------------------- |
| JWT Auth (signup/login)      | ✅          | /backend/src/routes/auth.ts                     |
| Image upload preview         | ✅          | /frontend/src/components/Upload.tsx             |
| Abort in-flight request      | ✅          | /frontend/src/hooks/useGenerate.ts              |
| Exponential retry logic      | ✅          | /frontend/src/hooks/useRetry.ts                 |
| 20% simulated overload       | ✅          | /backend/src/routes/generations.ts              |
| GET last 5 generations       | ✅          | /backend/src/controllers/generations.ts         |
| Unit tests backend           | ✅          | /backend/src/**tests**/promptGeneration.test.ts |
| Unit tests frontend          | ✅          | /frontend/src/**tests**/Generate.test.tsx       |
| E2E flow                     | ✅          | /cypress/e2e/generate.cy.ts                     |
| ESLint + Prettier configured | ✅          | .eslintrc.js & .prettierrc                      |
| CI + Coverage report         | ✅          | .github/workflows/ci.yml                        |
