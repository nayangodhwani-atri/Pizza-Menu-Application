import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPizza.css';

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (pizzaToEdit) {
      reset(pizzaToEdit); // Reset form with existing pizza data
    }
  }, [pizzaToEdit, reset]);

  const onSubmit = (data: Pizza) => {
    setPizza((prevPizza) =>
      prevPizza.map((p) => (p.id === Number(id) ? { ...data, id: p.id } : p))
    );
    navigate('/');
  };

  const toppingOptions = ['Cheese', 'Pepperoni', 'Black Olives', 'Beef', 'BBQ Sauce', 'Mushrooms'];

  if (!pizzaToEdit) {
    return <div>Pizza not found!</div>;
  }

  return (
    <div className="edit-pizza-page">
      <div className="edit-pizza-content">
        <h1 className="title">Edit Pizza</h1>
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

            <button type="submit" className="button">Update Pizza</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPizza;