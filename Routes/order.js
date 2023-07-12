const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /orders
router.post('/order', (req, res) => {
  // Extract data from the request body
  const { id, petId, quantity, shipDate, status, complete } = req.body;

  // Create a new order instance
  const newOrder = new Order({
    id,
    petId,
    quantity,
    shipDate,
    status,
    complete,
  });

  // Save the order to the database
  newOrder
    .save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      console.error('invalid order:', error);
      res.status(400).json({ error: 'invalid order' });
    });
});

// Route for getting a specific order by ID
router.get('/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid ID supplied' });
    }
  });
  
  // Route for getting all orders
  router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Route for deleting a specific order by ID

// router.delete('/:id', async (req, res) => {
//     try {
//       const orderId = req.params.id;
//       const order = await Order.findById(orderId);
  
//       if (!order) {
//         return res.status(404).json({ message: "Order Not Found" });
//       }
  
//       await order.remove((error) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ message: "Error deleting order" });
//         }
//         res.status(200).json({ message: "Order deleted successfully" });
//       });
//     } catch (error) {
//       if (error.kind === 'ObjectId') {
//         return res.status(400).json({ message: "Invalid ID Supplied" });
//       }
  
//       console.error(error);
//       res.status(500).json({ message: "Error deleting order" });
//     }
//   });
  

router.delete('/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order Not Found" }); // Return the specific error message
      }
  
      await order.remove();
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: errorMessages[400] }); // Return the specific error message
      }
      
      console.error(error);
      res.status(400).json({ message: 'Invalid ID Supplied' });
    }
  });



// GET /inventory
router.get('/inventory', (req, res) => {
  // Your logic to fetch inventory data
  const inventory = {
    additionalProp1: 0,
    additionalProp2: 0,
    additionalProp3: 0,
  };

  res.status(200).json({
    code: 200,
    message: "Successful operation",
    data: inventory
  });
});

module.exports = router;


module.exports = router;
