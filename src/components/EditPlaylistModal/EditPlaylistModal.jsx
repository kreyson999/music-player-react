import { useState } from "react";

import { updatePlaylist } from "../../services/database";
import { uploadPlaylistPhoto } from "../../services/storage";

import Button from "../Button/Button";
import Input from "../Input/Input";

import "./EditPlaylistModal.scss"

const EditPlaylistModal = ({ toggleEditPlaylistModal, playlist }) => {
  const [title, setTitle] = useState(playlist.title)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(playlist.photoUrl)
  const [error, setError] = useState('')

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
        setPhotoFile(e.target.files[0])
        setPhotoUrl(URL.createObjectURL(e.target.files[0]))
      } else {
        setError('The file must be in .png format!')
      }
    }
  }

  const handleUpdatePlaylist = async () => {
    if (title.length < 4 || title.length > 32) {
      setError('Name of the playlist should be min. 4 characters and max. 32 characters.')
      return
    } else if (title === playlist.title) {
      setError('Title must be different than before.')
      return
    }
    
    if (photoFile) {
      const result = await uploadPlaylistPhoto(photoFile)
      await updatePlaylist({title, photoUrl: result, id: playlist.id})
    } else {
      await updatePlaylist({title, photoUrl: playlist.photoUrl, id: playlist.id})
    }
    toggleEditPlaylistModal()
  }

  return (
    <div className="editplaylistmodal">
      <div className="editplaylistmodal__container">
        <button className="editplaylistmodal__container__iconbutton" onClick={toggleEditPlaylistModal}>
          <img src="/music-player-react/assets/icons/close.svg" alt="Close Modal"/>
        </button>
        <div className="editplaylistmodal__container__bottom">
          <div className="editplaylistmodal__container__bottom__image">
            <img src={photoUrl ? photoUrl : "/music-player-react/assets/icons/disc.svg"} alt={playlist.title} />
            <div className="editplaylistmodal__container__bottom__image__editbutton">
              <div className="playbutton">
                <input type="file" id="file" onChange={handleChangePhoto}/>
                <label htmlFor="file">
                  <img src="/music-player-react/assets/icons/edit.svg" alt="Change" />
                </label>
              </div>
            </div>
          </div>
          <Input
          placeholder={'Playlist Name'}
          value={title}
          onChange={onChangeTitle}
          icon={'/music-player-react/assets/icons/disc.svg'}
          />
          <div className="editplaylistmodal__container__button">
            <Button
              onClick={handleUpdatePlaylist}
              text={'Update'}
              isPrimary={true}
            />
          </div>
          {error.length > 0 && (<span className="editplaylistmodal__container__bottom__error">{error}</span>)}
        </div>
      </div>
    </div>
  );
}
 
export default EditPlaylistModal;