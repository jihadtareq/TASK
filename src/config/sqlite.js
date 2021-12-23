const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../Shop.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

db.serialize(function () {
    // db.all("select name from sqlite_master where type='table'", function (err, tables) {
    //     console.log(tables);
    // });
    // db.each("select * from invoice_items ", function (err, datat) {
    //     console.log(datat);
    // });
    // db.each("select * from invoices ", function (err, datat) {
    //     console.log(datat);
    // });
 
    db.each(`CREATE VIEW Sales 
    AS
    SELECT
        CustomerId,
        FirstName,
        LastName,
        country,
        SUM( total ) Amount 
    FROM
        invoices 
        INNER JOIN customers USING (CustomerId)
    GROUP BY
        CustomerId;`)

    db.each("select * from Sales ", function (err, datat) {
        console.log(datat);
    });

    db.each(`SELECT 
                Country,
                FirstName,
                LastName,
                Amount
            FROM (
                SELECT 
                    Country, 
                    FirstName,
                    LastName,
                    Amount,
                    ROW_NUMBER() OVER (
                        PARTITION BY country 
                        ORDER BY Amount DESC
                    ) RowNum
                FROM 
                    Sales )
            WHERE
                RowNum = 1;`)
});

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });