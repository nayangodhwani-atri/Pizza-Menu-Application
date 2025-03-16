
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import {useState} from 'react';
import PizzaData from './components/Home';
import './components/styles.css';
import Button, { AddPizzaButton } from './components/HomeButton';
import PizzaForm from './components/AddPizza';
import { useEffect } from 'react';
import EditPizza from './components/EditPizza';


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

const deletePizza = (id: number) => {
  setPizza((prevPizza) => prevPizza.filter((p) => p.id !== id));
};
  return (
    
    <Router>
      <div style={{ height: '100vh', width: '100vw' }}>
      <Routes>
        <Route path="/" element={<><Button /><AddPizzaButton /></>} />
        <Route
            path="/home"
            element={<PizzaData pizzas={pizza} deletePizza={deletePizza} />}
          />
        <Route path="/home" element={<PizzaData pizzas={pizza}/>}/>
        <Route path="/add-pizza" element={<PizzaForm setPizza={setPizza} pizza={pizza}/>}/>
        <Route
            path="/edit/:id"
            element={<EditPizza setPizza={setPizza} pizza={pizza} />}
          />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
