import { LOGIN_PAGES } from '../../helpers/LoginHelper'

const Email = ({setCurrentPage}) => {
  return (
    <>
      <h1 className="login__header">
        <div onClick={() => setCurrentPage(LOGIN_PAGES.home)} className="login__header__img">
          <img src="assets/left_icon.svg" alt="Wróć"/>
        </div>
        <span>Zaloguj się:</span>
      </h1>
      <hr/>
      <form className="login__form">
        <label className='login__form__label' htmlFor="email">Podaj swój adres e-mail:</label>
        <input className='login__form__input' type="email" id="email" placeholder="E-mail"/>
        <label className='login__form__label' htmlFor="password">Podaj swoje hasło:</label>
        <input className='login__form__input' type="password" id="password" placeholder="Hasło"/>
        <button className='login__form__button'>Zaloguj się</button>
      </form>
    </>
  );
}
 
export default Email;