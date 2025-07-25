import { StackClientApp } from '@stackframe/react';


console.log('VITE_STACK_PROJECT_ID:', import.meta.env.VITE_STACK_PROJECT_ID);
console.log('VITE_STACK_PUBLISHABLE_CLIENT_KEY:', import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY);

export const stackClientApp = new StackClientApp({
  projectId: import.meta.env.VITE_STACK_PROJECT_ID,
  publishableClientKey: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY,
  tokenStore: 'cookie',
});
