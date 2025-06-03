interface Config {
    port: number;
    rootFolder : string;
}

const config: Config = {
    port: Bun.env.PORT ? parseInt(Bun.env.PORT) : 3000,
    rootFolder: Bun.env.ROOT_FOLDER || 'root'
};

export default config;