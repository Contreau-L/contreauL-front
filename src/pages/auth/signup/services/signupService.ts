import axios, {AxiosResponse} from "axios";
import {getUserSignupUrl} from "./url";
import {UserSignup} from "./dtt";

export function signupUser(user: UserSignup): Promise<any> {
  return axios.post(getUserSignupUrl(), {
    name: user.name,
    password: user.password,
    email: user.email
  }).then((response: AxiosResponse<any>) => {
    return {name: response.data.name, token: response.data.token};
  })
}
