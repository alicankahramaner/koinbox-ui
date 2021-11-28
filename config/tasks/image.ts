import { ITask } from "../types";
import { src, dest } from 'gulp';
import { ErrorHandler } from "../utils";
import { Config } from "../config";
const gulpif = require('gulp-if');

const image = require('gulp-image');

export const Image: ITask = {
    name: 'Image',
    src: ['resources', 'images'],
    dest: ['resources', 'images'],
    extention: ['*.*'],
    isWatch: true,
    callBack(cb: any) {
        return src(this.src)
            .pipe(gulpif(Config.isProd, image().on('error', ErrorHandler)))
            .pipe(dest(this.dest))
    }
}
