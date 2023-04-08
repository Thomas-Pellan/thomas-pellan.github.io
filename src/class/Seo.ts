class Seo {

    private readonly _title: string;
    private readonly _description: string;
    private readonly _noindex: boolean = false;
    constructor(title: string, description: string, noindex: boolean) {
        this._title = title;
        this._description = description;
        this._noindex = noindex;
    }
    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get noindex(): boolean {
        return this._noindex;
    }
}

export default Seo;