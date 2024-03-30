import toast from "react-hot-toast";

export const addToLocalStorage = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
  toast.success("Logged in successfully");
};

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
};

export const removeFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) localStorage.removeItem(key);
  toast.success("Logged out successfully");
};

export const clearFromLocalStorage = () => {
  localStorage.clear();
};
