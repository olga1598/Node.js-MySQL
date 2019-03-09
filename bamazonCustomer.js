
//====================================================================
//#1 Challenge. Customer VIEW (Minimun Requirement)

var mysql = require ("mysql");
var inquirer = require ("inquirer");


//We create the connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Pogran13!",
    database: "bamazon_db"
  });

//Doing the connection to see if we connect properly
//Connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("=====================================");
  });

//We display all of the items that are available for sale
// query the database for all items being auctioned
connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
    }
    console.log("=====================================");
    //connection.end();
    runInquirer();
});

// function which prompts the user to pick the id of the item he whats to buy and its quantity
function runInquirer() {
    inquirer.prompt ([
        {
            type: "input",
            name: "productId",
            message: "What is the ID of the product they would like to buy?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units of the product they would like to buy?"
        }
    ]).then(function(answer) {
        console.log("Quantity: " + answer.quantity);
        console.log("ID: " + answer.productId);
        

        connection.query("SELECT * FROM products", function(err, res) {
            //Setting up the variable for the user's chosen ID of the product
            var chosenProductID = res[answer.productId - 1];
            //Setting up the variable for updated quatrity of the sold product
            var updatedQuantity = chosenProductID.stock_quantity - answer.quantity;
            console.log("The product you've chose is: ")
            console.log(chosenProductID);
            // console.log(chosenProductID.price);
            // console.log(chosenProductID.product_name);

            //Checking up if we have enough quantity of the item for sale
            if (answer.quantity <= (chosenProductID.stock_quantity - answer.quantity)) {
                console.log("SOLD");

                //Setting up the variable for total cost from sale perchase
                var totalCostPurchase = answer.quantity * (chosenProductID.price);
                console.log("Here is the total cost of your purchase of " + chosenProductID.product_name + " : $" + totalCostPurchase);

            //Updating the SQL database to reflect the remaining quatnity of item when it SOLD
            function soldItem() {
                connection.query(            
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: updatedQuantity
                        },
                        {
                            id: answer.productId
                        }
                    ],
                    function(error) {
                    if (error) throw err;
                    console.log("The SQL database quantity of the item is updated!");
                    }
                );
            }
            soldItem();
            }
            else {
                console.log("Insufficient quantity! We don't have enough in stock. Enter another quantity please.");
                runInquirer();
            }
        });
    })
};

// the end of the first challenge.
//===========================================================================




  