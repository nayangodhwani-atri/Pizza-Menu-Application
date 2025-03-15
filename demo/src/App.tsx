
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import {useState} from 'react';
import PizzaData from './components/Home';
import './components/styles.css';
import Button, { AddPizzaButton } from './components/HomeButton';
import PizzaForm from './components/AddPizza';
import { useEffect } from 'react';


function App() {

  interface Pizza {
    id: number;
    name: string;
    toppings: string[];
    Favourite: boolean;
    delivery: boolean;
  }
  const sampleData: Pizza[]=[
    {id: 1, name: 'Margherita', toppings:['Cheese'],Favourite:true, delivery: true},
    {id: 2, name: 'Pepperoni', toppings:['Black Olives'],Favourite:true, delivery: true},
    {id: 3, name: 'BBQ Chicken', toppings:['Beef'],Favourite:true, delivery: true},
]
  const [pizza, setPizza] = useState<Pizza[]>(sampleData);

useEffect(() => {
  console.log('Pizza state has changed:', pizza);
}, [pizza]);
  return (
    
    <Router>
      <div>
        <h1 className='title' id="titlename" style={{ textAlign: 'center', color: '#333'}}>Pizza Hut</h1>
      <Routes>
        <Route path="/" element={<><Button /><AddPizzaButton /></>} />
        <Route path="/home" element={<PizzaData pizzas={pizza}/>}/>
        <Route path="/add-pizza" element={<PizzaForm setPizza={setPizza} pizza={pizza}/>}/>
        
      </Routes>
      </div>
    </Router>
  );
}

export default App;
