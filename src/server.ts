import dotenv from "dotenv";
dotenv.config();

import server from "./index";

const PORT: number = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}!`);
});