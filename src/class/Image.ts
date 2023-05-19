class Image {

    private readonly _src: string;
    private readonly _alt: string;
    private readonly _width: number = 320;
    private readonly _height: number = 320;

    constructor(src: string, alt: string, width: number | null, height: number | null) {
        this._src = src;
        this._alt = alt;
        if(width)
            this._width = width;
        if(height)
            this._height = height;
    }

    get width(): string {
        return this._width;
    }

    get height(): string {
        return this._height;
    }

    get src(): string {
        return this._src;
    }

    get alt(): string {
        return this._alt;
    }
}

export default Image;