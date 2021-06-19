// import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import { Route, Switch } from 'react-router';
import Signup from "./components/signup";


function App() {
  return (
    // organizing the web page from top to bottom for the entire length of the page
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>
      <main className="container-fluid flex-fill">
       <Switch>
        {/* <Route path="/signin" component={Signin} /> */}
        <Route path="/signup" component={Signup} /> 
        <Route path="/" component={Home} exact/>
       </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
