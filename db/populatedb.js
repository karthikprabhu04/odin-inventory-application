const { Client } = require("pg");
require("dotenv").config();

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect();
  
    // Wrap everything in a transaction
  await client.query('BEGIN');

  try {
    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    // Insert categories
    await client.query(`
      INSERT INTO categories (category) VALUES
        ('Clothes'),
        ('Kitchen'),
        ('Technology'),
        ('Stationary'),
        ('Toiletries')
      ON CONFLICT (category) DO NOTHING;
    `);

    // Create items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        item VARCHAR(255) NOT NULL UNIQUE,
        category_id INTEGER NOT NULL REFERENCES categories(id)
      );
    `);

    // Insert items
    await client.query(`
      INSERT INTO items (item, category_id) VALUES
        ('Everyday clothes', 1),
        ('Suit and Gown', 1),
        ('Food', 2),
        ('Utensils', 2),
        ('Laptop', 3),
        ('Headphones', 3),
        ('Pen', 4),
        ('Paper', 4),
        ('Toothbrush and Toothpaste', 5),
        ('Soap', 5)
      ON CONFLICT (item) DO NOTHING;
    `);

    await client.query('COMMIT');
    console.log("Seeding completed successfully!");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
  }
}

main();