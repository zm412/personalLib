/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const models = require('../models');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      models.Library.find({})
        .then(books => res.json(books))
        .catch(err => console.log(err, 'err'))
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      console.log(req.body, 'reqBodyPostTitle')
      let title = req.body.title;
      console.log(title, 'title')
      if(title){
        models.Library.create({ title })      
          .then(book => res.json({ _id: book._id, title: book.title }))
          .catch(err => console.log(err, 'err'))
      
      }else{
        console.log('hello')
          res.send('missing required field title')
      }

      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      models.Library.deleteMany({})
        .then(docs => {
           console.log(docs, 'deletedAll')
           res.send('complete delete successful')
        })

        .catch(err => console.log(err, 'errDeleteAll'))
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      models.Library.find({_id: bookid})
        .then(book => {
          console.log(book[0], 'book');
            if(book.length > 0){
              res.json(book[0])
            }else{
              res.send('no book exists')
            }
        })
        .catch(err => res.send('no book exists'))
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      console.log(req.body, 'reqBody')
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(comment){
        models.Library.findOneAndUpdate({_id: bookid},  {$push: {comments: comment}, $inc : { commentcount : 1, __v: 1 } },{       returnOriginal: false } )
          .then(foundBook => {
            if(foundBook){
              console.log(foundBook, 'foundbook')
              res.json(foundBook) 
            }else{
              res.send('no book exists')
            }
          })
          .catch(err => {
            res.send('no book exists')
          })
      }else{
        res.send('missing required field comment')
      }
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      models.Library.deleteOne({_id: bookid})
        .then(doc => {
          console.log(doc, 'doc')
          if(doc.deletedCount === 1){
            res.send('delete successful')
          }else{
            res.send('no book exists')
          }
        })
        .catch(err => res.send('no book exists'))
      
      //if successful response will be 'delete successful'
    });
  
};
