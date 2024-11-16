import { formatCurrency } from '../../utils/helpers';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/updateItemQuantity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const handleAddtoCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalprice: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  };

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  //console.log('Item---->', currentQuantity);
  const isInCart = currentQuantity > 0;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacit-70 grayscale' : ''}`}
      />
      <div className="fon flex  grow flex-col">
        <p className="font-medium text-stone-900">
          {id}){name}
        </p>

        <p className="text-sm capitalize italic text-stone-600">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm text-stone-900">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="flex items-center gap-3 sm:gap-8">
            {!soldOut && isInCart && (
              <div>
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
              </div>
            )}
            <div>
              {isInCart && <DeleteItem pizzaId={id} />}
              {!soldOut && !isInCart && (
                <Button onClick={handleAddtoCart} type="small">
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
