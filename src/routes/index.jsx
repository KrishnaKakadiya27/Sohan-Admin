import React from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/auth/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ForgotPassword from "../pages/auth/forgotPassword/ForgotPassword";
import ResetPassword from "../pages/auth/resetPassword/ResetPassword";
import PersonMaster from "../pages/person-master/PersonMaster";
import OperatorMaster from "../pages/operator-master/OperatorMaster";
import ItemMaster from "../pages/item-master/ItemMaster";
import MachineMaster from "../pages/machine-master/MachineMaster";
import Category from "../pages/category/Category";
import SubCategory from "../pages/category/subCategory/SubCategory";
import CreateCategory from "../pages/category/AddCategory";
import EditCategory from "../pages/category/EditCategory";

// const AppRoute = () => {

//   const token  = localStorage.getItem("token");
//   console.log("token",token)


//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={token ? <Navigate to={"/dashboard"}/> : <Login />} />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />
//         <Route path="/resetPassword" element={<ResetPassword />} />
//         <Route path="/" element={token ? <MainLayout /> : <Navigate to={"/login"} />}>
//         {/* <Route path="/" element={ <MainLayout />}> */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/person-master" element={<PersonMaster />} />
//           <Route path="/operator-master" element={<OperatorMaster />} />
//           <Route path="/item-master" element={<ItemMaster />} />
//           <Route path="/machine-master" element={<MachineMaster />} />
//           <Route path="/category" element={<Category />} />
//           <Route path="/create-category" element={<CreateCategory />} />
//           <Route path="/edit-category" element={<EditCategory />} />
//           <Route path="/sub-category" element={<SubCategory />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoute;

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
        element: <PersonMaster />,
      },
      {
        path: '/operator-master',
        element: <OperatorMaster />,
      },
      {
        path: '/item-master',
        element: <ItemMaster />,
      },
      {
        path: '/machine-master',
        element: <MachineMaster />,
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