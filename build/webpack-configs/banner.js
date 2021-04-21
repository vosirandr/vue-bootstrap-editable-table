const {version, homepage} = require('../../package');
const year = new Date().getFullYear();
const years = year === 2021 ? '2021' : '2021-' + year;

module.exports = `
vue-editable-table v${version} | (c) ${years} @Conjoint-ly
Released under the MIT License.
${homepage}
`.trim();
