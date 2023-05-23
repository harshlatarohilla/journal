const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "Welcome to our whimsical wonderland, a place where reality takes a backseat and imagination runs wild! Step into a world where ordinary moments are sprinkled with enchantment and mundane routines are transformed into extraordinary adventures. Prepare to be captivated by captivating tales, mind-boggling riddles, and fantastical creations that will transport you to realms unknown. Here, the impossible becomes possible, and the extraordinary becomes the norm. Whether you're seeking a respite from the ordinary or a dose of inspiration to fuel your own creative pursuits, you've come to the right place. So grab a cup of imagination, kick off your shoes (or put on your dancing ones), and let's embark on a journey through the extraordinary together!";
const contactContent =
  "Welcome to our wacky world of communication! We're thrilled that you've stumbled upon our Contact Us page, the portal to quirky conversations and peculiar inquiries. Feel free to reach out to us with your wildest thoughts, puzzling puzzles, or simply to say hello! Our team of eccentric enthusiasts eagerly awaits your messages, armed with their trusty typewriters and an endless supply of exclamation marks. Whether you want to discuss the existence of unicorns or the best flavor of intergalactic ice cream, we're here to listen and respond with a touch of whimsy. Get ready to embark on a delightful dialogue that defies the ordinary!";
const aboutContent =
  "Who are we, you wonder? Well, let us unravel the enigmatic tapestry of our existence. We are a merry band of oddballs, united by our insatiable curiosity and boundless imagination. Our journey began in a realm where words danced, ideas collided, and laughter echoed through the halls of absurdity. With a penchant for the peculiar and an appetite for the extraordinary, we set out to create a place where imagination reigns supreme. Here, the mundane is banished, and the extraordinary is celebrated. Join us as we venture into the realms of the unconventional, where every twist and turn sparks inspiration, and where the ordinary becomes extraordinary. We invite you to embrace the eccentricity and embrace the magic that lies within!";

let posts = [];
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { home: homeStartingContent, posts: posts });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
});

app.get("/about", (req, res) => {
  res.render("about", { about: aboutContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:name", (req, res) => {
  const postName = _.lowerCase(req.params.name);

  posts.forEach((post) => {
    const storedName = _.lowerCase(post.title);

    if (storedName === postName) {
      res.render("post", { title: post.title, content: post.content });
    }
  });
});

module.exports=app;