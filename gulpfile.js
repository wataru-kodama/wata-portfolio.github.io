const {src,dest,watch,series,parallel} = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')

const path = {
  src: './src',
  build: './build',
  docs: './docs'
}

const html = () => {
  return src(path.src + '/*.html')
  .pipe(dest(path.build))
  .pipe(dest(path.docs))
}

const style = () => {
  return src(path.src + '/sass/*.sass')
    .pipe(sass({
      outputStyle: "compact"
    }))
    .pipe(dest(path.build + '/css'))
    .pipe(dest(path.docs + '/css'))
}

const script = () => {
  return src(path.src + '/js/*.js')
    .pipe(dest(path.build + '/js'))
    .pipe(dest(path.docs + '/js'))
}

const images = () => {
  return src(path.src + '/images/*')
    .pipe(imagemin())
    .pipe(dest(path.build + '/images'))
    .pipe(dest(path.docs + '/images'))
}

const watcher = () => {
  watch(path.src + '/*.html', html)
  watch(path.src + '/sass/**/*.sass', style)
  watch(path.src + '/js/**/*.js', script)
  watch(path.src + '/images/*', images)
}

exports.default = series(parallel(html,style,script,images), watcher)