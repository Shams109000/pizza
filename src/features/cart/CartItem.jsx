import { formatCurrency } from '../../utils/helpers';
import UpdateItemQuantity from './updateItemQuantity';
import DeleteItem from './DeleteItem';
import { getCurrentQuantityById } from './cartSlice';
import { useSelector } from 'react-redux';

function CartItem({ item, ingredients, isLoadingIngredients }) {
  const { name, quantity, totalprice, pizzaId } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="overflow-auto py-3 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
        <p className="text-sm capitalize italic text-stone-500">
          {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
        </p>
      </div>

      <div className="flex items-center justify-between sm:gap-6">
        <p className="mt-4 text-sm font-bold">{formatCurrency(totalprice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
