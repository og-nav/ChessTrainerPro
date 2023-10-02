import data from '../assets/endgames.json';

export const totalEndgames = 3351;

export const getFreshEndgameJSON = () => {
  const temp: any = {}; //structuredClone(data);
  for (let c = 0; c < data.categories.length; c++) {
    temp[data.categories[c].name] = [];
    for (let s = 0; s < data.categories[c].subcategories.length; s++) {
      temp[data.categories[c].subcategories[s].name] = [];
      for (
        let g = 0;
        g < data.categories[c].subcategories[s].games.length;
        g++
      ) {}
    }
  }
};

getFreshEndgameJSON();
