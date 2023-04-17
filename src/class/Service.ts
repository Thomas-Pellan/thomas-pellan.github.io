class Service {

    private readonly _title: string;
    private readonly _link: string;
    private readonly _html: string;
    private readonly _imgSrc: string;

    constructor(title: string, link: string, html: string, imgSrc: string) {
        this._title = title;
        this._link = link;
        this._html = html;
        this._imgSrc = imgSrc;
    }

    get title(): string {
        return this._title;
    }

    get link(): string {
        return this._link;
    }

    get html(): string {
        return this._html;
    }

    get imgSrc(): string {
        return this._imgSrc;
    }
}

export default Service;