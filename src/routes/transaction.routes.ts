import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const router = Router();

const repository = new TransactionsRepository();

router.get('/', (request, response) => {
  try {
    const transactions = repository.all();

    const balance = repository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

router.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const service = new CreateTransactionService(repository);

    const createTransaction = service.execute({
      title,
      value,
      type,
    });

    return response.json(createTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default router;
