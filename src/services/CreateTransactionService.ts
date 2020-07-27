import { response } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private repository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.repository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('The type of transaction must be income or outcome');
    }

    const { total } = this.repository.getBalance();

    if (type === 'outcome' && total - value < 0) {
      throw Error('You cannot make transactions without money');
    }

    const transaction = this.repository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
