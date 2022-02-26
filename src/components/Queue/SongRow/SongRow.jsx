import './SongRow.scss'

const SongRow = ({index, song}) => {

  const { photoUrl, title, artists } = song

  return (
    <div className="songrow">
      <div className="songrow__image">
        <img src={photoUrl} alt={title}/>
      </div>
      <div className="songrow__info">
        <h2 className='songrow__info__title'>{title}</h2>
        <span>{artists.join(', ')}</span>
      </div>
      <span className='songrow__index'>{index}</span>
    </div>
  );
}
 
export default SongRow;