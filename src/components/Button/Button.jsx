import './Button.scss'

const Button = ({text, onClick, image = null, isPrimary = false}) => {
  return (
    <button 
    onClick={onClick}
    className={`button ${isPrimary ? 'button--primary' : ''}`}>
      {image && (<img src={image} alt={text} />)}
      <span>{text}</span>
    </button>
  );
}
 
export default Button;