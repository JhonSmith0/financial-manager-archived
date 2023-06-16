import accountsState from "@/state/accountsState";

export async function readAccountController(id: string) {
  return accountsState.get({noproxy: true}).find((e) => e.id === id);
}
