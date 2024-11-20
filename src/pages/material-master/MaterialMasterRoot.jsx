import React from 'react'
import MaterialMaster from './MaterialMaster'
import AddMaterialMaster from './AddMaterialMaster'
import ViewMaterialMaster from './ViewMaterialMaster'
import EditMaterialMaster from './EditMaterialMaster'
import { Route, Routes } from 'react-router-dom'

const MaterialMasterRoot = () => {
  return (
    <div>
          <Routes>
            <Route path="/" element={<MaterialMaster />} />
            <Route path="add" element={<AddMaterialMaster />} />
            <Route path="view/:id" element={<ViewMaterialMaster />} />
            <Route path="edit/:id" element={<EditMaterialMaster />} />
        </Routes>
    </div>
  )
}

export default MaterialMasterRoot