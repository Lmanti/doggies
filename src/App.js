import { Route, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { SearchBar } from './components/SearchBar/SearchBar';
import { CreationForm } from './components/DogCreator/Form';
import { DogDetails } from './components/DogDetails/DogDetails';
import style from './styles/App.module.css';

function App() {
  return (
    <div className={style.App}>
      <Route exact path='/' component={Home} />
      <Route path='/dogs' component={NavBar} />
      <Route exact path='/dogs/:id' component={DogDetails} />
      <Switch>
        <Route path='/dogs/create/form' component={CreationForm} />
        <Route path='/dogs' component={SearchBar} />
      </Switch>
    </div>
  );
}

export default App;
