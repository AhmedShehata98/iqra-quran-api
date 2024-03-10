function getTargetSuwar(moshafList = [], suwarList = []) {
  const newSuwar = [];
  moshafList.forEach((m) => {
    const surah_list = m.surah_list.split(",");

    for (const surah of suwarList) {
      if (surah_list.includes(surah.id.toString())) {
        newSuwar.push(surah);
      }
    }
  });

  return newSuwar;
}
function groupByLetter(dataSource = []) {
  // algorithm steps:
  //
  // - extract unique chars in Set array
  // - loop over letters set array
  // - loop over source data and filter items with the current letter in letter loop
  // - push filterd items with current letter in format {letter:currentItratorLetter , data: filterdItems } to grouped set array

  const lettersSet = new Set([]);
  const goruped = new Set([]);

  dataSource.forEach((elem) => lettersSet.add(elem.letter));

  for (const letter of [...lettersSet]) {
    const filterdItems = dataSource.filter((elem) => elem.letter === letter);
    goruped.add({ letter, data: filterdItems });
  }

  return [...goruped];
}
module.exports = { getTargetSuwar, groupByLetter };
