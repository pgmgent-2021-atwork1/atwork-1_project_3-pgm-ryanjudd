async function pressFetch() {
  const press = '../../data/press.json';

  try {
    const response = await fetch(press);
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function atelierFetch() {
  const atelier = '../../data/atelier.json';

  try {
    const response = await fetch(atelier);
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}