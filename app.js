const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect("mongodb://127.0.0.1:27017/bookDB")



const bookSchema = mongoose.Schema({
    bookname: String,
    authorname: String,
    price: Number
});



const Book = mongoose.model("Book", bookSchema);



app.get("/", (req, res) => {
    res.send("Home Route");
});



app.get("/add", async (req, res) => {

    const bookdata = new Book({
        bookname: req.query.bookname,
        authorname: req.query.authorname,
        price: req.query.price
    });

    await bookdata.save();

    res.json({
        msg: "Added",
        data: bookdata
    });

});



app.get("/show/:bookname", async (req, res) => {
    

    const bookdata = await Book.findOne({
        bookname: req.params.bookname
    });

    res.json({
        msg: "Book",
        data: bookdata
    });

});



app.get("/delete/:bookname", async (req, res) => {

    const bookdata = await Book.deleteOne({
        bookname: req.params.bookname
    });

    res.json({
        msg: "Deleted",
        data: bookdata
    });

});



app.get("/update/:bookname", async (req, res) => {

    const bookdata = await Book.updateOne(
        {
            bookname: req.params.bookname
        },
        {
            bookname: req.query.bookname,
            authorname: req.query.authorname,
            price: req.query.price
        }
    );

    res.json({
        msg: "Updated",
        data: bookdata
    });

});



app.listen(3000, () => {
    console.log("Running");
});