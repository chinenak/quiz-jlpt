class ModalView {
  overlayEl = document.querySelector('.overlay');
  closeIconEl = document.querySelector('ion-icon[name="close-outline"]');
  selectBtns = document.querySelectorAll('.btn-select');

  display(el) {
    this.displayEl = document.querySelector(el);
    this.displayEl.classList.remove('hidden');
    this.overlayEl.classList.remove('hidden');
    this.closeIconEl.classList.remove('hidden');

    if (el === '.method') return;
    this.overlayEl.addEventListener('click', this.disappear.bind(this));
    this.closeIconEl.addEventListener('click', this.disappear.bind(this));
  }

  disappear() {
    this.displayEl.classList.add('hidden');
    this.overlayEl.classList.add('hidden');
    this.closeIconEl.classList.add('hidden');
  }

  addMethodHandle() {
    this.selectBtns.forEach(el => {
      el.addEventListener(
        'click',
        function (e) {
          const btn = e.target;
          if (!btn) return;
          this.method = e.target.value;
          this.disappear();
        }.bind(this)
      );
    });
  }
}

export default new ModalView();
