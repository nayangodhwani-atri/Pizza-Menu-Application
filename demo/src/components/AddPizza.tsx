import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Pizza {
  id: number;
  name: string;
  toppings: string;
  Favourite: boolean;
  delivery: boolean;
}

interface PizzaFormProps {
  setPizza: React.Dispatch<React.SetStateAction<Pizza[]>>; 
  pizza: Pizza[];
}

const PizzaForm: React.FC<PizzaFormProps> = ({ setPizza,pizza }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Pizza>();
  const navigate = useNavigate();
  // Handle form submission
  const onSubmit = (data: Pizza) => {
    const newId = pizza.length > 0 ? Math.max(...pizza.map(p => p.id)) + 1 : 1;
    const newPizza: Pizza = {
      id: newId, 
      name: data.name,
      toppings: data.toppings,
      Favourite: data.Favourite,
      delivery: data.delivery,
    };

    console.log(newPizza.name);
    setPizza((prevPizza) => [...prevPizza, newPizza]);
    reset();
    navigate('/home');
  };

  return (
    <div>
      <h3>Add a New Pizza</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <label>
          Pizza Name:
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Pizza name is required', maxLength: { value: 100, message: 'Name cannot be more than 100 characters' } }}
            render={({ field }) => <input {...field} />}
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <br />

        
        <label>
          Toppings (comma separated):
          <Controller
            name="toppings"
            control={control}
            defaultValue={""}
            rules={{ required: 'Toppings are required' }}
            render={({ field }) => <input type = "string" {...field} />}
          />
        </label>
        {errors.toppings && <p>{errors.toppings.message}</p>}
        <br />

        
        <label>
  Favourite:
  <Controller
    name="Favourite"
    control={control}
    defaultValue={false} // Change default value to boolean false instead of "No"
    render={({ field }) => (
      <input
        type="checkbox"
        checked={field.value} // Use boolean value
        onChange={(e) => field.onChange(e.target.checked)} // Update value as boolean
      />
    )}
  />
</label>

    
        <label>
          Delivery:
          <Controller
            name="delivery"
            control={control}
            defaultValue={false}
            render={({ field }) => <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)}/>}
          />
        </label>
        <br />

        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
};

export default PizzaForm;
