export const ROUTES = {
  MAIN: '/',
  SIGNIN: '/login',
  MYLIST: '/mylist',
  FILM: '/films/:id',
  FILMPREFIX: '/films',
  ADDREVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
  NOTFOUND: '*'
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
