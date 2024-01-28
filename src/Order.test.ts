import Beer from './Beer';
import MessageDataFile from './MessageDataFile';
import Order from './Order';
import Water from './Water';
import Whisky from './Whisky';

test('Should create an order and calculate totals', () => {
  const order = new Order(new MessageDataFile());
  order.addItem(new Beer('Brahma', 10));
  order.addItem(new Whisky('Jack Daniels', 100));
  order.addItem(new Water('Crystal', 1));

  const total = order.getTotal();
  expect(total).toBe(111);
})

test('Should create an order and calculate taxes', () => {
  const order = new Order(new MessageDataFile());
  order.addItem(new Beer('Brahma', 10)); // 10% taxes
  order.addItem(new Whisky('Jack Daniels', 100)); // 20% taxes
  order.addItem(new Water('Crystal', 1)); // 0% taxes

  const taxes = order.getTaxes();
  expect(taxes).toBe(21);
})


test('Should create an order and print a message in portuguese', async () => {
  const order = new Order(new MessageDataFile());
  order.addItem(new Beer('Brahma', 10)); // 10% taxes
  order.addItem(new Whisky('Jack Daniels', 100)); // 20% taxes
  order.addItem(new Water('Crystal', 1)); // 0% taxes

  const message = await order.printMessage('pt');
  expect(message).toBe('O total foi $111, o de taxas foi $21. Obrigado por sua compra!');
})

test('Should create an order and print a message in English', async () => {
  const order = new Order(new MessageDataFile());
  order.addItem(new Beer('Brahma', 10)); // 10% taxes
  order.addItem(new Whisky('Jack Daniels', 100)); // 20% taxes
  order.addItem(new Water('Crystal', 1)); // 0% taxes

  const message = await order.printMessage('en');
  expect(message).toBe('The total was $111, the taxes were $21. Thank you for your purchase!');
})