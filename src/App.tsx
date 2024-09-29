
import './App.css'
import { RecordsTable } from './components'

function App() {

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-200'>
      <div className='flex flex-col p-4'>
        <h3 className='text-3xl font-semibold'>Listado</h3>
        <br />
        <RecordsTable />
      </div>
    </div>
  )
}

export default App
