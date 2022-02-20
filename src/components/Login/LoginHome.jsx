import { LOGIN_PAGES } from "../../helpers/LoginHelper";

const LoginHome = ({setCurrentPage}) => {
  return (
    <>
      <h1 className="login__header">Zaloguj się przez:</h1>
      <button onClick={() => setCurrentPage(LOGIN_PAGES.email)} className="login__button">E-mail</button>
      <button className="login__button">Google</button>
      <p className="login__p login__p--right">
        Nie masz jeszcze konta? {""}
        <span className="login__p__span" onClick={() => setCurrentPage(LOGIN_PAGES.register)}>Zarejestruj się!</span>
      </p>
    </>
  );
}
 
export default LoginHome;