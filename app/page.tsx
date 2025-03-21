import { signOut } from "@/lib/auth/auth";

import Button from "@/components/form/Button";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <h1>Welcome to Home Page</h1>
      <Button onClick={signOut}>Sign out</Button>
    </main>
  );
}
