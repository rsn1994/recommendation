// include our new controller
var Joi = require('joi');
const db = require('../database.js');
exports.register = function(server,options,next)

{


   server.route([{

           method: 'POST',

           path:   '/update',

           config: {

                  tags : ['api'], // let it be here for now. I will explain it later in this blog
		auth:false,
               // We use Joi plugin to validate request
	validate: {
        payload: {
	    email: Joi.string().email().required(), 
            qualification: Joi.string().required(),
	    address: Joi.string().required(), 
	    school: Joi.string().required(),
            city: Joi.string().required()
        },
headers: Joi.object({
 'authorization': Joi.string().required()
				    }).unknown()
    },
              
           },

            handler: function (request, reply) {
        
	var post=request.payload;
	 db.connection.query('INSERT INTO profile set ?',post, function(err, rows,   fields) {
        if (err) { reply({status:"error occured"}).code(402);
throw err;}
 	else
reply({status:"successfully updated"}).code(202);
 
  
});
    }
   }]);

   next();

};

exports.register.attributes = {

   name    :'update-route',

   version : '0.0.1'

};
