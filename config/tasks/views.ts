import { ITask } from "../types";
import { src, dest } from 'gulp';
import { Config } from "../config";
import { ErrorHandler } from "../utils";

const fs = require('fs');
const path = require('path');
const data = require('gulp-data');
const pug = require('gulp-pug');

export let Views: ITask = {
    name: 'Views',
    src: ['views',],
    dest: [],
    extention: ['/**/*.pug'],
    isWatch: true,
    callBack(cb: any) {
        return src(this.src)
            // .pipe(data(function (file: any) {
            //     return JSON.parse(fs.readFileSync(path.join(process.cwd(), Config.src, 'data.json')))
            // }))
            .pipe(pug({
                pretty: false,
                compileDebug: Config.views.debug,
            }).on('error', ErrorHandler))
            .pipe(dest(this.dest))
    }
}