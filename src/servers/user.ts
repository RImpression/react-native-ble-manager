import { $post } from '../utils/request';
import * as Urls from '../servers/Urls';

export const login = o => $post(Urls.SIGNIN_URL, o, { loading: true })
export const logout = o => $post(Urls.SIGNOUT_URL, o)