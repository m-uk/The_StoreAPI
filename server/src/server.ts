import express from "express";
import {
  client,
  createFavorite,
  createProduct,
  createTables,
  createUser,
  fetchFavorites,
  fetchProducts,
  fetchUsers,
} from "./db";
import { Product, User } from "./types";

const app = express();
app.use(express.json());

const init = async () => {
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected successfully");

  await createTables();
  console.log("Created tables");

  const [Liam, Nora, Evan, Maya]: User[] = await Promise.all([
    createUser({ username: "Liam", password: "Liam123" }),
    createUser({ username: "Nora", password: "Nora5678" }),
    createUser({ username: "Evan", password: "Evan999" }),
    createUser({ username: "Maya", password: "Maya2024" }),
  ]);
  const [Milk, Eggs, Rice, Pasta, Beef, Beans, Chips, Bread]: Product[] =
    await Promise.all([
      createProduct({ name: "Milk" }),
      createProduct({ name: "Eggs" }),
      createProduct({ name: "Rice" }),
      createProduct({ name: "Pasta" }),
      createProduct({ name: "Beef" }),
      createProduct({ name: "Beans" }),
      createProduct({ name: "Chips" }),
      createProduct({ name: "Bread" }),
    ]);

  console.log("Created users and products");
  console.log(await fetchUsers());
  console.log(await fetchProducts());

  await Promise.all([
    createFavorite(Milk.id!, Liam.id!),
    createFavorite(Bread.id!, Maya.id!),
    createFavorite(Beef.id!, Evan.id!),
    createFavorite(Rice.id!, Nora.id!),
    createFavorite(Beans.id!, Nora.id!),
  ]);
  console.log("Created some favorites");
  console.log(
    "Liam's favorites: " + JSON.stringify(await fetchFavorites(Liam.id!))
  );
  console.log(
    "Nora's favorites: " + JSON.stringify(await fetchFavorites(Nora.id!))
  );
};

init();
