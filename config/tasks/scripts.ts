import { ITask } from "../types";
import { src, dest } from 'gulp';
import { ErrorHandler } from "../utils";
import { Config } from "../config";

var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");
const gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

export const Scripts: ITask = {
    name: 'Scripts',
    src: ['scripts'],
    dest: ['scripts'],
    extention: ['*.ts'],
    isWatch: true,
    callBack(cb: any) {
        src(this.src)
            .pipe(tsProject().on('error', ErrorHandler))
            .pipe(gulpif(!Config.isProd, uglify()))
            .pipe(dest(this.dest))
        cb();
    }
}
