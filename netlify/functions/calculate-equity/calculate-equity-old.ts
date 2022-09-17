/*
event {
  "path": "Path parameter (original URL encoding)",
  "httpMethod": "Incoming request’s method name",
  "headers": {Incoming request headers},
  "queryStringParameters": {Query string parameters},
  "body": "A JSON string of the request payload",
  "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encoded"
}
*/

import { Handler } from '@netlify/functions';
const Hand = require('pokersolver').Hand;

const handler: Handler = async (event, context) => {
  const hero = Hand.solve(['Ad', 'As', 'Jc', 'Ah', '2d', '3c', 'Kd']);
  const villian = Hand.solve(['Ad', 'Ts', 'Kc', '7h', 'Qc', 'Qs', 'Qd']);
  const winner = Hand.winners([hero, villian]);

  let message;

  if (winner.length > 1) {
    message = `It's a tie! Hero has ${hero.name} and villian has ${villian.name}`;
  }
  if (winner[0] === hero) {
    message = `Hero wins with ${hero.name}`;
  } else if (winner[0] === villian) {
    message = `Villian wins with ${villian.name}`;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};

export { handler };
