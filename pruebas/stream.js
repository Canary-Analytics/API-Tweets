const Twitter = require('twitter');
const fs = require('fs');
const client = new Twitter({
  consumer_key: 'aDay6jhWc9b3y3Z31BRx6uXVc',
  consumer_secret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
  access_token_key: '827584840677617664-GCqacrqLnyTUcYUTkHzP4tpwYb7wW5y',
  access_token_secret: '9rPagouJR4nUgbvrgmUQH8EISDEknl0s7ipeBPwuZB8NC'
});

client.stream('statuses/filter', {track: 'twitter'}, (stream) => {
  let vct = [];
  stream.on('data', (tweet) => {
    console.log(tweet.text);
    vct.push(tweet);
    fs.writeFileSync('./tweets.json',JSON.stringify(vct));
  });
  stream.on('error', (error) => {
    console.log(error);
  });
});
