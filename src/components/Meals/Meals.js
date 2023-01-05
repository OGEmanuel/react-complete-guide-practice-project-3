import { Fragment } from 'react';

import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals = props => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals
        list={props.list}
        loading={props.loading}
        error={props.error}
        onFetch={props.onFetch}
      />
    </Fragment>
  );
};

export default Meals;
