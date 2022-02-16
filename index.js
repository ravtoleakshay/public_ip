const https = require('https');

let CURRENT_IP = "0.0.0.0"
const botToken = ""
const chatId = ""

getAndNotify()

const INTERVAL = setInterval(() => {
	getAndNotify()
}, 1 * 60 * 1000)

function getAndNotify () {
  https.get("https://api.ipify.org", function (resp) {
    resp.on('data', function (res) {
      const ip = res.toString()

      if (CURRENT_IP !== ip && botToken && chatId) {
        CURRENT_IP = ip

        https.get(`https://api.telegram.org/${botToken}/sendMessage?chat_id=${chatId}&text=${CURRENT_IP}`, res => {
          console.log(`statusCode: ${res.statusCode}`)
        })
      }
    });
	
	resp.on('error', function(err) {
		console.log(err)
	})
  });
}

process.on('SIGTERM', () => { clearInterval(INTERVAL) })
process.on('SIGINT', () => { clearInterval(INTERVAL) })