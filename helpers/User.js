'use-strict';

module.exports=function(){

return {
    SignUpValidation:(req,res,next)=>{
      req.checkBody('username','User name is required').notEmpty();
      req.checkBody('username', 'User name must be 2 character long').isLength({min:2});
      req.checkBody('email','Email  is required').notEmpty();
      req.checkBody('email','Email is invalid').isEmail();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('username','Password must be 5 characters long').isLength({min:5});

      req.getValidationResult()
        .then((result)=>{
            const errors = result.array();
            const messages =[];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
        req.flash('error',messages);
        res.redirect('/signup');
        })
        .catch((err)=>{
            return next();
        })
    },
}
}