import modalView from './view/modalView';
import * as config from './config';

export const spinner = function (el) {
  const spin = `<div class="lds-ripple"><div></div><div></div></div>`;
  document.querySelector(el).innerHTML = spin;
};

export const removeSpinner = function (el) {
  document.querySelector(el).innerHTML = '';
};

export const inactiveEl = function (classEl, sectionEl, typeEl) {
  const elements = document.querySelectorAll(classEl);
  const section = document.querySelector(sectionEl);
  typeEl === 'div'
    ? elements.forEach(el =>
        el !== section ? el.classList.add('unactive') : null
      )
    : elements.forEach(el =>
        el !== section ? el.classList.add('disabled') : null
      );
};

export const activeEl = function (classEl, typeEl) {
  const elements = document.querySelectorAll(classEl);
  typeEl === 'div'
    ? elements.forEach(el => el.classList.remove('unactive'))
    : elements.forEach(el => el.classList.remove('disabled'));
};

export const updateRandomBox = function (
  level,
  sectionJp,
  curQuiz,
  lengthQuiz
) {
  const markUp = `
          <div class="level-content">
            <p class="level-name">${level}</p>
            <p class="section-name-jp">${sectionJp}</p>
            <p class="section-name-en">${config.JPTOEN[sectionJp]}</p>
          </div>
          <div class="statistic">
            <p class="further">
              第${curQuiz}問 ${lengthQuiz}問中 </br>Total of ${lengthQuiz} quizzes, quiz #${curQuiz}
            </p>
          </div>`;

  document.querySelector('.level--box').innerHTML = markUp;
};

export const updateEl = function (el, content) {
  document.querySelector(el).innerHTML = content;
};

export const updateQuizzes = function (el, curQuiz, quizLength) {
  document.querySelector(
    el
  ).innerHTML = `第${curQuiz}問 ${quizLength}問中 </br>Total of ${quizLength} quizzes, quiz #${curQuiz}`;
};

export const emptyEl = function () {
  document.querySelector('.spin').innerHTML = '';
  document.querySelector('.left-anchor').innerHTML = '';
  document.querySelector('.problem-name').innerHTML = '';
  document.querySelector('.ques-content').innerHTML = '';
  document.querySelector('.quiz-main').innerHTML = '';
  document.querySelector('.btn--control').innerHTML = '';
};

const formatTimeDigit = (time, digit) =>
  time.toLocaleString('ja-JP', { minimumIntegerDigits: digit });

export const countDownTimer = function (minutes) {
  document.querySelector('.count-down').classList.remove('hidden');
  const countTimeEl = document.querySelector('.count-time');

  const seconds = (minutes - 1) * 60;
  let _hour = parseInt(seconds / 3600);
  let _minute = (seconds - _hour * 3600) / 60;
  let _second = 60;

  const setInt = setInterval(() => {
    _second--;

    if (_second === -1) {
      _minute--;
      _second = 59;
    }

    if (_minute === 0 && _second === 0) {
      modalView.display('.timeout');
      clearInterval(setInt);
    }
    countTimeEl.textContent = `${formatTimeDigit(_hour, 1)}:${formatTimeDigit(
      _minute,
      2
    )}:${formatTimeDigit(_second, 2)}`;
  }, 1000);
  return setInt;
};

export const countDownDay = (year, month, day) => {
  const futureDate = new Date().setFullYear(year, month, day);
  const nowDate = new Date().getTime();
  const countDown = Math.round((futureDate - nowDate) / 86400000);
  return countDown;
};
