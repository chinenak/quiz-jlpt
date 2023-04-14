class ControlButtonView {
  parentEl = document.querySelector('.quiz--right_column');

  render() {
    const currEl = document.querySelector('.btn--control');
    const markUp = `
          <button class="btn btn-previous">Previous</button>
          <button class="btn btn-next">Next</button>
          <button class="btn btn-confirm ">Confirm</button>
          <button class="btn btn-random">Random</button>
          <button class="btn btn-random-confirm">Confirm</button>`;

    currEl.innerHTML = markUp;
    this.nextBtn = document.querySelector('.btn-next');
    this.previousBtn = document.querySelector('.btn-previous');
    this.confirmBtn = document.querySelector('.btn-confirm');
    this.randomBtn = document.querySelector('.btn-random');
    this.randomConfirmBtn = document.querySelector('.btn-random-confirm');
    return this;
  }

  methodHandle(method) {
    switch (method) {
      case 'withoutScore':
        this.randomBtn.classList.add('hidden');
        this.randomConfirmBtn.classList.add('hidden');
        break;
      case 'withScore':
        this.previousBtn.classList.add('hidden');
        this.randomBtn.classList.add('hidden');
        this.randomConfirmBtn.classList.add('hidden');
        break;
      case 'random':
        this.previousBtn.classList.add('hidden');
        this.nextBtn.classList.add('hidden');
        this.confirmBtn.classList.add('hidden');
        break;
      default:
        break;
    }
    this.method = method;
  }

  confirmBtnHandle(handle) {
    this.parentEl.addEventListener('click', e => {
      if (!e.target.matches('.btn-confirm')) return;
      if (this.method === 'withScore') e.target.classList.add('disabled');
      this.confirmBtn = e.target;
      handle();
    });
  }

  randomBtnHandle(handle) {
    this.parentEl.addEventListener('click', e => {
      if (!e.target.matches('.btn-random')) return;
      handle();
    });
  }

  randomConfirmBtnHandle(handle) {
    this.parentEl.addEventListener('click', e => {
      if (!e.target.matches('.btn-random-confirm')) return;
      handle();
    });
  }

  nextOrPreBtnHandle(btn, handle) {
    this.parentEl.addEventListener('click', e => {
      const controlBtn =
        btn === 'next'
          ? e.target.matches(`.btn-${btn}`)
          : e.target.matches(`.btn-${btn}`);
      if (!controlBtn) return;
      this.confirmBtn.classList.remove('disabled');
      handle();
    });
  }
}
export default new ControlButtonView();
