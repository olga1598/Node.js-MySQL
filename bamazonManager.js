
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

//Function that refers to another function depending on user choice.
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
            addInventory();
            break;
        case "Add New Product":
            //console.log("In the addNewProduct function");
            addNewProduct();
            break;
    }
};

//Display the whole available list of items for sale
function viewProduct() {
    connection.query("SELECT * FROM products", function(err,res) {
        console.log("------------------------------");
        console.log("Here is the whole list of item that are available for purchase:");
        console.log("------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);

        };
        console.log("------------------------------");
        console.log("What else do you want to check out?");
        console.log("------------------------------");
        start();

    });
};

//Checking what items has the stock quantity less then 5
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
        console.log("Do you want to check out something else?");
        console.log("------------------------------");
        start();
    });
};

//Add to existing inventory more 
function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {

    console.log("Please enter the ID of the item that you want to add more");
    console.log("------------------------------");
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);

    };
    console.log("------------------------------");

    inquirer.prompt ([
        {
            type: "input",
            name: "pickItemID",
            message: "Please enter the ID of the item that you want to add more"
        },
        {
            type: "input",
            name: "addMoreID",
            message: "Please enter the quantity you want to add more"
        },

    ]).then(function(answer) {
        //console.log(answer.addMoreID);
        var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?";
        connection.query(query, {id: answer.pickItemID}, function(err,res) {
            // console.log(answer.pickItemID);
            // console.log(res);
            // console.log(res[0].stock_quantity);
            console.log("------------------------------");
            console.log("The product you've picked: " + res[0].id + " | " + res[0].product_name + " | " + res[0].stock_quantity);
            console.log("------------------------------");
        })
        connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: parseInt(answer.addMoreID) + (res[parseInt(answer.pickItemID) - 1]).stock_quantity
            },
            { 
                id: answer.pickItemID
            }
        ], function(error) {
            if (error) throw err;
            console.log("stock quantity have been updated");
        });
        connection.query("SELECT * FROM products", function(err,res) {
            console.log("------------------------------");
            console.log("The updated quantity of | " + (res[answer.pickItemID - 1]).product_name + " | is | " + (res[answer.pickItemID - 1]).stock_quantity);
            console.log("------------------------------");
            //console.log(res[answer.pickItemID - 1]);
            console.log("==============================");
            start();
        });
    });
    });
};

//We are going to add a new product to our list of products
function addNewProduct() {
    inquirer.prompt ([
        {
            type: "input",
            message: "What is the name of the new product?",
            name: "productname"
        },
        {
            tepe: "input",
            message: "What department do you want to put it in?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price for one piece of your new item in $?",
            name: "price"
        },
        {
            type: "input",
            message: "How many pieces of your new item will be available for sale?",
            name: "quantity"
        }
    ]).then(function(answer) {
        console.log("You've entered: " + answer.productname + " | " + answer.department + " | " + answer.price + " | " + answer.quantity);
        
        //we add all the info to our table
        connection.query("INSERT INTO products SET ?",
        {
            product_name: answer.productname,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }, function(err) {
            if (err) throw err;
            console.log(" product inserted!\n");
            viewProduct();
        });
    })
};

//==============================================================




















