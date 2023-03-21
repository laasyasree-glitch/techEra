import {Route, Switch} from 'react-router-dom'
import Home from './component/Home'
import NotFound from './component/NotFound'
import CourseItemDetails from './component/CourseItemDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/bad-path" component={NotFound} />
  </Switch>
)

export default App
