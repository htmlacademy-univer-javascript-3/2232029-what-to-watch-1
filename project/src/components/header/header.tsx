import React from 'react';
import Logo from '../logo/logo';

export default function Header(props: {isMyListVisible?: boolean | undefined; myListCount?: number | undefined}): JSX.Element {
  let myList = (
    <React.Fragment>
    </React.Fragment>
  );
  if (props.isMyListVisible) {
    myList = (
      <h1 className="page-title user-page__title">
        My list
        <span className="user-page__film-count">{props.myListCount ?? 0}</span>
      </h1>);
  }
  return (
    <header className="page-header user-page__head">
      <Logo />
      {myList}
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
