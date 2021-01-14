(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.loadFetches();
    },

    cacheElements() {
      this.pressContainer = document.querySelector('.press-container');
      this.atelierContainer = document.querySelector('.atelier-container')
    },

    async loadFetches() {
      const press = await pressFetch();
      this.updatePress(press);

      const atelier = await atelierFetch();
      this.updateAtelier(atelier);
    },

    updatePress(press) {
      pressHTML = "";

      if (this.pressContainer !== null) {
        pressHTML = `
          <article class="margin">
            <div class="full-width">
              <h1>Press</h1>
  
              <div class="press-side">
                <h2>Press release</h2>
                <a href="#" class="archive">archive</a>
              </div>
            </div>

        `;

        let i = 0;

        press.forEach(element => {
          if (i === 3) {
            pressHTML += `
              <div class="full-width press-side2">
                <h2>In the press</h2>
                <a href="#" class="archive">archive</a>
              </div>
            `;
          }
          pressHTML += `
          <section>
            <a href="press/my-secret-garden-valencia/index.html">
              <img src="${element.image}">
            </a>
            <div>
              <p><span class="sub-title">${element.subTitle}</span></p>
              <h2>${element.title}</h2>
              <p>${element.text}</p>
              
          `
          // Correct href wording
          switch (i) {
            case 3:
              pressHTML += `
                  <p><a href="">download article</a></p>
                </div>
              </section>
              `;
              break;
            case 4, 5:
              pressHTML += `
                  <p><a href="">visit website</a></p>
                </div>
              </section>
              `;
              break;
            default:
              pressHTML += `
                  <p><a href="">Open press release</a></p>
                </div>
              </section>
              `;
              break;
          }

          i++;

        this.pressContainer.innerHTML = pressHTML + '</article>';

        });
      }

    },

    updateAtelier(atelier) {
      atelierHTML = "";

      if (this.atelierContainer !== null) {
        atelierHTML = `
        <article class="margin">
          <section class="full-width">
            <h1>Atelier / Studio</h1>
            <p>Discover Arne Quinze's upcoming projects, follow him behind the scenes and get to know where he finds inspiration for creating his art. </p>
          </section>
      `;
        
        atelier.forEach(element => {
          atelierHTML += `
          <section>
            <div>
              <a href="atelier-studio/visiting-mons-again/index.html">
                <img src="${element.image}">
              </a>
            </div>
            <div>
              <p><span class="sub-title">${element.subTitle}</span></p>
              <h2>${element.title}</h2>
              <p>${element.text}</p>
              <p><a href="">Open press release</a></p>
            </div>
          </section>
          `
  
          this.atelierContainer.innerHTML = atelierHTML + `</article>`;
  
        });
      }

    },

  }

  app.initialize();
})()