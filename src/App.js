import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Explore from './components/Explore';
import Navbar from './components/Navbar';
import ShareForm from './components/ShareForm';
import Registration from './components/Registration';
import Footer from './components/Footer';
import Login from './components/Login';
function App() {
	return (
		<Router>
			<div className=''>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />

					<Route exact path='/explore' component={Explore} />
					<Route exact path='/share' component={ShareForm} />
					<Route exact path='/registration' component={Registration} />
					<Route exact path='/login' component={Login} />
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
