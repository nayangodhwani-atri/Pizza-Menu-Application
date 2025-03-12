import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface Pizza {
  id: number;
  name: string;
  toppings: string[];
  Favourite: string;
  delivery: boolean;
}

interface PizzaFormProps {
  setPizza: React.Dispatch<React.SetStateAction<Pizza[]>>; 
}

const PizzaForm: React.FC<PizzaFormProps> = ({ setPizza }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Pizza>();

  // Handle form submission
  const onSubmit = (data: Pizza) => {
    const newPizza: Pizza = {
      id: data.id, 
      name: data.name,
      toppings: data.toppings.map((topping: string) => topping.trim()), 
      Favourite: data.Favourite,
      delivery: data.delivery,
    };

    console.log(newPizza.name);
    // Update the pizza state with the new pizza
    setPizza((prevPizza) => [...prevPizza, newPizza]);

    // Clear form fields after submission
    reset();
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
            defaultValue={[]}
            rules={{ required: 'Toppings are required' }}
            render={({ field }) => <input {...field} />}
          />
        </label>
        {errors.toppings && <p>{errors.toppings.message}</p>}
        <br />

        
        <label>
          Favourite:
          <Controller
            name="Favourite"
            control={control}
            defaultValue={"No"}
            render={({ field }) => <input type="string" {...field} />}
          />
        </label>
        <br />

    
        <label>
          Delivery:
          <Controller
            name="delivery"
            control={control}
            defaultValue={false}
            render={({ field }) => <input type="checkbox" {...field} checked={field.value} />}
          />
        </label>
        <br />

        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
};

export default PizzaForm;
