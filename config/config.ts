import { IConfig, IConfigSettings, IConfigBase } from "./types";
import { mergeDeep } from "./utils";

const baseConfig: IConfigBase = {
    dest: 'dist',
    src: 'src',
    isProd: false,
    styles: {
    },
    scripts: {

    },
    views: {

    }
}

const dev: IConfigSettings = {
    styles: {
        minify: false,
        sourcemaps: false
    },
    scripts: {

    },
    views: {
        debug: true
    },
    resources: {
        images: {

        },
        fonts: {

        },
        other: {

        }
    },
    devServer: {
        port: 3000,
        open: true,
    }
}

const prod: IConfigSettings = {
    styles: {
        minify: false,
        sourcemaps: false
    },
    scripts: {

    },
    views: {

    },
    resources: {
        images: {

        },
        fonts: {

        },
        other: {

        }
    }
}

export const Config: IConfig = ((): IConfig => {
    switch (process.env.NODE_ENV) {
        case 'development':
            dev.devServer.server = baseConfig.dest;
            return {
                ...mergeDeep(baseConfig, dev),
                isProd: false
            };
        case 'production':
            return {
                ...mergeDeep(baseConfig, prod),
                isProd: true
            };
        default:
            console.log('ENV Not Set');
            process.exit();
    }
})()