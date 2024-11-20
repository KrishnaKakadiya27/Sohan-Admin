import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/auth/login/Login";
import CreateCategory from "../pages/category/AddCategory";
import Category from "../pages/category/Category";
import EditCategory from "../pages/category/EditCategory";
import SubCategory from "../pages/category/subCategory/SubCategory";
import Dashboard from "../pages/dashboard/Dashboard";
import ItemMaster from "../pages/item-master/ItemMaster";
import MachineMaster from "../pages/machine-master/MachineMaster";
import MaterialMaster from "../pages/material-master/MaterialMaster";
import AddOperator from "../pages/operator-master/AddOperator";
import EditOperator from "../pages/operator-master/EditOperator";
import OperatorMasterRoot from "../pages/operator-master/OperatorMasterRoot";
import ViewOperator from "../pages/operator-master/ViewOperator";
import AddPersonMaster from "../pages/person-master/AddPersonMaster";
import EditPersonMaster from "../pages/person-master/EditPersonMaster";
import PersonMasterRoot from "../pages/person-master/PersonMasterRoot";
import ViewPersonMaster from "../pages/person-master/ViewPersonMaster";
import RawMaterialMaster from "../pages/raw-material-master/RawMaterialMaster";
import RawMaterialMasterRoot from "../pages/raw-material-master/RawMaterialMasterRoot";
import AddRawMaterial from "../pages/raw-material-master/AddRawMaterial";
import ViewRawMaterial from "../pages/raw-material-master/ViewRawMaterial";
import EditRawMaterial from "../pages/raw-material-master/EditRawMaterial";
import MaterialMasterRoot from "../pages/material-master/MaterialMasterRoot";
import AddMaterialMaster from "../pages/material-master/AddMaterialMaster";
import ViewMaterialMaster from "../pages/material-master/ViewMaterialMaster";
import EditMaterialMaster from "../pages/material-master/EditMaterialMaster";
import MachineMasterRoot from "../pages/machine-master/MachineMasterRoot";
import AddMachineMaster from "../pages/machine-master/AddMachineMaster";
import ViewMachineMaster from "../pages/machine-master/ViewMachineMaster";
import EditMachineMaster from "../pages/machine-master/EditMachineMaster";

function RedirectionWrapper({ to }) {
  const queryString = window.location.search;
  if (queryString) {
    return <Navigate to={`${to}${queryString}`} />;
  }
  return <Navigate to={to} />;
}

const routes = (isLoggedIn) => [

  {
    path: '/',
    element: isLoggedIn ? <MainLayout /> : <RedirectionWrapper to="/login" />,
    children: [
      {
        index: true,
        element: <RedirectionWrapper to="/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/person-master',
        element: <PersonMasterRoot />,
        children: [
          {
            path: 'add',
            element: <AddPersonMaster />,
          },
          {
            path: "view/:id",
            element: <ViewPersonMaster />
          },
          {
            path: "edit/:id",
            element: <EditPersonMaster />
          }
        ],
      },
      {
        path: '/operator-master',
        element: <OperatorMasterRoot />,
        children: [
          {
            path: 'add',
            element: <AddOperator />,
          },
          {
            path: "view/:id",
            element: <ViewOperator />
          },
          {
            path: "edit/:id",
            element: <EditOperator />
          }
          // Add more operator sub-routes here as needed
        ],
      },
      {
        path: '/add-oprator-master',
        element: <AddOperator />,
      },
      // {
      //   path: '/item-master',
      //   element: <ItemMaster />,
      // },
      {
        path: '/machine-master',
        element: <MachineMasterRoot />,
        children: [
          {
            path: 'add',
            element: <AddMachineMaster />,
          },
          {
            path: "view/:id",
            element: <ViewMachineMaster />
          },
          {
            path: "edit/:id",
            element: <EditMachineMaster />
          }
        ],
      },
      {
        path: '/raw_material_master',
        element: <RawMaterialMasterRoot />,
        children: [
          {
            path: 'add',
            element: <AddRawMaterial />,
          },
          {
            path: "view/:id",
            element: <ViewRawMaterial />
          },
          {
            path: "edit/:id",
            element: <EditRawMaterial />
          }
        ],
      },
      {
        path: '/item-master',
        element: <MaterialMasterRoot />,
        children: [
          {
            path: 'add',
            element: <AddMaterialMaster />,
          },
          {
            path: "view/:id",
            element: <ViewMaterialMaster />
          },
          {
            path: "edit/:id",
            element: <EditMaterialMaster />
          }
        ],
      },
      {
        path: '/category',
        element: <Category />,
      },
      {
        path: '/create-category',
        element: <CreateCategory />,
      },
      {
        path: '/edit-category',
        element: <EditCategory />,
      },
      {
        path: '/sub-category',
        element: <SubCategory />,
      },

    ],
  },
  { path: '/login', element: !isLoggedIn ? <Login /> : <RedirectionWrapper to="/dashboard" /> },
  // { path: '*', element: <Page404 /> },
];

export default function Router(props) {
  const { isLoggedIn } = props;
  return useRoutes(routes(isLoggedIn));
}