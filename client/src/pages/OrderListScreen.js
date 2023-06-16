import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { getError } from '../utils';
import { ZoyContext } from '../ZoyContext';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true, successDeliver: false };
    case 'DELIVER_SUCCESS':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: true,
      };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return { ...state, loadingDeliver: false, successDeliver: false };
    default:
      return state;
  }
};

export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(ZoyContext);
  const { user } = state;
  const [{ loading, error, orders, loadingDelete, successDelete, loadingDeliver, successDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };

    if (successDelete || successDeliver) {
      dispatch({ type: 'DELETE_RESET' });
      dispatch({ type: 'DELIVER_RESET' });
    } else {
      fetchData();
    }
  }, [user, successDelete, successDeliver]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`http://localhost:8080/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success('Order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(err));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  const deliverHandler = async (order) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        dispatch({ type: 'DELIVER_REQUEST' });
        await axios.put(
          `http://localhost:8080/api/orders/${order._id}/deliver`,
          {},
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        toast.success('Order delivered successfully');
        dispatch({ type: 'DELIVER_SUCCESS' });
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'DELIVER_FAIL' });
      }
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      {/* Rest of the code */}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : 'Unknown'}</td>
                <td>{order.createdAt ? order.createdAt.substring(0, 10) : 'Unknown'}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                <td>
                  {order.isDelivered ? (order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'Unknown') : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </Button>
                  &nbsp;
                  {!order.isDelivered && (
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deliverHandler(order)}
                    >
                      Deliver
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
