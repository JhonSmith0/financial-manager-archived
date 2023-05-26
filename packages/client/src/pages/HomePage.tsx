import currentUser from "@/state/currentUser";
import { useHookstate } from "@hookstate/core";

export default function HomePage() {
  const user = useHookstate(currentUser);
  const values = user.get();

  return (
    <div>
      <h1>Hello, {values.name}</h1>
    </div>
  );
}
