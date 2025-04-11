import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Nav } from './componentes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
