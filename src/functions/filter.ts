import wheelContent from "../content/wheel.json";

let wheelFiltered = wheelContent.filter((x: {hidden?: boolean}) => {return !x.hidden});
wheelFiltered = wheelFiltered.filter((x: {temp_hidden?: boolean}) => {return !x.temp_hidden})
let slugToIndex: { [key: string]: number } = {};

const updateSlugToIndex = () => {
  for (let i = 0; i < wheelFiltered.length; i++) {
    slugToIndex[wheelFiltered[i].slug] = i;
  }
}
updateSlugToIndex();

export default wheelFiltered;
export { slugToIndex };
