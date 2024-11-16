import { Form, useFetcher } from 'react-router-dom';
import LinkButton from '../../UI/LinkButton';
import Button from '../../UI/Button';
//import { formatCurrency } from '../../utils/helpers';
import EmptyCart from './EmptyCart';
import { clearCart, getCart } from './cartSlice';
//import { getTotalCartPrice } from './cartSlice';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../user/userSlice';
import { useEffect } from 'react';

function Cart() {
  const { username } = useSelector(getUser);

  //const totalCartPrice = useSelector(getTotalCartPrice);

  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <Form>
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

        <ul className="mt-3 divide-y divide-stone-400 border-b border-stone-400">
          {cart.map((item) => (
            <CartItem
              item={item}
              key={item.pizzaId}
              ingredients={
                fetcher.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
              isLoadingIngredients={fetcher.state === 'loading'}
            />
          ))}
        </ul>
        {cart.length > 0 && (
          <div className="mt-6 space-x-2">
            <Button to="/order/new" type="primary">
              Order pizzas
            </Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Cart;
