import knex from "knex";

//set up a db connection
const database = knex({
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: "./mydb.sqlite",
  },
});

database.schema.hasTable("todos").then((tableExist) => {
  if (!tableExist) {
    //create a table(schema)
    database.schema
      .createTable("todos", function (table) {
        //primary key(unique ID)
        table.increments();
        //add columns with relevant data type
        table.string("title");
        table.boolean("completed");
        table.string("url");
        table.integer("order");
        //shows when created and updated each row
        table.timestamps();
      })
      .then(() => {
        console.log("table created");
      });
  }
});

export const listToDos = () => {
  return database("todos").select("*");
};
