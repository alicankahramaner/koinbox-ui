import { ITask } from "../types";
import { src, dest } from 'gulp';
import { ErrorHandler } from "../utils";
var spritesmith = require('gulp.spritesmith');


export const SpriteSmith: ITask = {
    name: 'SpriteSmith',
    src: ['resources', 'images', 'sprites'],
    dest: [],
    extention: ['*.*'],
    isWatch: true,
    callBack(cb: any) {

        var spriteData = src(this.src).pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath: '/resources/images/sprite.png',
            cssVarMap: function (sprite: any) {
                sprite.name = 'icon-' + sprite.name;
            }
        }));

        spriteData.img
            .pipe(dest('src/resources/images'));

        spriteData.css
            .pipe(dest('src/styles/'));

        cb();

    }
}
