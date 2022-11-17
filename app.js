const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const productcontroller = require('./Controllers/productcontroller');
const { populate } = require('./Models/product');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    } 
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetyep === 'image/png')
    {
        cb(null, true);
    }
    else
    {
        cb(null, false)
    }
};

const upload = multer({storage : storage, fileFilter : fileFilter});

app.use(express.static('uploads'));
app.use(express.urlencoded ({ extended:false}));
app.use(express.json());
app.set('view engine','ejs');

mongoose.connect(config.database, {useNewUrlParser: true},(err)=>{
    if(err)
    {
        console.log("Connection Failed",err);
    }
    else
    {
        console.log('Database Connected');
    }
});

app.get('/', productcontroller.show_product);

app.get('/addproduct',productcontroller.add_product_page);
app.post('/product', upload.single('image'), productcontroller.add_product);



app.listen(8080,() => {
    console.log('Server Started at port 8080');
});