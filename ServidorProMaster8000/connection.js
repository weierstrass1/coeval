var mysql = require('mysql');
//importante
function conection()
{
    this.pool = null;

    this.init = function()
    {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'duocuc',
            password: 'duocuc2018',
            database: 'coevalsystem',
            multipleStatements: true,
        });
    }

    this.obtain = function(callback)
    {
        this.pool.getConnection(function(error,connection)
        {
            callback(error,connection);
        })
    }
}

module.exports = new conection();