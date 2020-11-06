const {src,dest,watch,series,parallel} = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')

const path = {
  src: './src',
  build: './build'
}

const html = () => {
  return src(path.src + '/*.html')
  .pipe(dest(path.build))
}

const style = () => {
  return src(path.src + '/sass/*.sass')
    .pipe(sass({
      outputStyle: "compact"
    }))
    .pipe(dest(path.build + '/css'))
}

const images = () => {
  return src(path.src + '/images/*')
    .pipe(imagemin())
    .pipe(dest(path.build + '/images'))
}

const watcher = () => {
  watch(path.src + '/*.html', html)
  watch(path.src + '/sass/**/*.sass', style)
  watch(path.src + '/images/*', images)
}

exports.default = series(parallel(html,style,images), watcher)