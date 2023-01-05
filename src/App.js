import { useEffect, useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import useHttp from './hooks/use-http';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = mealsObj => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          description: mealsObj[mealKey].description,
          name: mealsObj[mealKey].name,
          price: mealsObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: 'https://react-http-3cd6c-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
      },
      transformMeals
    );
  }, [fetchMeals]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals
          list={meals}
          loading={isLoading}
          error={error}
          onFetch={fetchMeals}
        />
      </main>
    </CartProvider>
  );
}

export default App;
