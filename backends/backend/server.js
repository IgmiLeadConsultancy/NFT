const express = require("express");
const dotenv = require("dotenv");
require("./config/db.js");
const favicon = require("serve-favicon");
const path = require("path");



const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With Content-Type , Accept , Authorization"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PATCH",
    "DELETE",
  );
  next();
});



// ***********Importing Post Routes*********** //
const UserRegister = require('./routes/users.js')
const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/category");
const aboutusRoute = require("./routes/aboutus");
const adminPolicyRoute = require("./routes/adminPolicy");
const faqsRoute = require("./routes/FAQs");
const ContactUsRoutes = require("./routes/contactUs");
const privacyPolicyRoutes = require("./routes/privacy-policy");
const tncRoutes = require("./routes/tnc");
const nfts = require("./routes/nfts");
const emails = require("./routes/email");
const sliders = require("./routes/sliders");
const contents = require('./routes/contents');
const addUsersRoute = require('./routes/addUsers');
const updateUsers = require('./routes/updateUsers');
const deleteUsers = require("./routes/DeleteUsers");
const suspendedUsers = require('./routes/SuspendUsers');
const updateCategories = require('./routes/updateCategory');
const deleteCategories = require('./routes/deleteCategories');
const deleteProducts = require("./routes/deleteProducts");
const activateUsers = require('./routes/ActiveUser')
const activateEmails = require('./routes/ActiveEmails');
const generalSettingsRoute = require('./routes/GeneralSettings');
const updateProducts = require('./routes/updateProducts');
const addYourOwnProduct = require('./routes/addYourOwnProduct');
const addWallets = require('./routes/addWallets.js');
const wwalletEdit=require('./routes/updateWallet.js');
const wwalletDelete=require('./routes/deleteWallets.js');
const currencyAdd=require('./routes/addCurrencies.js');
const currencyUpdate=require('./routes/updateCurrencies.js');
const currencyDelete=require("./routes/deleteCurrencies.js");
const deleteSlider=require('./routes/deleteSliderImages.js');
const updateSliders = require('./routes/updateSliders.js')
// ********Importing of Post Routes Ends Here************ //


// ************Using Post Routes************ //

app.use("/users", require("./routes/auth"));
app.use(UserRegister);
app.use(productsRoute);
app.use(categoriesRoute);
app.use(aboutusRoute);
app.use(adminPolicyRoute);
app.use(faqsRoute);
app.use(ContactUsRoutes);
app.use(privacyPolicyRoutes);
app.use(tncRoutes);
app.use(nfts);
app.use(emails);
app.use(sliders);
app.use(contents);
app.use(addUsersRoute);
app.use(updateUsers);
app.use(deleteUsers);
app.use(suspendedUsers);
app.use(updateCategories);
app.use(deleteCategories);
app.use(deleteProducts);
app.use(activateUsers);
app.use(activateEmails);
app.use(generalSettingsRoute);
app.use(updateProducts)
app.use(addYourOwnProduct);
app.use(addWallets);
app.use(wwalletEdit);
app.use(wwalletDelete);
app.use(currencyAdd);
app.use(currencyUpdate);
app.use(currencyDelete);
app.use(deleteSlider);
app.use(updateSliders);
// app.use(newsRoute);
// ******** Post Routes End*********** //

// **************Using Fetch Routes*********** //
const fetchApi = require('./fetchRoutes/FetchApi');

app.use(fetchApi);

// **********End of Fetch Routes************** //





// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`Server running in mode on port ${PORT}`));
