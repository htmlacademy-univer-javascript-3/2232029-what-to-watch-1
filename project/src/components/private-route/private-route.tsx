import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import {AuthorizationStatus} from '../../const';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: Props) {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={ROUTES.SIGNIN} />
  );
}

export default PrivateRoute;
