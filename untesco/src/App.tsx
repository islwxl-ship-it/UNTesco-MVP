import { Switch, Route, Router as WouterRouter, useLocation } from 'wouter'
import Dashboard from './pages/Dashboard'
import Chat      from './pages/Chat'
import Heatmap   from './pages/Heatmap'
import Settings  from './pages/Settings'
import BottomNav from './components/BottomNav'

function AppShell() {
  const [location] = useLocation()
  const showNav = location !== '/chat'
  return (
    <div className="shell">
      <div className="shell-inner">
        <Switch>
          <Route path="/"         component={Dashboard} />
          <Route path="/chat"     component={Chat}      />
          <Route path="/heatmap"  component={Heatmap}   />
          <Route path="/settings" component={Settings}  />
          <Route><Dashboard /></Route>
        </Switch>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <WouterRouter>
      <AppShell />
    </WouterRouter>
  )
}
