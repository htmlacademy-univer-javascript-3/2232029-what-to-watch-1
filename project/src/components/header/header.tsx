import Logo from '../logo/logo';
import {HeaderProps} from '../../types/header-props';

function Header(props: HeaderProps) {
  const { isMyListVisible, myListCount } = props;
  return (
    <header className="page-header user-page__head">
      <Logo />
      {isMyListVisible &&
        (
          <h1 className="page-title user-page__title">
            My list
            <span className="user-page__film-count">{myListCount ?? 0}</span>
          </h1>
        )}
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={'img/avatar.jpg'} alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link">Sign out</a>
        </li>
      </ul>
    </header>
  );
}
export default Header;
