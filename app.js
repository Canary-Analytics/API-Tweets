const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'aDay6jhWc9b3y3Z31BRx6uXVc',
  consumer_secret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
  access_token_key: '827584840677617664-GCqacrqLnyTUcYUTkHzP4tpwYb7wW5y',
  access_token_secret: '9rPagouJR4nUgbvrgmUQH8EISDEknl0s7ipeBPwuZB8NC'
});

/*
const params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, (error, tweets, response) => {
  if (!error) {
    for (let i = 0; i < tweets.length; i++) {
      console.log("");
      console.log("Followers: " + tweets[i].user.followers_count);
      console.log("autor: @" + tweets[i].user.screen_name);
      console.log("Texto: " + tweets[i].text);
      console.log("");
    }
  }
});
*/

const params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
