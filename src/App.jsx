import { Outlet } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Footer from './Layouts/Footer'

function App() {

  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar></Navbar>
      <div className='min-h-screen'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
