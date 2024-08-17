import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export type UserType = {
  id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  token: string;
  isLogin: boolean;
};

export const signIn = async (user: Partial<UserType>) => {
  const { data } = await axios.post("/signin", user);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", JSON.stringify(data.token));
  return data;
};

export const signUp = async (user: Partial<UserType>) => {
  const { data } = await axios.post("/signup", user);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", JSON.stringify(data.token));
  return data;
};

export const updateUser = async (id: string, user: Partial<UserType>) => {
  const token = JSON.parse(localStorage.getItem("token") ?? "");
  const { data } = await axios.put(`/user/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const getCurrentUser = async (email: string) => {
  const token = JSON.parse(localStorage.getItem("token") ?? "");
  const { data } = await axios.get(`/user/${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const logout = async (id: string) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  await axios.post(`/signout/${id}`);
};
