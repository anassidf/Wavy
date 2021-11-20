import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Explore from './components/Explore';
import Navbar from './components/Navbar';
function App() {
	return (
		<Router>
			<div className=''>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />

					<Route exact path='/explore' component={Explore} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
