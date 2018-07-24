#!/usr/bin/env node --inspect-brk
const inquirer = require('inquirer')
const config = require('./commadConfig.js')
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

let coirjson = null
let qKeyArray = null

function q(j) {
  coirjson = j
  qKeyArray = initQuestions(j)
  shwoInquire()
  /*  console.log(question)
    inquirer
      .prompt(
        question
      )
      .then(answers => {
        console.log(answers)
      });*/
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
    qKeyArray.sort()
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
  
  if (index===null) {
    index = 0
  } else {
    index++
  }
  
  questionIndex = index
  if (jump) {
    index = qKeyArray.indexOf(jump)
  }
  let key = qKeyArray[index]
  /**
   * next inquire not alive
   */
  if(!key){
    return questions
  }
  keyG = key
  let item = coirjson[key]
  let type = item.type || 'input'
  if (type === 'input') {
    questions.push(typeInput(item, key))
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
    let check = 'try again'
    if (item.output.length) {
      item.output.forEach((i) => {
        if (check!==true) {
          check = new RegExp(i.test).test(value)
          if(check===false){
            check = 'Failed validation, please re-enter.'
          }
        }
      })
    } else {
      check = new RegExp(item.output.test).test(value)
      if(check===false){
        check = 'Failed validation, please re-enter.'
      }
    }
    return check
  }
  return question
}


function shwoInquire() {
  let qs = getNextQuestions(qKeyArray, coirjson.inquire, questionIndex, jump)
  if (qs.length > 0) {
    point(qs).then((answer)=>{
      shwoInquire()
    })
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
        console.log(answers)
        resolve(answers)
      });
  })
}


q(require('./inquire.json'))

