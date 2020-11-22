const moment = require('moment');

// function formatMessage(username, text) {
//   return {
//     username,
//     text,
//     time: moment().format('h:mm a')
//   };
// }

function formatMessage(username, text) {
  return {
    nickname: username,
    content: text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;