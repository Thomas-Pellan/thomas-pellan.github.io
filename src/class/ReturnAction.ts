import Action from './Action';

class ReturnAction extends Action {

    private readonly _title: string;
    constructor(link: string, title: string) {
        super(link);
        this._title = title;
    }

    get title(): string {
        return this._title;
    }
}

export default ReturnAction;