const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const User = require('./models/user.model.js');
const Incident = require('./models/incident.model.js');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.get('/', (req,res) => {
    res.send("Backend is running......");
});


// Login API - POST request to /api/login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Avoid revealing username validity
    }

    // Validate password securely
    const isPasswordValid = user.password; 
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Generic error for security
    }

    // Login successful
    const sanitizedUser = { username: user.username };
    if(password == isPasswordValid){
      console.log("correct password");
      res.status(200).json({ message: 'Login successful', user: sanitizedUser });
    }
    else{
      console.log("incorrect password");
      res.status(200).json({ message: 'incorrect password', user: sanitizedUser });

    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // Generic error for security
  }
});


//create a new product
app.post('/api/products', async (req,res) => {
  try{
    const product  = await Product.create(req.body);
    res.status(200).json(product);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});

//create new user
app.post('/api/newuser', async (req, res) => {
  try {
    // check if username already exists
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    console.log("username already exists")

    // create if username is unique
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});


//create a new Incident
app.post('/api/newincident', async (req, res) => {
  try {
  

    // create if username is unique
    const incident = await Incident.create(req.body);
    res.status(201).json({ message: 'Incident created successfully', incident });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});



//get all inicident list
app.get('/api/incidents', async (req,res) => {
  try{
    const incidents = await Incident.find({});
    res.status(200).json(incidents);
  }
  catch (error){
    res.status(500).json({message:error.message});
  }
});




//get all product list
app.get('/api/products', async (req,res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }
  catch (error){
    res.status(500).json({message:error.message});
  }
});

//get all user list
app.get('/api/users', async (req,res) => {
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }
  catch (error){
    res.status(500).json({message:error.message});
  }
});





//get specified product 
app.get('/api/product/:id', async (req,res) => {
  try{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  }
  catch (error){
    res.status(500).json({message:error.message});
  }
});

//get one user detail
app.post('/api/getuserdetails', async (req, res) => {
  try {
    const { username } = req.body;

    // Find user by username
    const users = await User.find({});
    const user = users.find(user => user.username === username);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Use 404 for not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get user id by username
app.post('/api/getUserIdByUsername', async (req, res) => {
  try {
    const { username } = req.body;

    // Find user by username
    const users = await User.find({});
    const user = users.find(user => user.username === username);

    if (user) {
      res.status(200).json( user);
    } else {
      res.status(404).json({ message: 'User not found' }); // Use 404 for not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//update a product
app.put('/api/product/:id', async (req,res) => {
  try{
    const{id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);
    if(!product){
      return res.status(404).json({message: "Product not found!"});
    }

    const updatedProduct = await Product.findById(id);
    res.status(202).json(updatedProduct);
  }
  catch(error){
  res.status(500).json({message:error.message});
   
  }
});
//upatate user deatils
app.put('/api/updateuser/:id', async (req, res) => {
  try {
    const { id } = req.params; 
       const { username } = req.body; 

    // check if username already exists
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: id } }); // Exclude current user

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // update user 
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }); // Return updated user

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Delete a product
app.delete("/api/product/:id",async (req,res) => {
  try{
    const{id} = req.params;
    const product  = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({
      message:"Product deleted successfully"
    });
  }
  catch(error){
    res.status(500).json({message:error.message});
     
    }
});

//Delete a User

app.delete("/api/users/:id",async (req,res) => {
  try{
    const{id} = req.params;
    const user  = await User.findByIdAndDelete(id);

    if(!user){
      return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({
      message:"User deleted successfully"
    });
  }
  catch(error){
    res.status(500).json({message:error.message});
     
    }
});

//get all incidents by specific caller 
app.get('/api/incidents/:createdBy', async (req, res) => {
  try {
    const { createdBy} = req.params;

    // Find all incidents where caller matches the provided caller name

    if(createdBy == "admin123"){
      const incidents = await Incident.find({});
      res.status(200).json(incidents);
    }
    else{
      const incidents = await Incident.find({ CreatedBy: createdBy });
      res.status(200).json(incidents);
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





mongoose.connect(
  'mongodb+srv://devanshw2004:951LaYrdHtd3VWe2@cluster0.iwgbypo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
    // Handle the connection error here, for example:
    // - Exit the process
    // - Retry the connection after some delay
    process.exit(1);
  });


  //delete an incident

  app.delete("/api/incidentdel/:id",async (req,res) => {
    try{
      const{id} = req.params;
      const incident  = await Incident.findByIdAndDelete(id);
  
      if(!incident){
        return res.status(404).json({message:"incident not found"});
      }
      res.status(200).json({
        message:"incident deleted successfully"
      });
    }
    catch(error){
      res.status(500).json({message:error.message});
       
      }
  });

  //delete all incidents

  app.delete("/api/incidentdelall",async (req,res) => {
    try{
      const incident  = await Incident.find({});
  
      if(!incident){
        return res.status(404).json({message:"incident not found"});
      }
      res.status(200).json({
        message:"All incident deleted successfully"
      });
    }
    catch(error){
      res.status(500).json({message:error.message});
       
      }


      
  });
  