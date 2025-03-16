import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AddPizza.css';

interface Pizza {
  id: number;
  name: string;
  toppings: string[];
  Favourite: boolean;
  delivery: boolean;
}

interface PizzaFormProps {
  setPizza: React.Dispatch<React.SetStateAction<Pizza[]>>;
  pizza: Pizza[];
}

const PizzaForm: React.FC<PizzaFormProps> = ({ setPizza, pizza }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Pizza>({
    defaultValues: {
      name: '',
      toppings: [],
      Favourite: false,
      delivery: false,
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: Pizza) => {
    const newId = pizza.length > 0 ? Math.max(...pizza.map((p) => p.id)) + 1 : 1;
    const newPizza: Pizza = {
      id: newId,
      name: data.name,
      toppings: data.toppings,
      Favourite: data.Favourite,
      delivery: data.delivery,
    };
    setPizza((prevPizza) => [...prevPizza, newPizza]);
    reset();
    navigate('/home');
  };

  const toppingOptions = ['Cheese', 'Pepperoni', 'Black Olives', 'Beef', 'BBQ Sauce', 'Mushrooms'];

  return (
    <div className="add-pizza-page">
      <div className="add-pizza-content">
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <span className="form-label">Pizza Name:</span>
              <div className="form-input">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Pizza name is required', maxLength: { value: 100, message: 'Name cannot be more than 100 characters' } }}
                  render={({ field }) => <input type="text" {...field} />}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
            </div>

            <div className="form-row">
              <span className="form-label">Toppings:</span>
              <div className="form-input">
                <div className="checkbox-group">
                  {toppingOptions.map((topping) => (
                    <label key={topping}>
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
                                : field.value.filter((t: string) => t !== topping);
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
              </div>
            </div>

            <div className="form-row">
              <span className="form-label">Favourite:</span>
              <div className="form-input">
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
              </div>
            </div>

            <div className="form-row">
              <span className="form-label">Delivery:</span>
              <div className="form-input">
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
              </div>
            </div>

            <button type="submit" className="button">Add Pizza</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PizzaForm;