// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Toaster } from 'react-hot-toast';
import Login from "./component/frontend/Login.jsx"; // Capital L
import SignUp from "./component/frontend/SignUp.jsx"; // Capital S
import HomePage from "./component/frontend/HomePage.jsx";
import LeftLayout from "./component/Layout/LeftLayout.jsx";
import HomePageLayer from "./component/Layout/HomePageLayer.jsx";
import RightPageLayer from "./component/Layout/RightPageLayer.jsx";
import CreatePost from "./component/Layout/CreatePost.jsx";
import HalfProfile from "./component/frontend/HalfProfile.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/layout",
      element: <LeftLayout />,
    },{
      path: "/signup",
      element: <SignUp />,
    },{
      path: "/login",
      element: <Login />,
    },{
      path: "/uploadpost",
      element: <CreatePost />,
    },{
      path: "/half",
      element: <HalfProfile />,
    },{
      // 👇 Layout ke andar nested routes
      path: "/",
      element: <LeftLayout />,
      children: [
        {
          index: "center",
          element: <HomePageLayer />,
        },{
        path: "right",
        element: <RightPageLayer />,
      },
      ],
    },
  ]);
  
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/layout" element={<LeftLayout />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter> */}
    <Toaster />
    <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
