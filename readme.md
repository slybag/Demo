Demonstration app

Installation (Unix based systems)
---

Install Yeoman globally (it's containing Grunt, Bower, etc.. see http://yeoman.io/):

    npm install -g yo
       
After clone of this repo - run 
  
    npm install
    bower install

Launching
---

Launching the client is based on the using Grunt tool (which is the part of the Yeoman tools)
    
    sudo grunt serve
   

SQL Task
---    
    
1.

SELECT Product.id, Product.name, COUNT(*) FROM Sale JOIN Product WHERE Sale.product_id=Product.id AND Sale.time > NOW() - INTERVAL 1 MONTH GROUP BY Sale.product_id;

2.

SELECT Product.id, Product.name FROM Product JOIN Sale JOIN Customer WHERE Product.id=Sale.product_id AND Customer.id=Sale.customer_id AND Sale.time=MAX(Sale.time) GROUP BY Sale.product_id;    

