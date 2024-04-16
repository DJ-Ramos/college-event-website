import removeCookie from "../hooks/removeCookie";

export const logout = () => {
  removeCookie("user_id");
  removeCookie("first_name");
  removeCookie("last_name");
  removeCookie("user_type");
};
