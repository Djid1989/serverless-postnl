import { Handler } from 'aws-lambda';

const hello: Handler = async (event) => {
  return {
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  };
};

export{
  hello
}
