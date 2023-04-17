class Image {

    private readonly _src: string;
    private readonly _alt: string;
    constructor(src: string, alt: string) {
        this._src = src;
        this._alt = alt;
    }

    get src(): string {
        return this._src;
    }

    get alt(): string {
        return this._alt;
    }
}

export default Image;