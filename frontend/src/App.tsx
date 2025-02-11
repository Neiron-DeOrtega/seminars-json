import React from 'react';
import './App.scss';
import { Seminars } from './AppContainer';
import Modal from 'react-modal';

interface AppProps {
  message: {message: string, type: string},
  seminars: Seminars,
  editSeminar: (Seminars) => void,
  deleteSeminar: (id: number) => void
}

function App({message, seminars, editSeminar, deleteSeminar}): React.FC<AppProps> {

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [activeSeminar, setActiveSeminar] = React.useState<Seminars>({})

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [photo, setPhoto] = React.useState('');


  const openDeleteModal = (seminar) => {
    setActiveSeminar(seminar)
    setIsDeleteOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteOpen(false)
  }

  const openEditModal = (seminar) => {
    setActiveSeminar(seminar)

    setTitle(seminar.title)
    setDescription(seminar.description)
    setDate(seminar.date.split('.').reverse().join('-'))
    setTime(seminar.time)
    setPhoto(seminar.photo)

    setIsEditOpen(true)
  }
  const closeEditModal = () => {
    setIsEditOpen(false)
  }

  const handleEditSeminar = async () => {
    const requestBody = {
      id: activeSeminar.id,
      title: title,
      description: description,
      date: date.split('-').reverse().join('.'),
      time: time,
      photo: photo,
    }
    await editSeminar(requestBody)
    closeEditModal()
  }

  const handleDeleteSeminar = async (id) => {
    await deleteSeminar(id)
    closeDeleteModal()
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: '#7979790e'
    }
  };

  return (
    <main className="seminars">
      <div className="container">
        <div className={message.type + ' ' + 'message'}>{message.message}</div>
        <div className="wrapper">
          {seminars.map((seminar) => {
            return (
              <div key={seminar.id} className="seminars">

                <Modal
                  isOpen={isDeleteOpen}
                  onRequestClose={closeDeleteModal}
                  style={customStyles}
                  ariaHideApp={false}
                >
                  <h2 className="seminars__title">Удаление семинара {activeSeminar.title}</h2>
                  <div className="button-wrapper">
                    <button className="btn" onClick={() => handleDeleteSeminar(activeSeminar.id)}>Удалить</button>
                    <button className="btn" onClick={closeDeleteModal}>Отмена</button>
                  </div>
                </Modal>

                <Modal
                  isOpen={isEditOpen}
                  onRequestClose={closeEditModal}
                  style={customStyles}
                  ariaHideApp={false}
                >
                  <h2 className="seminars__title">Редактирование семинара</h2>
                  <form action="" className="input-wrapper">
                    <input className="input" type="text" placeholer="Название семинара"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                      />
                    <input className="input" type="text" placeholer="Описание семинара"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                      />
                    <input className="input" type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                      />
                    <input className="input" type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                      />
                    <input className="input" type="text" placeholer="Ссылка на изображение"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                      />
                  </form>
                  <div className="button-wrapper">
                    <button className="btn" onClick={() => handleEditSeminar()}>Сохранить</button>
                    <button className="btn" onClick={closeEditModal}>Отмена</button>
                  </div>
                </Modal>

                <h2 className="seminars__title">{seminar.title}</h2>
                <p className="seminars__description">{seminar.description}</p>
                <div className="seminars__date-wrapper date-wrapper">
                  <p className="seminars__date">{seminar.date}</p>
                  <p className="seminars__time">{seminar.time}</p>
                </div>
                <img src={seminar.photo} className="seminars__photo"/>
                <div className="seminars__button-wrapper button-wrapper">
                  <button className="seminars__btn btn" onClick={() => openEditModal(seminar)}>Редактировать</button>
                  <button className="seminars__btn btn btn_reverse" onClick={() => openDeleteModal(seminar)}>Удалить</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
