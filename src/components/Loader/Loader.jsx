import './Loader.scss'

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__container">
        <div className="loader__container__line"></div>
        <div className="loader__container__line"></div>
        <div className="loader__container__line"></div>
        <div className="loader__container__line"></div>
        <div className="loader__container__line"></div>
      </div>  
    </div>
  );
}
 
export default Loader;