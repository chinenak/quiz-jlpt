import './css/style.css';
import { level } from './config.js';
import {
  emptyEl,
  countDownTimer,
  updateEl,
  updateQuizzes,
  inactiveEl,
  activeEl,
  countDownDay,
  updateRandomBox,
  spinner,
  removeSpinner,
} from './helpers.js';
import * as model from './model.js';
import controlBtnView from './view/controlButtonView';
import levelView from './view/levelView.js';
import modalView from './view/modalView';

// Control level change (N1, N2, N3, N4, N5)
const controlLevel = function (n) {
  // 1. Reset score of all sections to 0
  model.state.level = n;
  ['vocabulary', 'vocabugrammar', 'grammar', 'listening'].forEach(
    sec => (model.state[sec].score = 0)
  );

  // 2. Render section of level at left right
  levelView.render(level[n]);

  // 3. Clear quiz content, control buttons and countdown timer
  emptyEl();
  clearInterval(model.state.interval);

  // 4. Display modal of method selector
  setTimeout(() => modalView.display('.method'), 1000);
};

// Control section change (Start button)
const controlSection = async function (section) {
  try {
    // 1. Get data section from Cloud Firebase
    spinner('.spin');
    await model.getData(model.state.level, section);

    // 2. Initialize state whenever section change
    model.state.curQuiz = 0;
    model.state.method = modalView.method;
    model.state.section = section;
    model.state[section].score = 0;

    // 3. Clear quiz content, control buttons and countdown timer
    emptyEl();
    clearInterval(model.state.interval);

    // 4. Render the first quiz
    model.state[section].data[0].generateQuiz();

    // 5. Render count down time of section timeout
    const timeOutIndex = level[model.state.level].section.indexOf(section);
    model.state.interval = countDownTimer(
      level[model.state.level].timeOut[timeOutIndex]
    );

    // 6. Render the control buttons
    controlBtnView.render().methodHandle(model.state.method);

    // 7. Update score & summary & inactive another section
    updateQuizzes(`.${section}.further`, 1, model.state[section].data.length);
    inactiveEl('.btn-start', `.${section}.btn-start`, 'button');
    inactiveEl('.level--box', `.${section}.level--box`, 'div');
  } catch (err) {
    console.error(err.message);
  }
};

// Control random quiz
const controlRandom = async function () {
  // 1. Get data of all level
  spinner('.spin');
  await model.getAllData();

  const { data, curQuiz } = model.state.random;
  const { level, section } = data[curQuiz];

  // 2. Render a random quiz
  data[curQuiz].generateQuiz();

  // 3. Render buttons control
  controlBtnView.render().methodHandle(model.state.method);

  // 4. Update information of random quiz
  updateRandomBox(level, section, curQuiz, data.length);
  removeSpinner('.spin');
};

// Control random button
const randomBtn = function (quizArr) {
  // 1. Random a quiz number
  model.state.random.curQuiz = Math.trunc(Math.random() * quizArr.length);

  const { level, section } = quizArr[model.state.random.curQuiz];

  // 2. Render a random quiz
  quizArr[model.state.random.curQuiz].generateQuiz();

  // 3. Update information of random quiz
  updateRandomBox(level, section, model.state.random.curQuiz, quizArr.length);
};

// Control confirm button of  random quiz
const randomConfirmBtn = function (quizArr) {
  quizArr[model.state.random.curQuiz].getAnswer().checkAnswer().confirmAnswer();
};

// Control confirm button
const confirmBtn = function (quizArr, section, method) {
  switch (method) {
    case 'withScore':
      model.state[section].score += quizArr[model.state.curQuiz]
        .getAnswer()
        .checkAnswer()
        .getScore();
      updateEl(`span.${section}`, model.state[section].score);
      break;
    case 'withoutScore':
      quizArr[model.state.curQuiz].getAnswer().checkAnswer().confirmAnswer();
      break;
    default:
      break;
  }
};

// Control next button
const nextBtn = function (quizArr, section) {
  model.state.curQuiz++;

  if (model.state.curQuiz < quizArr.length)
    quizArr[model.state.curQuiz].generateQuiz();
  else {
    model.state.curQuiz = 0;
    clearInterval(model.state.interval);
    activeEl('.level--box', 'div');
    activeEl('.btn-start', 'button');
    modalView.display('.endquiz');
    emptyEl();
  }

  updateQuizzes(`.${section}.further`, model.state.curQuiz + 1, quizArr.length);
};

// Control previous button
const previousBtn = function (quizArr, section) {
  model.state.curQuiz--;

  if (model.state.curQuiz < 0) {
    model.state.curQuiz = 0;
    return;
  }

  quizArr[model.state.curQuiz].generateQuiz();
  updateQuizzes(`.${section}.further`, model.state.curQuiz + 1, quizArr.length);
};

///////////////////////////////////////////////
function init() {
  modalView.addMethodHandle();
  levelView.levelEventHandler(controlLevel);
  levelView.startEventHandler(controlSection);
  controlBtnView.confirmBtnHandle(function () {
    confirmBtn(
      model.state[model.state.section].data,
      model.state.section,
      model.state.method
    );
  });
  controlBtnView.randomBtnHandle(function () {
    randomBtn(model.state.random.data);
  });
  controlBtnView.randomConfirmBtnHandle(function () {
    randomConfirmBtn(model.state.random.data);
  });
  controlBtnView.nextOrPreBtnHandle('next', function () {
    nextBtn(model.state[model.state.section].data, model.state.section);
  });
  controlBtnView.nextOrPreBtnHandle('previous', function () {
    previousBtn(model.state[model.state.section].data, model.state.section);
  });
  controlRandom();
  updateEl('h2 span', countDownDay(2023, 7, 2));
}
init();
