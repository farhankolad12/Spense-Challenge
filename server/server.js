require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

const app = express();

// Routes
const authRouter = require("./routes/auth/index");
const brandRouter = require("./routes/brand/index");
const accountRouter = require("./routes/account/index");
const categoryRouter = require("./routes/category/index");
const productsRouter = require("./routes/products/index");
const adminAccountRouter = require("./routes/adminAccount/index");
const attributesRouter = require("./routes/attributes/index");
const vendorsRouter = require("./routes/vendors/index");
const couponsRouter = require("./routes/coupons/index");
const ordersRouter = require("./routes/orders/index");
const notificationsRouter = require("./routes/notifications/index");
const homeSettingsRouter = require("./routes/homeSettings/index");
const superAdminsRouter = require("./routes/superAdmins/index");
const cmsPagesRouter = require("./routes/cmsPages/index");
const newsLetterSubscriptionRouter = require("./routes/newsLetterSubscription/index");
const reviewRouter = require("./routes/reviews/index");
const goldCoinWalletRouter = require("./routes/wallets/index");

app.use(express.json());
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandRouter);
app.use("/attributes", attributesRouter);
app.use("/admin-account", adminAccountRouter);
app.use("/products", productsRouter);
app.use("/vendors", vendorsRouter);
app.use("/coupons", couponsRouter);
app.use("/orders", ordersRouter);
app.use("/notifications", notificationsRouter);
app.use("/home-settings", homeSettingsRouter);
app.use("/super-admins", superAdminsRouter);
app.use("/cms-page", cmsPagesRouter);
app.use("/newsletter", newsLetterSubscriptionRouter);
app.use("/reviews", reviewRouter);
app.use("/wallets", goldCoinWalletRouter);

app.use("/public", express.static(__dirname + "/public/"));

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("DB Connected");
});

app.listen(4000, () => {
  console.log(`Server started at ${4000}`);
});
