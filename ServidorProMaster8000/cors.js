function AllowCrossDomain()
{
    this.permissions = function(request,response,next)
    {
        response.header('Access-Control-Allow-Origin','*');
        response.header('Access-Control-Allow-Headers', 'Content-Type');
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        next();
    }
}

module.exports= new AllowCrossDomain();