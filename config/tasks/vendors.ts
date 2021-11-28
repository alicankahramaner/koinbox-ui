import { ITask } from "../types";
import { src, dest } from 'gulp';

export const Vendors: ITask = {
    name: 'Vendor',
    src: ['resources', 'vendor'],
    dest: ['resources', 'vendor'],
    extention: ['*.*'],
    isWatch: true,
    callBack(cb: any) {
        return src(this.src)
            .pipe(dest(this.dest))
    }
}
