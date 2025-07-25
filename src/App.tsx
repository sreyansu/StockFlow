import { StackProvider, useUser } from '@stackframe/react';
import { stackClientApp } from './stack';

function DebugComponent() {
  const user = useUser();

  return (
    <div>
      <h1>User Authentication State:</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}

export default function App() {
  return (
    <StackProvider app={stackClientApp}>
      <DebugComponent />
    </StackProvider>
  );
}