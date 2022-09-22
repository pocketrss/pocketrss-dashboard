import App from '@/app'

import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, HashRouter } from 'react-router-dom'

const element = document.getElementById('__app') as HTMLDivElement

const root = createRoot(element)

root.render(
  <Router>
    <App />
  </Router>
)
