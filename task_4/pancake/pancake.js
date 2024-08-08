
class Order {
  constructor(customerName, pancakeType, toppings, extras, totalPrice) {
    this.customerName = customerName;
    this.pancakeType = pancakeType;
    this.toppings = toppings;
    this.extras = extras;
    this.totalPrice = totalPrice;
    this.status = 'Pending';
  }

  markAsCompleted() {
    this.status = 'Completed';
  }

  static fromObject(obj) {
    return new Order(obj.customerName, obj.pancakeType, obj.toppings, obj.extras, obj.totalPrice);
  }

  markAsCompleted() {
    this.status = 'Not Completed';
  }
  
  static fromObject(obj) {
    return new Order(obj.customerName, obj.pancakeType, obj.toppings, obj.extras, obj.totalPrice);
  }

  markAsCompleted() {
    this.status = 'Completed';
  }
}

const form = document.querySelector('.form-container');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const typeSelect = document.querySelector('#type');
const button = document.querySelector('button');

let total;
let topping = [];
let extras = [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

const pancakePriceCalc = () => {
  const totalPriceElement = document.querySelector('#totalPrice');
  const priceBanner = document.querySelector('.price-banner');

  total = parseInt(typeSelect.value);
  toppings = [];
  extras = [];

  checkboxes.forEach((item) => {
    if (item.checked) {
      if (item.dataset.category === 'toppings') {
        toppings.push(item.dataset.name);
        total += parseInt(1);

      } else {
        extras.push(item.dataset.name);
        total += parseInt(item.value);

      }
    }
  });
  console.log(total);
  totalPriceElement.textContent = `${total}€`;

  priceBanner.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    {
      duration: 100,
      iterations: 1
    }
  );
};

const displayOrder = () => {
  const customerName = document.querySelector('#customerName').value;
  if (!customerName) {
    alert('Please enter your name');
    return;
  }

  const orderType = document.querySelector('#order_type');
  const orderToppings = document.querySelector('#order_toppings');
  const orderExtras = document.querySelector('#order_extras');
  const orderName = document.querySelector('#order_name');
  const orderPrice = document.querySelector('#order_price');

  orderType.textContent = typeSelect.selectedOptions[0].text;
  orderToppings.textContent = toppings.join(', ');
  orderExtras.textContent = extras.join(', ');
  orderName.textContent = customerName;
  orderPrice.textContent = `${total}€`;

  const newOrder = new Order(customerName, typeSelect.selectedOptions[0].text, toppings, extras, total);
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
};

form.addEventListener('change', pancakePriceCalc);
button.addEventListener('click', displayOrder);

pancakePriceCalc();
