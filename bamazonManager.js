
//====================================================================
//#2 Challenge. Manager VIEW (Next Level)

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
    start();
  });

// function which prompts the user for what action they should take
function start() {

    inquirer.prompt ([
        {
            name: "setOfMenuOptions",
            type: "list",
            message: "Please select an action from the following menu options?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      
        }
    ]).then(function(answer) {

        console.log(answer.setOfMenuOptions);
        doChoice(answer.setOfMenuOptions);
    });
};

function doChoice(options) {

    switch(options) 
    {
        case "View Products for Sale":
            //console.log("In the viewProduct function");
            viewProduct();
            break;
        case "View Low Inventory":
            //console.log("In the lowInventory function");
            lowInventory();
            break;
        case "Add to Inventory":
            //console.log("In the addInventory function");
            // addInventory();
            break;
        case "Add New Product":
            //console.log("In the addNewProduct function");
            // addNewProduct();
            break;
    }
};

function viewProduct() {
    connection.query("SELECT * FROM products", function(err,res) {
        console.log("------------------------------");
        console.log("Here is the whole list of item that are available for purchase:");
        console.log("------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);

        };
        console.log("------------------------------");

    });
};

function lowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {

        console.log("------------------------------");
        console.log("Here is the list of the low inventory items:");
        console.log("------------------------------");

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
        };
        console.log("------------------------------");
    });
};






















