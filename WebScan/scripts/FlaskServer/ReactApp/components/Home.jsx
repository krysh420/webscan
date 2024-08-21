import  { useContext, useEffect } from 'react'
import AllLogs from './AllLogs'
import Form from './Form'
import ModeContext from '../context/modeContext'



const Home = () => {
  const context = useContext(ModeContext)
  const {OnReloadMode} = context
  useEffect(() => {
    OnReloadMode()
  }, [])
  return (
    <>
    <AllLogs/>
    <Form/>
    </>
  )
}

export default Home