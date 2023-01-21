import {FC, FormEvent, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {ROUTES} from '../../routes';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {getAuthorizationStatus} from '../../store/user-reducer/user-selector';
import {AuthData} from '../../types/auth-data';


const SignInPage: FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const isSignInMessage = false;
  const isValidPassword = (password: string): boolean => /\d+[a-zA-Z]+|[a-zA-Z]+\d+/.test(password);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(ROUTES.MAIN);
    }
  }, [authorizationStatus, navigate]);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);


  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData))
      .then(() => navigate(ROUTES.MAIN))
      .catch(() => setIsError(true));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && isValidPassword(String(passwordRef.current?.value))) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="user-page">
      <Header/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
          <div className="sign-in__message">
            {(
              () => {
                if (isError) {
                  return (<p>Please enter a valid email address and password</p>);
                } else if (isSignInMessage) {
                  return (<p>We can’t recognize this email and password combination. Please try again.</p>);
                }
              })()}
          </div>
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
