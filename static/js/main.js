(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.loadFetches();
      this.scrollTop();
    },

    cacheElements() {
      this.pressContainer = document.querySelector('.press-container');
      this.atelierContainer = document.querySelector('.atelier-container');
      this.artContainer = document.querySelector('.art-container');
      this.artIndex = document.querySelector('.art-index');
      this.atelierIndex = document.querySelector('.atelier-index');
      this.scrollButton = document.querySelector('.scroll-button');
    },

    async loadFetches() {
      if (this.atelierIndex !== null && this.artIndex !== null) {
        const atelier = await atelierFetch();
        const art = await arneQuinzeFetch();
        this.updateAtelierIndex(atelier);
        this.updateArtIndex(art);
      }else if (this.pressContainer !== null) {
        const press = await pressFetch();
        this.updatePress(press);
      } else if (this.atelierContainer !== null) {
        const atelier = await atelierFetch();
        this.updateAtelier(atelier);
      
      } else if (this.artContainer !== null) {
        const art = await arneQuinzeFetch();
        this.updateArt(art);
      }
      
    },

    updatePress(press) {
      pressHTML = "";

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
      

    },

    updateAtelier(atelier) {

      let atelierHTML = `
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
      

    },

    updateArt(art) {
      let artHTML = `
        <article ca>
          <div>
            <ul class="category">
              <li><a href="" class="selected">Show all</a></li>
              <li><a href="">Book</a></li>
              <li><a href="">Documentary</a></li>
              <li><a href="">Exhibition</a></li>
              <li><a href="">Painting</a></li>
              <li><a href="">Public art</a></li>
              <li><a href="">Sculpture</a></li>
              <li><a href="">Study</a></li>
            </ul>      
          </div>
          <div>
            <ul class="year">
              <li><a href="#" class="selected">Show all</a></li>
         
      `;

      const year = art.map(exhibition => {
        return exhibition.year;
      })
      const yearFilter = [...new Set(year)];

      artHTML += yearFilter.map(tag => {
        console.log(tag);
        return `<li><a href="art-and-exhibitions/index.html#${tag}">${tag}</a></li>`;
      }).join('');

      artHTML += `   
          </ul> 
        </div>
        <div>
          <ul class="view">
            <li><a href="" class="selected">List view</a></li>
            <li><a href="">Map view</a></li>
          </ul>
        </div>
      </article>`;


      artHTML += yearFilter.map((tag) => {

        // Check year
        const artFilter = art.filter((exhibition) => {
          return exhibition.year === tag;
        });

        const artItems = artFilter.map((exhibition) => {
          const artContainer = `
          <section class="items">
            <div>
              <h3><a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">${exhibition.title}</a></h3>
              <p class="font-size">${exhibition.subtitle}</p>
              <p><span class="subtitle">${exhibition.tags[0]} - ${exhibition.location}</></p>
            </div>
          `;

          let imageHTML = `<div class="image-wrapper">`;

          const artImages = exhibition.images.map(image => {
            return `
              <div>
                <img src="static/img/art/${image}" loading="lazy">
              </div>`;
          }).join('');

          imageHTML += artImages + `</div>`;

          return artContainer + imageHTML + '</section>';
        }).join('');

        // Show year before items
        return `<h2 class="year-h2" id="${tag}">${tag}</h2> ${artItems}`;
      }).join('');

      this.artContainer.innerHTML = artHTML;
    },

    updateArtIndex(art) {
      art = art.filter((item) => {
        return item.highlight === true;
      });
      
      
      let artStr = "";

      art.forEach(exhibition => {
        artStr += `
          <section class="margin press-item">
            <div>
              <img src="static/img/art/${exhibition.cover}" loading="lazy">  
            </div>
            <div>
              <h2>${exhibition.title}</h2
              <p>${exhibition.description}</p>
              <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">Learn more</a>
            </div>
          </section>
        `;
      });

      this.artIndex.innerHTML = artStr;
    },

    updateAtelierIndex(atelier) {
      
      atelier = atelier.slice(0, 3);

      console.log(atelier);

      let atelierStr = "";
      
      atelier.forEach(atelierItem => {
        atelierStr += `
          <section class="margin press-item">
            <div>
              <img src="${atelierItem.image}">
            </div>
            <div>
              <p><span>${atelierItem.subTitle}</span></p>
              <h2>${atelierItem.title}</h2>
              <p>${atelierItem.text}</p>
              <a href="atelier-studio/visiting-mons-again">Learn more</a>
            </div>
          </section>`;
      }); 

      this.atelierIndex.innerHTML = atelierStr;
    },

    scrollTop() {
      this.scrollButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })
    }

  }

  app.initialize();
})()