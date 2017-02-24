const csv2json = require('../../lib/csv2json')
const assert   = require('stream-assert')
const expect   = require('expect.js')
const test     = require('./test-stream')

describe('gulp-csv2json', () => {

  describe('single file input', () => {

    describe('single menu', () => {

      const CSV  =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です\n'

      it('should return 2 files', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(2))
          .pipe(assert.end(done))
      })

      it('should return menu array, firstly', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.first(file => {
            expect(file.contents.toString()).to.equal(JSON.stringify(['串本']))
          }))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, secondly', done => {
        const main = [
          {
            'title': '橋杭岩',
            'lat': '12.345',
            'lng': '123.45',
            'content': 'これは橋杭岩です'
          },
          {
            'title': '潮岬',
            'lat': '23.456',
            'lng': '132.1',
            'content': 'これは潮岬です'
          }
        ]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.second(file => {
            expect(file.contents.toString()).to.equal(JSON.stringify(main))
          }))
          .pipe(assert.end(done))
      })
    })

    describe('multiple menus', () => {

      const CSV  =
        'menu,title,lat,lng,content\n' +
        '串本,橋杭岩,12.345,123.45,これは橋杭岩です\n' +
        '串本,潮岬,23.456,132.1,これは潮岬です\n' +
        '白浜,円月島,76.54,32,1,これは円月島です'


      it('should return 3 files', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.length(3))
          .pipe(assert.end(done))
      })

      it('should return menu array, firstly', done => {
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.first(file => {
            expect(file.contents.toString()).to.equal(JSON.stringify(['串本','白浜']))
          }))
          .pipe(assert.end(done))
      })

      it('should return converted json from csv, secondly', done => {
        const main = [
          {
            'title': '橋杭岩',
            'lat': '12.345',
            'lng': '123.45',
            'content': 'これは橋杭岩です'
          },
          {
            'title': '潮岬',
            'lat': '23.456',
            'lng': '132.1',
            'content': 'これは潮岬です'
          }
        ]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.second(file => {
            expect(file.contents.toString()).to.equal(JSON.stringify(main))
          }))
          .pipe(assert.end(done))
      })


      it('should return converted json from csv, thirdly in this case', done => {
        const main = [
          {
            'title': '円月島',
            'lat': '76.54',
            'lng': '32,1',
            'content': 'これは円月島です'
          }
        ]
        test(CSV)
          .pipe(csv2json())
          .pipe(assert.nth(3, file => {
            expect(file.contents.toString()).to.equal(JSON.stringify(main))
          }))
          .pipe(assert.end(done))
      })
    })
  })
})
