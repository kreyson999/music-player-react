import './Input.scss'

const Input = ({type = 'text', placeholder, icon, value, onChange, error = '' }) => {
  return (
      <div className="input">
        <div className="input__container">
          <input 
          value={value} 
          type={type} 
          placeholder={placeholder} 
          onChange={onChange}
          />
          <img src={icon} alt={placeholder}/>
        </div>
        {error.length > 0 && (<span className='input__error'>{error}</span>)}
      </div>
  );
}
 
export default Input;