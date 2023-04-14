export default class QuizView {
  constructor(
    docOrder,
    level,
    section,
    problemName,
    questionOrder,
    questionContent,
    questionName,
    choiceAnswers,
    answerCorrect,
    score
  ) {
    this.docOrder = docOrder;
    this.level = level;
    this.section = section;
    this.problemName = problemName;
    this.questionOrder = questionOrder;
    this.questionContent = questionContent;
    this.questionName = questionName;
    this.choiceAnswers = choiceAnswers;
    this.answerCorrect = answerCorrect;
    this.score = score;
  }

  generateQuiz() {
    const currEl = document.querySelector('.quiz-main');
    let quizMarkUp = '';

    if (this.section)
      document.querySelector('.left-anchor').innerHTML = this.section;
    if (this.problemName)
      document.querySelector('.problem-name').innerHTML = this.problemName;
    if (this.questionContent)
      document.querySelector('.ques-content').innerHTML = this.questionContent;

    quizMarkUp = `
       	<div class="ques-collect bounceInRight">
						<div class="ques-number">
							<h3>質問<span class="ques-content-num">${this.questionOrder}</span>: 
							<br />${this.questionName}</h3>
						</div>
						<label>
									<input type="radio" name="answer" value="1" />
									${this.choiceAnswers[0]}
						</label>
						<label>
									<input type="radio" name="answer" value="2" />
									${this.choiceAnswers[1]}
						</label>
						<label>
									<input type="radio" name="answer" value="3" />
									${this.choiceAnswers[2]}
						</label>
						${
              this.choiceAnswers[3]
                ? `<label><input type="radio" name="answer" value="4" />${this.choiceAnswers[3]}</label>`
                : ''
            }
					<div class="ques-confirm"></div>
				</div>`;

    currEl.innerHTML = quizMarkUp;
  }

  getAnswer() {
    const quesValueList = document.querySelectorAll('input[name="answer"]');
    [...quesValueList].every(el => !el.checked)
      ? (this.answer = false)
      : [...quesValueList].forEach(el =>
          el.checked ? (this.answer = parseInt(el.value, 10)) : null
        );
    return this;
  }

  checkAnswer() {
    this.answer === this.answerCorrect
      ? (this.correct = true)
      : (this.correct = false);
    return this;
  }

  getScore() {
    this.correct ? this.score : (this.score = 0);
    return this.score;
  }

  confirmAnswer() {
    const cur = document.querySelector(`input[value="${this.answer}"]`);
    let confirmMarkup;
    if (!this.correct) {
      confirmMarkup = `<div class="flash red"><p>No, that's wrong! Try again!</p></div>`;
      if (!cur) return;
      cur.disabled = true;
      cur.parentNode.classList.add('not-access');
    } else confirmMarkup = `<div class="flash"><p>Yes, that's right!</p></div>`;
    document.querySelector('.ques-confirm').innerHTML = confirmMarkup;
  }
}
