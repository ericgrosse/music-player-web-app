const roster = [
  {name: 'Bill', number: 1, position: 'Infield'},
  {name: 'Joe', number: 2, position: 'Outfield'},
  {name: 'Bob', number: 3, position: 'Catcher'},
]

export default {
  get: (number) => {
    return roster.find(el => el.number === number)
  },

  all: () => {
    return roster
  },
}
