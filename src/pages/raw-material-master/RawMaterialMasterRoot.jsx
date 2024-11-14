import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RawMaterialMaster from './RawMaterialMaster'
import AddRawMaterial from './AddRawMaterial'
import ViewRawMaterial from './ViewRawMaterial'
import EditRawMaterial from './EditRawMaterial'

const RawMaterialMasterRoot = () => {
  return (
    <div>
         <Routes>
            <Route path="/" element={<RawMaterialMaster />} />
            <Route path="add" element={<AddRawMaterial />} />
            <Route path="view/:id" element={<ViewRawMaterial />} />
            <Route path="edit/:id" element={<EditRawMaterial />} />
        </Routes>
    </div>
  )
}

export default RawMaterialMasterRoot