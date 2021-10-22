import { ITask } from "./types";
import Tasks from './taskCompiler';
import { Config } from "./config";
import { task, series, watch, parallel } from 'gulp';

const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync');

export class Builder {

    private taskList: ITask[] = [];
    private taskNameList: string[] = [];

    public source: string = '';
    public destination: string = '';

    constructor() {
        this.removeDir(Config.dest);
    }

    private removeDir(dirPath: any) {
        let self = this;
        if (fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach(function (file: any) {
                var c = dirPath + '/' + file
                if (fs.statSync(c).isDirectory()) self.removeDir(c)
                else fs.unlinkSync(c)
            })
            fs.rmdirSync(dirPath)
        }
    };

    private join(task: ITask) {

        task.baseFile !== undefined ? task.baseFile = path.join(Config.src, ...task.src, task.baseFile) : null;
        task.src = path.join(Config.src, ...task.src, ...task.extention);
        task.dest = path.join(Config.dest, ...task.dest);

        Object.defineProperty(task.callBack, 'name', {
            value: task.name
        });

        this.taskList.push(task);
        this.taskNameList.push(task.name);
    }

    public init() {
        Tasks.forEach(t => {
            this.join(t);
        });

        const browserReload = task('browserReload', (cb: any) => {
            browserSync.reload();
            cb();
        })

        this.taskList.map(t => {
            task(t.name, t.callBack.bind(t));

            if (t.isWatch && !Config.isProd) {
                watch(t.src, series(t.callBack.bind(t), 'browserReload'));
            }
        });

        if (!Config.isProd) {
            browserSync.init(Config.devServer);
        }

        return series(this.taskNameList);
    }

}