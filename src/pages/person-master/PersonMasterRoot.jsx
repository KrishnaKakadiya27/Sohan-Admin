import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddPersonMaster from './AddPersonMaster'
import PersonMaster from './PersonMaster'
import ViewPersonMaster from './ViewPersonMaster'
import EditPersonMaster from './EditPersonMaster'

const PersonMasterRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonMaster />} />
      <Route path="add" element={<AddPersonMaster />} />
      <Route path="view/:id" element={<ViewPersonMaster />} />
      <Route path="edit/:id" element={<EditPersonMaster />} />
    </Routes>
  )
}

export default PersonMasterRoot