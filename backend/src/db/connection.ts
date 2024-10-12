import { connect, disconnect } from 'mongoose';


async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error ("Cannot Connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    throw new Error ("Cannot DdisConnect to MongoDB");
  }
}

export {connectToDatabase, disconnectFromDatabase}