const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Prints" },

  ]);

  console.log("categories seeded");

  await Product.deleteMany();

    const products = await Product.insertMany([
        {
        name: '8x10',
        description:
            'Treat your kitty to a whisker-licking flavor with BLUE Tastefuls Adult Cat Ocean Fish and Tuna Entrée Pate wet cat food.',
        image: 'acorn_woodpecker.jpeg',
        category: categories[0]._id,
        price: 25,
        quantity: 500
        }
    ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "John",
    lastName: "Smith",
    email: "john@test.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[0]._id],
      },
    ],
  });

  await User.create({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@test.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
