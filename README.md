You can use this bot where ever you like!

But be sure to provide credits to me.

Get permission to use this by DM'ing me on Discord: `Militia21#0001`

<h1>Setting the bot up</h1>

```js
const token = "abc"; //Change this to either process.env.token or import the token from your config.json file.

//Change line 57 in index.js to this.
client.login(token);
```

<h1>Setting up MongoDB</h1>

This is the MongoDB database, you may use different databases if you wish.

```js
const mongoURI = "abc"; //Change this to either process.env.mongoURI or import the URI from your config.json file.

//Change this code snippet from your ready event.
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
```
