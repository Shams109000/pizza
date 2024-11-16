import { useFetcher } from 'react-router-dom';
import Button from '../../UI/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary"> Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export const action = async ({ request, params }) => {
  console.log('update');
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
};
