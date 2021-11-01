import { ITask } from "../types";
import { src, dest } from 'gulp';
import { ErrorHandler } from "../utils";

const image = require('gulp-image');

export const Font: ITask = {
    name: 'Font',
    src: ['resources', 'fonts'],
    dest: ['resources', 'fonts'],
    extention: ['*.*'],
    isWatch: true,
    callBack(cb: any) {
        src(this.src)
            .pipe(dest(this.dest))
        cb();
    }
}
