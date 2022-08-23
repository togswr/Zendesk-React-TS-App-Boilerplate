import React from 'react'
import './style.scss'
import zafClient from '../../zafClient'
import Footer from '../Footer'
import { ZafUserContext } from '../../types/zafClient'

const App: React.FC = () => {
  const [requester, setRequester] = React.useState<ZafUserContext>()

  React.useEffect(() => {
    void (async () => {
      void zafClient.invoke('resize', { height: '75px' })

      const data = await zafClient.get<{ 'ticket.requester': ZafUserContext }>(
        'ticket.requester'
      )
      const requester = data['ticket.requester']
      setRequester(requester)
    })()
  }, [])

  return (
    <div className="App">
      <p className="Requester-name">
        Requesters name is {requester !== undefined ? requester.name : ''}.
      </p>
      <Footer />
    </div>
  )
}

export default App
