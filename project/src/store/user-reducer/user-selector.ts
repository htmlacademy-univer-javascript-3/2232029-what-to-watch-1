import {User} from '../../types/user';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {NameSpace} from '../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): User | null => state[NameSpace.User].user;
