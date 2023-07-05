import Seo from './Seo';

class Canonical extends Seo {

    private readonly _canonical: string;

    constructor(title: string, description: string, noindex: boolean, canonical: string) {
        super(title, description, noindex);
        this._canonical = canonical;
    }

    get canonical(): string {
        return this._canonical;
    }
}

export default Canonical;