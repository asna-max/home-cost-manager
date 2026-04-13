import { useState } from 'react'
import Login from "./pages/Login"
import Bills from './pages/Bills'

function App() {
  const [token, setToken] = useState(null)

  return(
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ): (
        <Bills token={token} />
      )
      }
    </div>
  )
}

export default App
