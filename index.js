const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db/index");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const roleRouter = require("./routers/routes/role");
const userRoute = require("./routers/routes/user");
const mediclRouter = require("./routers/routes/doctor");
const filemodelRouter = require("./routers/routes/medicalfile");
const statusRouter = require("./routers/routes/status");

app.use(roleRouter);
app.use(userRoute);
app.use(mediclRouter);
app.use(filemodelRouter);
app.use(statusRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});