import { FC, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import {ROUTES} from '../../routes';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {getAuthorizationStatus} from '../../store/user-reducer/user-selector';

const SignInPage: FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  if (authorizationStatus === AuthorizationStatus.Auth){
    navigate(ROUTES.MAIN);
  }

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null){
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <div className="user-page">
      <Header/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default SignInPage;
