import './App.css'
import {Routes,Route} from 'react-router-dom'
// components 
import MovieCard from './assets/components/MovieCard'
import Home from './assets/pages/Home'
import Favorites from './assets/pages/Favorites'
import NavBar from './assets/components/NavBar'

function App() {


  return (
    <div>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
    </main>
    </div>
  )
}

export default App

