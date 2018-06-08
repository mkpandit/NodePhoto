var express = require( 'express' );
var jimp = require( 'jimp' );
var MongoClient = require( 'mongodb' ).MongoClient;
var dbUrl = 'mongodb://localhost:27017';

var multer = require( 'multer' );
var router = express.Router();

router.get( '/', function( req, res, next ) {
    MongoClient.connect( dbUrl, ( dberr, client ) => {
        var db = client.db( 'nodealbum' );
        db.collection( 'singleimages' ).find().toArray( function( err, result ) {
            if( err ) {
                console.log( err );
                res.json( err );
            } else {
                //console.log( result );
                res.status( 200 ).json( { 'data': result } );
            }
        } );
    } );
} );

var storage = multer.diskStorage( {
    destination: (req, file, cb ) => {
        cb( null, 'uploads/images' );
    },
    filename: (req, file, cb ) => {
        cb( null, Date.now() + '_' + file.originalname );
    }
} );

var upload = multer( { 
    storage: storage 
} );

router.post( '/add', upload.array( 'imageFile', 5 ), ( req, res, next) => {
    fileReturns = req.files;
    var pathArray = [];
    for( var i = 0; i < fileReturns.length; i++  ) {
        /*
        jimp.read( fileReturns[i].path ).then( function( data ) {
            return data.crop( 0, 0, 200, 200 ).write( 'thumbnail/' + fileReturns[i].name  );
        } ).catch( function( err) {
            console.log( err );
        } );
        */
        pathArray.push( fileReturns[i].path );
    }
    MongoClient.connect( dbUrl, ( dberr, client ) => {
        if( dberr ){
            console.log( dberr );
        } else {
            var db = client.db('nodealbum');
            var document = { 
                imagetitle: req.body.imagetitle, 
                imagetag: req.body.imagetag, 
                imagedescription: 
                req.body.imagedescription, 
                imagepath: pathArray 
            };
            db.collection( 'singleimages' ).insertOne( document, function( err, result ) {
                if( err ) {
                    console.log( err );
                    res.json( { 'message': 'File uploaded failed' } );
                } else {
                    //console.log( document );
                    res.json( { 'message': 'File uploaded successfully', 'pathArray': pathArray, 'fileCount': pathArray.length } );
                }
            } );
        }
    } );
} );

module.exports = router;