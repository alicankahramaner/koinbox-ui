import { ITask } from "../types";
import { src, dest } from 'gulp';
import { Config } from '../config';

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const stripCssComments = require('gulp-strip-css-comments');

export let Styles: ITask = {
    name: 'Styles',
    src: ['styles'],
    dest: ['styles'],
    extention: ['/**/*.scss'],
    baseFile: 'style.scss',
    isWatch: true,
    callBack(cb: any) {

        let postcssPlugins: any[] = [autoprefixer()];

        if (Config.styles.minify) {
            postcssPlugins.push(csso())
        }

        src(this.baseFile)
            .pipe(gulpif(Config.styles.sourcemaps, sourcemaps.init()))
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(postcssPlugins))
            .pipe(stripCssComments())
            .pipe(gulpif(Config.styles.sourcemaps, sourcemaps.write('.')))
            .pipe(dest(this.dest));
        cb();
    }
}