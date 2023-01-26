var express = require('express');
var router = express.Router();


const openGpt = require("../worker/openGPT.js")


/* GET users listing. */


/* GET home page. */
router.get('/', function (req, res, next) {
  let text = "<h1>OpenAI LP</h1>  ist ein US-amerikanisches Unternehmen, das sich mit der Erforschung von  \
  künstlicher Intelligenz beschäftigt. <p>Die gewinnorientierte Tochtergesellschaft OpenAI LP wird \
  dabei durch das Non-Profit-Mutterunternehmen OpenAI Inc. kontrolliert. Zentrale Geldgeber der \
  Organisation ist Microsoft.</p> Das Ziel von OpenAI ist, künstliche Intelligenz auf Open-Source-Basis \
  auf eine Art und Weise zu entwickeln und zu vermarkten, dass sie der Gesellschaft Vorteile bringt \
  und nicht schadet. Die Organisation ermöglicht eine „freie Zusammenarbeit“ mit anderen \
  Institutionen[3] und Forschern, indem sie ihre Patente und Forschungsergebnisse für die \
  Öffentlichkeit zugänglich macht. Die Firma ist mit über 1 Milliarde US-Dollar von Spenden \
  finanziert.\
  Quelle: https://de.wikipedia.org/wiki/OpenAI"
  res.set('Content-Type', 'text/html');
  res.send(text);
});


/* GET list all models */
router.get('/models', async function (req, res, next) {
  const msg = await openGpt.getAvailableModels()
  res.status(200).end(msg)
});


/* GET users listing. */
router.post('/', async  (req, res, next)=> {
  const msg = await openGpt.runCompletion("Wie backe ich einen Guglhupf mit Rosinen?")
  res.status(200).end(msg)
});

module.exports = router;