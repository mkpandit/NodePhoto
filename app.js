var express = require( 'express' );
var app = express();
var MongoClient = require( 'mongodb' ).MongoClient;
var dbUrl = 'mongodb://localhost:27017';

var port = process.env.PORT || 3090;
var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( function( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    
    if( req.method === "OPTIONS" ) {
        res.header( "Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET" );
        return res.status( 200 ).json( {} );
    }
    next();
} );

app.set( 'view engine', 'ejs');

app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));

var apiRoutes = require( './api/router' );
app.use( '/api', apiRoutes );

app.get( '/', ( req, res, next ) => {
    MongoClient.connect( dbUrl, ( dberr, client ) => {
        var perpage = 4;
        var page = req.params.page || 1;
        if( dberr) {
            console.log( dberr );
        } else {
            var db = client.db( 'nodealbum' );
            db.collection( 'singleimages' ).find( {} )
            //.skip( ( perpage * page ) - perpage ).limit( perpage )
            .toArray( function( err, result ) {
                if( err ) {
                    res.json( err );
                } else {
                    //console.log( result.length );
                    //res.status( 200 ).json( { 'data': result } );
                    res.render( 'index', { title: 'File API', 'data': result } );
                }
            } );
        }
    } );
} );

app.get( '/add', ( req, res, next ) => {
    res.render( 'add', { title: 'File API' } )
} );

app.listen( port, function() {
    console.log( 'Application running on port ' + port ); 
} )