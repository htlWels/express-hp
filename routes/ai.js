var express = require('express');
var router = express.Router();
const utils = require("../utils/routerUtils")

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
router.get('/models', async function (req, res, next) {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("Only logged in users can use this service"))
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
router.post('/completion', async (req, res, next) => {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("Only logged in users can use this service"))

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

router.post('/correctText', async (req, res, next) => {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("Only logged in users can use this service"))
  try {
    let input = req.body.input;
    let msg="NOT implemented yet!"
    res.status(200).end(msg)
  } catch (error) {
    if (error.message.startsWith("AI"))
      res.status(438).end(utils.createError(error.message))
    else
      res.status(500).end(utils.createError(error.message))
  }

});

router.post('/correctCode', async (req, res, next) => {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("Only logged in users can use this service"))
  try {
    let input = req.body.input;
    let msg="NOT implemented yet!"
    res.status(200).end(msg)
  } catch (error) {
    if (error.message.startsWith("AI"))
      res.status(438).end(utils.createError(error.message))
    else
      res.status(500).end(utils.createError(error.message))
  }

});

/* GET users listing. */
router.post('/image', async (req, res, next) => {
  let imageDescript = req.body.question;
  const msg = await openGpt.createImage(imageDescript)
  res.status(200).end(msg)
});

router.get("*", (req, res) => {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("Only logged in users can use this service"))
  utils.handleInvalidRoute(req, res)
});
router.post("*", (req, res) => {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("Only logged in users can use this service"))
  utils.handleInvalidRoute(req, res)
}); 


module.exports = router;