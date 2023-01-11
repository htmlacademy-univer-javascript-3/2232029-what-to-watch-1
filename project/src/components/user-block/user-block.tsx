import { FC } from 'react';
import { Link } from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import {getAuthorizationStatus, getUser} from '../../store/user-reducer/user-selector';
import {ROUTES} from '../../routes';

type AuthedUserBlockProps = {
  avatarLink: string;
}
const AuthedUserBlock: FC<AuthedUserBlockProps> = (props) => {
  const { avatarLink } = props;
  const dispatch = useAppDispatch();

  const handleSignOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={ROUTES.MYLIST}>
            <img src={avatarLink} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <Link to={ROUTES.MAIN} className="user-block__link" onClick={handleSignOutClick}>Sign out</Link>
      </li>
    </>
  );
};

const UserBlock: FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  return (
    <ul className="user-block">
      {authorizationStatus === AuthorizationStatus.Auth
        ? <AuthedUserBlock avatarLink={user ? user.avatarUrl : 'img/avatar.jpg'} />
        : <Link to='/login' className='user-block__link'>Sign in</Link>}
    </ul>
  );
};

export default UserBlock;
