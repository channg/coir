#!/usr/bin/env node --inspect-brk
const inquirer = require('inquirer')
const config = require('./commandConfig.js')
const main = require('./main.js')
module.exports = q
/**
 *  jump is a string of the inquire key
 * @type {null}
 */
let jump = null
/**
 * questionIndex  is a number of current inquire
 * @type {null}
 */
let questionIndex = null
/**
 * current key ,type is String
 * @type {null}
 */
let keyG = null
/**
 * if output is a array ,this is a number of the index of pass test
 * @type {null}
 */
let currentTest = null


let G_TYPE = null

let END_DATA = {}

let coirjson = null
let qKeyArray = []

function q(j) {
  coirjson = j
  if(config.useConf===true){
    main(config.conf, coirjson)
    return
  }
  qKeyArray = initQuestions(j)
  showInquire()
  
}


/**
 * get Array of key ,and sort
 * @param coirjson
 * @returns {Array}
 */
function initQuestions(coirjson) {
  let qKeyArray = []
  /**
   * coir2.x coir.json
   */
  if (coirjson.inquire) {
    for (let item in coirjson.inquire) {
      qKeyArray.push(item)
    }
    qKeyArray = qKeyArray.sort((a, b) => {
      a = parseInt(a)
      b = parseInt(b)
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
    return qKeyArray
  }
}

/**
 * get questions
 * @param qKeyArray
 * @param coirjson
 * @param index
 * @returns {Array}
 */
function getNextQuestions(qKeyArray, coirjson, index, jump) {
  let questions = []
  
  if (index === null) {
    index = 0
  } else {
    index++
  }
  if (jump) {
    index = qKeyArray.indexOf(jump)
  }
  questionIndex = index
  let key = qKeyArray[index]
  /**
   * next inquire not alive
   */
  if (!key) {
    return questions
  }
  keyG = key
  let item = coirjson[key]
  let type = item.type || 'input'
  G_TYPE = type
  if (type === 'input') {
    questions.push(typeInput(item, key))
  } else if (type === 'confirm') {
    questions.push(typeConfirm(item, key))
  } else if (type === 'list') {
    questions.push(typeList(item, key))
  } else if (type === 'editor') {
    questions.push(typeEditor(item, key))
  }
  return questions
}

/**
 * type = input
 * @param item
 */
function typeInput(item, key) {
  let question = {}
  question.name = config.prefix + key
  question.type = item.type
  question.message = item.question
  question.default = item.default
  question.validate = function (value) {
    let check = 'Failed validation, please re-enter.'
    if (Array.isArray(item.output)) {
      let over = 0
      item.output.forEach((i) => {
        if (check !== true) {
          check = new RegExp(i.test).test(value)
          if (check === false) {
            check = 'Failed validation, please re-enter.'
          } else {
            setJump(i.jump)
            currentTest = over
          }
          over++
        }
      })
    } else {
      currentTest = null
      check = new RegExp(item.output.test).test(value)
      if (check === false) {
        check = 'Failed validation, please re-enter.'
      } else {
        setJump(item.output.jump)
      }
    }
    return check
  }
  return question
}

function typeEditor(item, key) {
  let question = {}
  question.name = config.prefix + key
  question.type = item.type
  question.message = item.question
  question.default = item.default
  question.validate = function (value) {
    let check = 'Failed validation, please re-enter.'
    if (Array.isArray(item.output)) {
      let over = 0
      item.output.forEach((i) => {
        if (check !== true) {
          check = new RegExp(i.test).test(value)
          if (check === false) {
            check = 'Failed validation, please re-enter.'
          } else {
            setJump(i.jump)
            currentTest = over
          }
          over++
        }
      })
    } else {
      currentTest = null
      check = new RegExp(item.output.test).test(value)
      if (check === false) {
        check = 'Failed validation, please re-enter.'
      } else {
        setJump(item.output.jump)
      }
    }
    return check
  }
  return question
}


function typeConfirm(item, key) {
  let question = {}
  question.name = config.prefix + key
  question.type = item.type
  question.message = item.question
  question.default = item.default
  return question
}

function typeList(item, key) {
  let question = {}
  question.name = config.prefix + key
  question.type = item.type
  question.message = item.question
  question.default = item.default
  question.choices = item.output.map((item) => {
    return item.test
  })
  return question
}


function setJump(curjump) {
  if (curjump) {
    jump = curjump
  } else {
    jump = null
  }
}

/**
 * show Inquire
 */
function showInquire() {
  let qs = getNextQuestions(qKeyArray, coirjson.inquire, questionIndex, jump)
  if (qs.length > 0) {
    point(qs).then((answer) => {
      checkOut({answer, keyG, currentTest})
      showInquire()
    })
  } else {
    main(END_DATA, coirjson)
  }
}

/**
 * Gets user input at the end
 * @param qs
 * @returns {Promise}
 */
function point(qs) {
  return new Promise((resolve) => {
    inquirer
      .prompt(
        qs
      )
      .then(answers => {
        resolve(answers)
      });
  })
}

/**
 * Assign the transformed data to END_DATA
 * @param answer
 * @param keyG
 * @param currentTest
 */
function checkOut({answer, keyG, currentTest}) {
  currentTest = getCurrentTest(currentTest, answer)
  let data = answer[config.prefix + keyG]
  let output
  if (currentTest === null) {
    output = coirjson.inquire[keyG].output.value
  } else {
    output = coirjson.inquire[keyG].output[currentTest].value
  }
  let tr = translateMark(data, output)
  END_DATA[keyG] = tr
}

function translateMark(data, output) {
  let b
  if (Array.isArray(output)) {
    b = []
    output.forEach((item) => {
      let r = itemT(data, item)
      b.push(r)
    })
  } else {
    b = itemT(data, output)
  }
  return b
}

function itemT(data, item) {
  let it = item.replace(/__this__/g, function () {
    return data
  })
  return it
}

/**
 * if type like confirm not have the validate
 * We need to actively validate the fields
 * @param currentTest
 * @param answer
 * @returns {*}
 */
function getCurrentTest(currentTest, answer) {
  if (G_TYPE === 'input' || G_TYPE === 'editor') {
    return currentTest
  } else if (G_TYPE === 'confirm' || G_TYPE === 'list') {
    let over = -1
    let ot = coirjson.inquire[keyG].output
    for (let i = 0; i < ot.length; i++) {
      if (ot[i].test === answer[config.prefix + keyG] || ot[i].test === answer[config.prefix + keyG].toString()) {
        setJump(coirjson.inquire[keyG].output[i].jump)
        over = i
      }
    }
    return over
  }
}


