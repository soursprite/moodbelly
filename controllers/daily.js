const Daily = require('../models/daily')
//const Main = require('js/main')

// method to create comment stamped with user id
// delete comment that belongs to user id
// edit comment that belong to user id


module.exports = {

    getDays: async (req,res)=>{ //pulls up post objs
        //console.log(req.user)
        console.log("LOOKATME"+req.user.id)
        try{
            const dailyPosts = await Daily.find({ userId: req.user.id }) //grab all objects
            //maybe we need to cap how many results we get to a reasonable number
            //const itemsLeft = await Comments.countDocuments({userId:req.user.id,completed: false}) //we dont need this
            //res.render('../public/js/main.js', {comments: commentsItems, currentUserId: req.user.id})
            //res.status(200).send('/js/main.js', {comments: "test"})
            //this.dataDump(commentItems)
            res.render('feed.ejs', {dailyPosts: dailyPosts, currentUser: req.user})
        }catch(err){
            console.log(err)
        }
    },

    getDayData: async (req,res)=>{ //pulls up post objs
        console.log(req.user)
        console.log("request made")
        try{
            const dailyPosts = await Daily.find({ userId: req.user.id })
            dailyPosts.reverse();
            res.json(dailyPosts);
        }catch(err){
            console.log(err)
        }
    },

    postDaily: async (req, res)=>{
        try{
            await Daily.create({meat: req.body.meat, veg: req.body.veg, starch: req.body.starch, water: req.body.water, mood: req.body.mood, description: req.body.description, userId: req.user.id, timeStamp: Date.now()}) //adds obj to mongo with userid
            console.log('Feed has been updated!')
            console.log(Date.now())
            res.redirect('/feed')
        }catch(err){
            console.log(err)
        }
    },

    deleteDay: async (req, res)=>{
        console.log(req.params.id)
        try{
            res.redirect('/feed');
            await Daily.findOneAndDelete({_id:req.params.id});
            console.log('Deleted Post');
            res.json('Deleted It');
        }catch(err){
            console.log("It screwed up here")
            console.log(err)
        }
    }
}    



    // markComplete: async (req, res)=>{
    //     try{
    //         await Comments.findOneAndUpdate({_id:req.body.commentsIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Comments.findOneAndUpdate({_id:req.body.commentsIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },

        /*
    getComments: async (req,res)=>{ //pulls up comments objs
        console.log(req.user)
        try{
            const commentsItems = await Comments.find({userId:req.user.id}) //grabs objects with matching user id
            //maybe we need to cap how many results we get to a reasonable number
            const itemsLeft = await Comments.countDocuments({userId:req.user.id,completed: false})
            res.render('comments.ejs', {comments: commentsItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    */