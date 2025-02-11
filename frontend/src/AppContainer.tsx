import axios from "axios"
import App from "./App.tsx"
import React from 'react'

export interface Seminars {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
    photo: string
}

const AppContainer = () => {

    const [seminars, setSeminars] = React.useState<Seminars[]>([])
    const [message, setMessage] = React.useState<{message: string, type: string}>({})
    
    React.useEffect(() => {
        getSeminars()
    }, [])

    const getSeminars = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/seminars/`)
          .then((response) => {
            setSeminars(response.data)
          })
          .catch((error) => {
            setMessage({message: error.message, type: 'error'})
          })
      }
    
      const deleteSeminar = async (id) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/seminars/delete/${id}`)
          .then((response) => {
            setSeminars(response.data.newSeminars)
            setMessage({message: response.data.message, type: 'success'})
          })
          .catch((error) => {
            setMessage({message: error.message, type: 'error'})
          })
      }
    
      const editSeminar = async (seminar) => {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/seminars/edit`, {
            newSeminar: seminar
        })
          .then((response) => {
            setSeminars(response.data.newSeminars)
            setMessage({message: response.data.message, type: 'success'})
          })
          .catch((error) => {
            setMessage({message: error.message, type: 'error'})
          })
      }

    return <App 
        seminars={seminars} 
        message={message}
        deleteSeminar={deleteSeminar}
        editSeminar={editSeminar}/>
}

export default AppContainer