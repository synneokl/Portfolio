/* Om meg: portrettet viser et hint og blir rosa ved hover/fokus. Ved klikk vokser
   portrettkortet og fyller hele venstre kolonne med «Om meg», mens kontaktkortet
   trekker seg sammen. Prosjektene til høyre står urørt. Brukes på alle sider. */
(function () {
  const card = document.querySelector('.card-home--image');
  const sidebar = document.querySelector('.page-sidebar');
  if (!card || !sidebar) return;

  card.classList.add('about-trigger');
  card.insertAdjacentHTML('beforeend', `
    <button class="about-trigger__button" type="button" aria-expanded="false" aria-controls="about-content" aria-label="Om meg">
      <span class="about-trigger__pill" aria-hidden="true">Om meg<img src="assets/icons/arrow-up-right.svg" alt="" /></span>
      <span class="about-trigger__arrow" aria-hidden="true"><img src="assets/icons/arrow-up-right.svg" alt="" /></span>
      <span class="about-trigger__hover">
        <span class="about-trigger__title">Hei, jeg er Synne</span>
        <span class="about-trigger__text">Interaksjonsdesigner som liker å forstå hvordan ting henger sammen, og å gjøre komplekse ting enkle.</span>
        <span class="about-trigger__more">Les mer om meg</span>
      </span>
    </button>
    <section class="about-content" id="about-content" aria-labelledby="about-title" hidden>
      <div class="about-content__bar">
        <button class="icon-button icon-button--outline about-content__close" type="button" aria-label="Lukk om meg">
          <img src="assets/icons/cross.svg" alt="" />
        </button>
      </div>
      <div class="about-content__body">
        <h2 class="about-content__title" id="about-title">Hei, jeg er Synne</h2>
        <div class="about-content__prose">
          <p>Jeg vokste opp i Ølen, utenfor Haugesund, og bor nå i Bergen. Jeg er nysgjerrig av natur og liker å forstå hvordan ting henger sammen. Folk rundt meg vil nok beskrive meg som sosial, strukturert og ganske glad i å stille spørsmål.</p>
        </div>
        <a class="about-content__link" href="assets/cv.pdf" target="_blank" rel="noopener">Utdanning og erfaring finner du i CV-en min</a>

        <div class="about-content__block">
          <h3 class="about-content__heading">Dette engasjerer meg</h3>
          <p>Jeg motiveres av digitale produkter som løser reelle problemer i arbeidshverdagen, og av å gjøre avansert teknologi tilgjengelig uten å forenkle bort det som er viktig. For tiden er jeg særlig nysgjerrig på hvordan KI kan åpne for nye måter å samhandle med digitale løsninger på.</p>
        </div>

        <div class="about-content__block">
          <h3 class="about-content__heading">Utenfor jobb</h3>
          <p>Mye av fritiden går til løping. Jeg har løpt flere halvmaraton og 10 km-løp, og er nok typen som analyserer pulsdataene etter hver økt. Ellers er jeg glad i å være sosial og sier sjelden nei til en god fest.</p>
          <div class="about-content__photos">
            <img src="assets/images/about-lop.jpg" alt="Løper i blå singlet i et gateløp" />
            <img src="assets/images/about-bryggen-lop.jpg" alt="Jubler med medalje etter løp på Bryggen" />
            <img src="assets/images/about-floyen.jpg" alt="Solnedgang på Fløyen" />
            <img src="assets/images/about-innovationday.jpg" alt="Presenterer på scenen under en innovasjonsdag" />
            <img src="assets/images/about-vm-hatt.jpg" alt="Med venninne og VM-hatter" />
            <img src="assets/images/about-konsert.jpg" alt="På konsert med venner" />
          </div>
        </div>

        <div class="about-content__block">
          <h3 class="about-content__heading">Slik beskriver ChatGPT meg 🤖</h3>
          <blockquote class="about-content__quote">«En over gjennomsnittet nysgjerrig problemløser med et nesten mistenkelig stort behov for å forstå absolutt alt. Analytisk til fingerspissene, ambisiøs nok til å lage en plan for å nå målet, og strukturert nok til å lage en ny plan når den første ikke var optimal. Har en tendens til å overtenke alt fra UX-beslutninger til 30-sekunders drag på tredemølla. Kort sagt: 10 % spontanitet, 90 % analyse (ifølge mine egne, svært objektive beregninger).»</blockquote>
          <p class="about-content__note">Jeg synes faktisk denne beskrivelsen treffer meg bedre enn jeg noen gang har klart å sette ord på selv.</p>
        </div>
      </div>
    </section>`);

  const trigger = card.querySelector('.about-trigger__button');
  const content = card.querySelector('.about-content');
  const closeBtn = card.querySelector('.about-content__close');
  const isOpen = () => sidebar.classList.contains('is-about');

  const open = () => {
    if (isOpen()) return;
    content.hidden = false;
    sidebar.classList.add('is-about');
    trigger.setAttribute('aria-expanded', 'true');
    content.scrollTop = 0;
    setTimeout(() => closeBtn.focus({ preventScroll: true }), 300);
  };
  const close = () => {
    if (!isOpen()) return;
    sidebar.classList.remove('is-about');
    trigger.setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!isOpen()) content.hidden = true; }, 450);
    trigger.focus({ preventScroll: true });
  };

  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
