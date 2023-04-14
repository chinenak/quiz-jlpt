class LevelView {
  navEl = document.querySelector('.nav');
  rightColumn = document.querySelector('.quiz--right_column');
  leftColumn = document.querySelector('.quiz--left_column');

  // Generate html of left column (Sections of level)
  generateSectionHtml(level, section, sectionJp, sectionEn, timeOut) {
    return `
			<div class="${section} level--box">
				<div class="level-content">
					<p class="level-name">${level}</p>
					<p class="section-name-jp">${sectionJp}</p>
					<p class="section-name-en">${sectionEn}</p>
					<p class="section-time">(${timeOut}分)</p>
				</div>
				<div class="${section} statistic">
					<p class="score">SCORE: <span class="${section}">0</span>/60点</p>
					<p class="${section} further">
						第0問 n問中 </br>Total of n quizzes, quiz #0
					</p>
				</div>
				<button class="btn ${section} btn-start" name="start" value="${section}">Start</button>
			</div>`;
  }

  // Render level (score summary and sections of level)
  render(level) {
    let sectionMarkUp = `<h2 class="secondary-heading">SCORES &#10026; SUMMARY</h2>`;

    switch (level.name) {
      case 'N1':
      case 'N2':
        sectionMarkUp +=
          this.generateSectionHtml(
            level.name,
            level.section[0],
            level.sectionJp[0],
            level.sectionEn[0],
            level.timeOut[0]
          ) +
          this.generateSectionHtml(
            level.name,
            level.section[1],
            level.sectionJp[1],
            level.sectionEn[1],
            level.timeOut[1]
          );
        this.leftColumn.innerHTML = sectionMarkUp;
        break;
      case 'N3':
      case 'N4':
      case 'N5':
        sectionMarkUp +=
          this.generateSectionHtml(
            level.name,
            level.section[0],
            level.sectionJp[0],
            level.sectionEn[0],
            level.timeOut[0]
          ) +
          this.generateSectionHtml(
            level.name,
            level.section[1],
            level.sectionJp[1],
            level.sectionEn[1],
            level.timeOut[1]
          ) +
          this.generateSectionHtml(
            level.name,
            level.section[2],
            level.sectionJp[2],
            level.sectionEn[2],
            level.timeOut[2]
          );
        this.leftColumn.innerHTML = sectionMarkUp;
        break;
      default:
        break;
    }
  }

  levelEventHandler(handle) {
    this.navEl.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      handle(btn.value);
    });
  }

  startEventHandler(handle) {
    this.leftColumn.addEventListener('click', e => {
      const btn = e.target.matches('.btn-start');
      if (!btn) return;
      handle(e.target.value);
    });
  }
}

export default new LevelView();
