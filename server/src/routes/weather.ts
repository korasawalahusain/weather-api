import express, { Request, response, Response, Router } from "express";
import axios from "axios";

const router: Router = express.Router();

router.post("/getWeather", async (req: Request, res: Response) => {
  const { cities } = req.body;

  const responses = await Promise.all(
    cities.map(async (city: any) => {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=fbf334d3e5cc4f9a94890535220409&q=${city}&aqi=no`
      );
      return {
        name: response.data.location.name,
        country: response.data.location.country,
        temp: response.data.current.temp_c,
        icon: `https:${response.data.current.condition.icon}`,
        description: response.data.current.condition.text,
      };
    })
  );

  return res.json({
    data: responses,
  });
});

export default router;
