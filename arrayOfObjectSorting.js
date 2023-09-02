const products = [
    {
        name: 'laptop',
        price: 1000
    },
    {
        name: 'desktop',
        price: 1500
    },
    {
        name: 'phone',
        price: 500
    }
];


products.sort((a,b) => a.price-b.price);

console.log(products);
