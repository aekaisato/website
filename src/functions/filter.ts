import wheelContent from "../content/wheel.json";

let wheelFiltered = wheelContent.filter((x: {hidden?: boolean}) => {return !x.hidden});

export default wheelFiltered;
