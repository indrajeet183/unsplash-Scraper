const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const unirest = require('unirest');
const config = require('../config/app');
var BEARER_TOKEN;

router.get('/oauth',(req,res,next) =>{
    const scope = "public";
    const uri = config.AUTH_URI;
    let query_param = querystring.stringify({
        client_id: config.CLIENT_ID,
        redirect_uri: config.CALLBACK_URI,
        response_type: "code",
        scope: scope
    });
    console.log(`${uri}?${query_param}`);
    //res.redirect(`${uri}?${query_param}`);
    res.send({success: true,link:`${uri}?${query_param}`});
});

router.get('/code',(req,res,next) => {
    console.log(req.query.code);
    res.redirect("http://localhost:4200");
    let para = querystring.stringify({
        client_id:config.CLIENT_ID,
        client_secret:config.CLIENT_SECRET,
        redirect_uri:config.CALLBACK_URI,
        grant_type:'authorization_code',
        code:req.query.code

    });
    let c = req.query.code;
    //Failed to request { reason: unknown }
    /*
    let options = {
        host:'http://unsplash.com',
        port:80,
        path:`/oauth/token?${para}`,
        method:'POST',
        headers:{
            'Content-Type':'application/json','Accept': 'application/json'
        }
    }
    let request = http.request(options,(response)=>{
        console.log(response);
    });
    request.end();
    */
    console.log("para"+`${para}`);
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
    });
});

router.get('/search',(req,res,next)=>{
    console.log(req.query);
    unirest.get(`${config.API_URL}/search/users`)
    .headers({'Authorization':`Bearer ${BEARER_TOKEN}`})
    .query({
        query:req.query.qry,
        page:1
    }).end(function(response){
        console.log(response.body.results);
        res.send(response.body.results);
    });
});
module.exports = router;