import { Handler } from 'aws-lambda';

const saveLocation: Handler = async (event) => {
  return {
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  };
};

export {
  saveLocation
}
