import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import {
  getOrders,
  getDeliveryBoys,
  assignDeliveryBoy,
  createOrder,
} from '../utilis/appService'; // Import from the service

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDeliveryBoys, setSelectedDeliveryBoys] = useState({});
  const [formData, setFormData] = useState({ quantity: '', status: '' });
  const [editOrderId, setEditOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);

        const deliveryBoysData = await getDeliveryBoys();
        setDeliveryBoys(deliveryBoysData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectDeliveryBoy = (orderId, deliveryBoyId) => {
    setSelectedDeliveryBoys((prev) => ({
      ...prev,
      [orderId]: deliveryBoyId,
    }));
  };

  const handleAssignDeliveryBoy = async (orderId) => {
    const deliveryBoyId = selectedDeliveryBoys[orderId];
    if (!deliveryBoyId) {
      alert('Please select a delivery boy');
      return;
    }

    try {
      await assignDeliveryBoy(orderId, deliveryBoyId);
      alert('Delivery boy assigned successfully');
      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error assigning delivery boy:', error);
    }
  };

  const handleSaveOrder = async () => {
    try {
      if (editOrderId) {
        // await updateOrder(editOrderId, formData);
        alert('Order updated successfully');
      } else {
        // await createOrder(formData);
        alert('Order created successfully');
      }
      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
      setFormData({ quantity: '', status: '' });
      setEditOrderId(null);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleEditOrder = (order) => {
    setEditOrderId(order._id);
    setFormData({ quantity: order.quantity, status: order.status });
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        // await deleteOrder(orderId);
        alert('Order deleted successfully');
        // const updatedOrders = await getOrders();
        // setOrders(updatedOrders);
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Table Container */}
        <div className="col-md-8">
          <h1>Orders</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Delivery Boy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <Form.Select
                      onChange={(e) => handleSelectDeliveryBoy(order._id, e.target.value)}
                      defaultValue={order.deliveryBoy ? order.deliveryBoy._id : ''}
                    >
                      <option value="" disabled>
                        Select Delivery Boy
                      </option>
                      {deliveryBoys.map((boy) => (
                        <option key={boy._id} value={boy._id}>
                          {boy.name} - {boy.isAvailable ? 'Available' : 'Not Available'}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => handleAssignDeliveryBoy(order._id)}>
                      Assign
                    </Button>{' '}
                    <Button variant="warning" onClick={() => handleEditOrder(order)}>
                      Edit
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Form Container */}
        <div className="col-md-4">
          <h2>{editOrderId ? 'Edit Order' : 'Create Order'}</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Enter quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="Enter status"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveOrder}>
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Orders;
