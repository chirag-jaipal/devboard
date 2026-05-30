export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  return {
    id: "chfrewsd123m",
    name: "Chirag",
    email: "chirag@example.com",
  };
}
