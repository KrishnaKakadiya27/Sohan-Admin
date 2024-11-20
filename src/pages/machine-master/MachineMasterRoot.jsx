import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MachineMaster from './MachineMaster'
import AddMachineMaster from './AddMachineMaster'
import ViewMachineMaster from './ViewMachineMaster'
import EditMachineMaster from './EditMachineMaster'

const MachineMasterRoot = () => {
  return (
    <div>
          <Routes>
            <Route path="/" element={<MachineMaster />} />
            <Route path="add" element={<AddMachineMaster />} />
            <Route path="view/:id" element={<ViewMachineMaster />} />
            <Route path="edit/:id" element={<EditMachineMaster />} />
        </Routes>
    </div>
  )
}

export default MachineMasterRoot