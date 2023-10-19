import React from 'react'
import{useContext} from 'react'
import NoteContext from '../context/notes/noteContext'

const About = () => {
    const{name}=useContext(NoteContext)
  return (
    <div>this is about {name}</div>
  )
}

export default About