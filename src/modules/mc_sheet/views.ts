import { McSheet } from '.';


interface Views extends McSheet {}


class Views {
    /**
     * シートを表示する
     * @returns { McSheet }
     */
    show (): McSheet {
        this.sheet.showSheet()
        return this
    }

    /**
     * シートを非表示にする
     * @returns { McSheet }
     */
    hide (): McSheet {
        this.sheet.hideSheet()
        return this
    }
}


export {
    Views
}
