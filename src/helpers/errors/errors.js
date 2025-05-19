const errors = {
    client:{message:"client Error", statusCode:400},
    auth:{message:"Bad Auth", statusCode:401},
    notFound:{message:"Not Found", statusCode:404},
    forbidden:{message:"Forbidden", statusCode:403},
    fatal:{message:"Fatal Error", statusCode:500},
}

export default errors