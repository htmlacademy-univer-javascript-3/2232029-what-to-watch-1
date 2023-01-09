import { FC } from 'react';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type Props = {
  isMyListVisible?: boolean;
  myListCount?: number;
}

const Header : FC<Props> = (props) => {
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
      <UserBlock />
    </header>
  );
};
export default Header;
