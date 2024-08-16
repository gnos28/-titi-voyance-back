import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    // origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    origin: "*",
    credentials: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// CRUD API routes
const router = express.Router();

import getAgenda from "./routes/getAgendaRouter";
import storePurchase from "./routes/storePurchaseRouter";
import getPrestations from "./routes/getPrestationsRouter";
import createCheckoutSession from "./routes/createCheckoutSessionRouter";
import { sheetAPI } from "gnos";

router.use("/getAgenda", getAgenda);
router.use("/getPrestations", getPrestations);
router.use("/storePurchase", storePurchase);
router.use("/create-checkout-session", createCheckoutSession);

router.get("/test", async (_req, res) => {
  await sheetAPI.appendToSheet({
    sheetId: "1Th4FnXGA-kHQc3Sz9ZIv5Qgzhq-ilLxV5FvXRzwmjVY",
    tabName: "FROM_WEB",
    data: [
      {
        id: 1,
        email_adress: "vignos@free.fr",
        date: "2024-08-18T17:38:27.000Z",
        hour: "11:00",
        telephone: "0688928786",
        create_time: "2024-08-16T17:39:04Z",
        instagram: "OLAOLAOLA INSTA",
        whatsapp: "121221",
        prestationDuration: 30,
        prestationPrice: 1,
        payer_name: "Julien",
        purchasedAmount: "1.00",
        purchasedCurrency: "EUR",
        prestationName: "TEST",
        status: "COMPLETED",
        payer_id: "KD4VDC38A4B86",
        prenom: "Julien",
        nom: "VIGNERON",
        address:
          '{"address_line_1":"30 rue de Sully","admin_area_2":"Nogent-le-Rotrou","postal_code":"28400","country_code":"FR"}',
      },
    ],
  });

  res.sendStatus(201);
});

app.use("/api", router);

export default app;
