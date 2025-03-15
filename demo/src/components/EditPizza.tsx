import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

interface Pizza {
  id: number;
  name: string;
  toppings: string[];
  Favourite: boolean;
  delivery: boolean;
}

interface EditPizzaProps {
  setPizza: React.Dispatch<React.SetStateAction<Pizza[]>>;
  pizza: Pizza[];
}

const EditPizza: React.FC<EditPizzaProps> = ({ setPizza, pizza }) => {
  const { id } = useParams<{ id: string }>(); // Get the pizza ID from the URL
  const navigate = useNavigate();

  // Find the pizza to edit
  const pizzaToEdit = pizza.find((p) => p.id === Number(id));

  const { control, handleSubmit, formState: { errors }, reset } = useForm<Pizza>({
    defaultValues: pizzaToEdit || {
      id: 0,
      name: '',
      toppings: [],
      Favourite: false,
      delivery: false,
    },
  });

  // Reset form with pizza data when pizzaToEdit changes
  useEffect(() => {
    if (pizzaToEdit) {
      reset(pizzaToEdit);
    }
  }, [pizzaToEdit, reset]);

  const onSubmit = (data: Pizza) => {
    // Update the pizza in the state
    setPizza((prevPizza) =>
      prevPizza.map((p) => (p.id === Number(id) ? { ...p, ...data } : p))
    );
    navigate('/home'); // Redirect back to the home page after submission
  };

  const toppingOptions = ['Cheese', 'Pepperoni', 'Black Olives', 'Beef', 'BBQ Sauce', 'Mushrooms'];

  if (!pizzaToEdit) {
    return <div>Pizza not found!</div>;
  }

  return (
    <div>
      <h3>Edit Pizza</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Pizza Name:
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Pizza name is required', maxLength: { value: 100, message: 'Name cannot be more than 100 characters' } }}
            render={({ field }) => <input {...field} />}
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <br />

        <label>Toppings:</label>
        <div>
          {toppingOptions.map((topping) => (
            <label key={topping} style={{ marginRight: '15px' }}>
              <Controller
                name="toppings"
                control={control}
                rules={{ required: 'At least one topping is required' }}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    value={topping}
                    checked={field.value.includes(topping)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.value, topping]
                        : field.value.filter((t) => t !== topping);
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
              {topping}
            </label>
          ))}
        </div>
        {errors.toppings && <p>{errors.toppings.message}</p>}
        <br />

        <label>
          Favourite:
          <Controller
            name="Favourite"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </label>
        <br />

        <label>
          Delivery:
          <Controller
            name="delivery"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </label>
        <br />

        <button type="submit">Update Pizza</button>
      </form>
    </div>
  );
};

export default EditPizza;