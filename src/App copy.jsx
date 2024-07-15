import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//source:https://www.saurabhmisra.dev/setup-react-pwa-using-vite/
//https://wingsofflimitsprivacy.xyz/WngsffLmtsBwfdxs?sub_id_1=NPR&sub_id_2=668ac99d501d16a7384d8807&pixel=714981180129689&token=EAAEcIRgo4MIBO7Gb3oGV6rbcjXOiZBhplvcAeWAXc6Xfn0xZAv02XEts1RyAcV7zEbY6mbYBqPgjUKY6PWhRrRf0YWHkzBToto5Q6rSJ4RqDWg8u84mKzhC28AeZBv1EXYGfCj1NZBTNPTH7ejqdUtCZA7ZCIgvZAZBuGqEpySTJOCgz6aIQawJfcsQBRGiuTiPh7AZDZD&domain=https://av-gameprivacypolicy.site/app&purchase_amount=10&app_id=271837082690554&access_token=EAAD3PADAIZCoBO4wRTyTrOGa74Q341dAStsOZATIKLKcJxWijXjjBGNrXDPg5gkgdRP5cAYBL30GJErnU0y4sQaCFvZB27Ofh898y6a87PEEOxRd1eIZAgzCrZBEhl8BZAz8ii76OwOT5FvvHqSlXJNmy2alIlrCsm9zDDRLPFPTvZBesQaZAXW5ZCwSh9ZBvsCDbO

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
