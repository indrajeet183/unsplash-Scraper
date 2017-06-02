const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const unirest = require('unirest');
const config = require('../config/app');
var BEARER_TOKEN;



/**
 * Route for Oauth which will redirect to the CALLBACK_URI with code as query parameter
 */
router.get('/oauth',(req,res,next) =>{
    const scope = "public";
    const uri = config.AUTH_URI;
    let query_param = querystring.stringify({               //setting the query params
        client_id: config.CLIENT_ID,
        redirect_uri: config.CALLBACK_URI,
        response_type: "code",
        scope: scope
    });
    //console.log(`${uri}?${query_param}`);
    res.send({success: true,link:`${uri}?${query_param}`}); //on success send this json with link
});

/**
 * Route for generating Bearer token by using code
 */
router.get('/code',(req,res,next) => {
    //console.log(req.query.code);
    //res.redirect("http://localhost:3000");
    let c = req.query.code;                         //get code form url parameter

    //POST request for generating Bearer token which is used for access
    unirest.post('http://unsplash.com/oauth/token')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .query({
        "client_id":"a6e10e69c9222a2d57706866d93587b86640911b597e5d8acbd4fdc5350bd4c9",
        "client_secret":"979dbecaf1e807bd764d6e1b6e2c63504e41fc4bcccbd412e87709f199c16786",
        "redirect_uri":"http://localhost:3000/users/code",
        "grant_type":"authorization_code",
        "code":c
    })
    .end(function (response) {
        //console.log(response.body.access_token);
        BEARER_TOKEN = response.body.access_token;                 
        //re.send(BEARER_TOKEN);
    });
});


/**
 * Route for searching query which contains query and page number as query param
 */
router.get('/search',(req,res,next)=>{
    unirest.get(`${config.API_URL}/search/users`)
    .headers({'Authorization':`Bearer ${BEARER_TOKEN}`})    //set Header for access token
    .query({
        query:req.query.qry,
        page:req.query.page,
    }).end(function(response){
        //console.log(response.body);
        res.send(response.body);
    });
});

/**
 * Route for logging out and clearing access token 
 */
router.get('/logout',(req,res,next) =>{
    res.send({success:true,msg:"Logged out Succesfull"})
})
module.exports = router;