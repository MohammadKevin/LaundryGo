import { getData } from "./storage";

export function login(email: string, password: string) {
  const users = getData<any>("users");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return null;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      userId: user.id,
      role: user.role,
      cabangId: user.cabangId || null,
    }),
  );

  return user.role;
}

export function logout() {
  localStorage.removeItem("auth");
}
