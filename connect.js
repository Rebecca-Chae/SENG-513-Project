// driver code provided by mongodb to connect to the cluster using the connection string and return a confirmation message

const {MongoClient} = require("mongodb");

// Replace the following with your Atlas connection string
const url = "mongodb+srv://db-user:db-pass@cluster0.ofuaylx.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

// run this application with `node connect.js`
// should output: `Connected correctly to server`
