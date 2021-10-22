import { ITask } from "../types";
import { src, dest } from 'gulp';
import { ErrorHandler } from "../utils";

const image = require('gulp-image');

export const Image: ITask = {
    name: 'Image',
    src: ['resources', 'images'],
    dest: ['resources', 'images'],
    extention: ['*.*'],
    callBack(cb: any) {
        src(this.src)
            .pipe(image().on('error', ErrorHandler))
            .pipe(dest(this.dest))
        cb();
    }
}
