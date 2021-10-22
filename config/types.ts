
export interface ITask {
    name: string;
    src: string[];
    dest: string[];
    extention: string[];
    baseFile?: String;
    isWatch?: boolean;
    isSerials?: boolean;
    isStartup?: boolean;
    callBack(cb: any): void;
}

export interface IConfigBase extends IConfigSettings {
    dest: string;
    src: string;
    isProd: boolean;
}

interface IConfigEnvResources {
    images: any;
    fonts: any;
    other: any
}

export interface IConfigSettings {
    styles: any;
    scripts: any;
    views: any;
    resources?: IConfigEnvResources;
    devServer?: any;
}

export interface IConfig extends IConfigBase, IConfigSettings { }