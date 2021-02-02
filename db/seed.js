const Onmyoji = require('../models/onmyojimd')
const Shikigami = require('../models/shikigamimd')

Onmyoji.find({}).remove(() => {
    Shikigami.find({}).remove(() => {
      let yorimitsu = Onmyoji.create({
        name: 'Yorimitsu',
        clan: 'Minamoto',
        level: 60
      }).then(onmyoji => {
        Promise.all([
          Shikigami.create({
            name: 'Onikiri',
            grade: 5,
            rarity: "SSR"
          }).then(shikigami => {
            onmyoji.shikigamis.push(shikigami)
          })
        ]).then(() => {
          onmyoji.save()
        })
      })
      let seimei = Onmyoji.create({
        name: 'Seimei',
        clan: 'Minamoto',
        level: 60
      }).then(onmyoji => {
        Promise.all([
          Shikigami.create({
            name: 'Blazing Tama',
            grade: 5,
            rarity: "SP"
          }).then(shikigami => {
            onmyoji.shikigamis.push(shikigami)
          })
        ]).then(() => {
          onmyoji.save()
        })
      })
      
    })
  })