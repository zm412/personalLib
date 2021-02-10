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
      let title = req.body.title;
      if(title){
        models.Library.create({ title })      
          .then(book => res.json({ _id: book._id, title: book.title }))
          .catch(err => console.log(err, 'err'))
      
      }else{
          res.send('missing required field title')
      }

      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(comment){
        //Post.aggregate([{$match: {postId: 5}}, {$project: {upvotes: {$size: '$upvotes'}}}])
        //models.Library.findOneAndUpdate({_id: bookid}, {$push: {comments: comment}, commentcount: ++commentcount})
        //models.Library.aggregate([{ $match: {_id: bookid} }, {$project: { commentcount: {$size: 'comments'} }} ])
        //{ $project: { value: { count: { $size: "$orders_ids" }, qty: "$qty", avg: { $divide: [ "$qty", { $size: "$orders_ids" } ] } } } },
        models.Library.findOneAndUpdate({_id: bookid},  {$push: {comments: comment}, $inc : { commentcount : 1, __v: 1 } },{       returnOriginal: false } )
        //models.Library.findOneAndUpdate({_id: bookid},  {$set: {: comment} } )
          .then(foundBook => {
            console.log(foundBook, 'foundbook')
            res.json(foundBook) 
          })
          .catch(err => console.log(err, 'err'))
      }
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
