import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/companySetup'




const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Signup />
  },{
    path: '/jobs',
    element: <Jobs />
  },{
    path: "/description/:id",
    element: <JobDescription />
  },{
    path: "/browse",
    element: <Browse />
  },{
    path: "/profile",
    element: <Profile />
  },

// Admin
  {
    path:"/admin/companies",
    element: <Companies/>
  },
  {
    path:"/admin/companies/create",
    element: <CreateCompany/>
  },
  {
    path:"/admin/companies/:id",
    element: <CompanySetup />
  },
])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App