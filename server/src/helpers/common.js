import colors from 'colors/safe';

const common = {
  log: (text, color) => {
    if (color) console.log(colors[color](text));
    else console.log(text);
  },
};
export default common;
