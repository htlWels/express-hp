var express = require('express');
var router = express.Router();
const utils = require("../utils/routerUtils")
//const jwt = require("jsonwebtoken");
const openGpt = require("../worker/openGPT.js")

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
router.get('/models',utils.checkToken, async function (req, res, next) {
   try {
    const msg = await openGpt.getAvailableModels()
    if (msg)
      res.status(200).end(msg)
    else
      res.status(500).end(utils.createError("Error on serverside"))
  } catch (error) {
    if (error.message.startsWith("AI"))
      res.status(438).end(utils.createError(error.message))
    else
      res.status(500).end(utils.createError(error.message))
  }
});


/* GET completion of question */
router.post('/completion', utils.checkToken,async (req, res, next) => {
 
  try {
    let question = req.body.question;
    let number_token = req.body.tokens;
    if (!number_token)
      number_token = 1024
    const msg = await openGpt.runCompletion(question, number_token)
    res.status(200).end(msg)
  } catch (error) {
    if (error.message.startsWith("AI"))
      res.status(438).end(utils.createError(error.message))
    else
      res.status(500).end(utils.createError(error.message))
  }

});

///https://platform.openai.com/docs/api-reference/edits/create
router.post('/correctText', utils.checkToken,async (req, res, next) => {


});

/* GET users listing. */
router.post('/image', utils.checkToken,async (req, res, next) => {
  let imageDescript = req.body.question;
  const msg = await openGpt.createImage(imageDescript)
  res.status(200).end(msg)
});

router.get("*", utils.checkToken,(req, res) => {
   utils.handleInvalidRoute(req, res)
});
router.post("*",utils.checkToken, (req, res) => {
   utils.handleInvalidRoute(req, res)
}); 


module.exports = router;