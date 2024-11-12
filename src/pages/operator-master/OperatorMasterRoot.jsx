import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OperatorMaster from './OperatorMaster'
import AddOperator from './AddOperator'
import ViewOperator from './ViewOperator'
import EditOperator from './EditOperator'

const OperatorMasterRoot = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<OperatorMaster />} />
            <Route path="add" element={<AddOperator />} />
            <Route path="view/:id" element={<ViewOperator />} />
            <Route path="edit/:id" element={<EditOperator />} />
        </Routes>

    </div>
  )
}

export default OperatorMasterRoot