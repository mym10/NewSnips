const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const axios = require("axios");


const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});



var clips =[];
app.post("/news", async(req, res) => {
    try {
        const API_KEY="0e002cefbafa4ea5aa347afd301ec1bb"
        const cat=req.body.category;
        const API_URL=`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${API_KEY}`;
        const response=await axios.get(API_URL);
        const result=response.data;
        clips=result.articles;

        
        const apiid = "ee261e0107377c188d464248427f1c1d";
        // const city = req.body.cityName;  get the location of the device
        const API_URL_weather = "https://api.openweathermap.org/data/2.5/weather?q=" + "Hyderabad" + "&units=metric&appid=" + apiid;
        const responseWeather= await axios.get(API_URL_weather);
        const resultWeather = responseWeather.data;
        const icon = resultWeather.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.render("news.ejs", {Clips: clips, icon: imageURL, weatherData: resultWeather});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("News.ejs", {error: "Nothing to Display, Please try again later or contact the developer."});
    }
});

const port=3000;
app.listen(port, () => {
    console.log(`server is running on: ${port}`);
})