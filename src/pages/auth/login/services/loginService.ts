import {UserLogin} from "./dtt";
import axios from "axios";
import {getUserLoginUrl} from "./url";

export function loginUser(user: UserLogin): Promise<UserLogin> {
  return axios.post(getUserLoginUrl(), {
    password: user.password,
    email: user.email
  }).then((response) => {
    return {name: response.data.name, token: response.data.token, id: response.data.id}
  })
}
