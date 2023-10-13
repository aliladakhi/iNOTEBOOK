import React, { useEffect } from 'react'
import { useContext } from 'react';
import noteContext from '../Context/Notes/noteContext';

function About() {
  const a=useContext(noteContext)
  return (
    <div>
      About
    </div>
  )
}

export default About
