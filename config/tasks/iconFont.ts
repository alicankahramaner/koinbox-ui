import { ITask } from "../types";
import { src, dest, parallel } from 'gulp';
import { Config } from "../config";

var async = require('async');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var consolidate = require('gulp-consolidate');
var path = require('path');


const fontName = 'icons';
var runTimestamp = Math.round(Date.now() / 1000);


export const IconFont: ITask = {
    name: 'IconFont',
    src: ['resources', 'fontIcons'],
    dest: ['resources', 'fonts'],
    extention: ['*.svg'],
    isWatch: true,
    callBack(cb: any) {
        return src(this.src)
            .pipe(iconfontCss({
                fontName: fontName,
                path: 'node_modules/gulp-iconfont-css/templates/_icons.scss',
                targetPath: '../../styles/_fontIcons.scss',
                fontPath: '/resources/fonts/',
                cssClass:'ficon'

            }))
            // .pipe(iconfont({
            //     fontName: fontName
            // }))
            .pipe(dest('src/resources/fonts'));
    }
}
