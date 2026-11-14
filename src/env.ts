type Env = {
    mode: 'development' | 'production' | 'test';
    version: string;
};

const env : Env = {
    mode: 'production',
    version: 'v1.0.0',
};

export default env;
