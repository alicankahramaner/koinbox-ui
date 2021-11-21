interface AppType {
    init(modules: ModuleType[]): void;
    isMobile(): boolean;
    onWindowResize(callback: Function): void;
}

interface ModuleType {
    selector: string;
    init(): void;
}

class App implements AppType {

    constructor(modules: ModuleType[]) {
        this.init(modules);
    }

    init(modules: ModuleType[]) {
        modules.forEach(module => {
            if (!module.selector || !module.init) return;
            if (!document.querySelectorAll(module.selector).length) return;
            module.init();
        })
    }

    isMobile() {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || (window as any).opera);
        return check;
    }

    onWindowResize(callback: Function) {
        window.addEventListener('resize', () => {
            let data = {
                isMobile: this.isMobile(),
                deviceWidth: window.innerWidth
            };
            callback(data);
        });
    }

}

class MenuCollapseModule implements ModuleType {
    public selector: string;
    constructor(selector: string = 'button.collapse-menu') {
        this.selector = selector;
    }

    init() {
        document.querySelectorAll(this.selector).forEach(btn => {
            btn.addEventListener('click', this.onClickButton)
        });
    }

    onClickButton() {
        document.body.classList.toggle('menu-collapsed');
    }
}

class FilterArea implements ModuleType {
    selector: string = ".filter-btn";
    constructor() {
        this.selector = '.filter-btn';
    }

    init() {
        let buttons = document.querySelectorAll(this.selector);
        if (!buttons.length) return;
        buttons.forEach(button => button.addEventListener('click', (e) => this.onChangeFilter(e)))
    }

    onChangeFilter(e: any) {
        let button: HTMLButtonElement = e.target;
        if (!button) return;
        if (!button.dataset || !button.dataset.val) return;
        let filterArea = button.closest('.filter-area');
        if (!filterArea) return;
        let tag = button.dataset.val;
        filterArea.querySelectorAll('button.filter-btn').forEach(e => e.classList.remove('active'));
        button.classList.add('active');
        filterArea.querySelectorAll('.filter-item').forEach(item => {
            if (tag === 'all') {
                item.classList.remove('hide');
                item.classList.add('show');
                return;
            }
            if (item.className.includes(tag)) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        })
    }
}

class MenuDropdown implements ModuleType {
    selector: string;
    constructor() {
        this.selector = '#main-menu';
    }

    init() {
        let parentLi = document.querySelectorAll(`${this.selector} li.sub > a`);
        parentLi.forEach(item => item.addEventListener('click', this.onClick.bind(this)))
    }

    onClick(e: any) {
        let currentLink: HTMLLinkElement = e.target;
        document.querySelectorAll(`${this.selector} li.sub`).forEach(e => e.classList.remove('show'));
        setTimeout(() => currentLink.closest('li.sub').classList.add('show'), 150)
    }
}

class InputRange implements ModuleType {
    selector: string;
    constructor() {
        this.selector = '.read-duration-range';
    }

    init() {
        var ranges = document.querySelectorAll(this.selector);

        ranges.forEach(range => {
            this.create(range);
        })

    }

    create(item: any) {
        var slider2 = new (window as any).rSlider({
            target: item,
            values: ['1dk', '3dk', '5dk', '10dk', '15dk', '25dk'],
            range: false,
            set: ['5dk'],
            tooltip: false,
            onChange: function (vals: any) {
                console.log(vals);
            }
        });
    }
}

class ActiveToggle implements ModuleType {
    selector: string = '.active-toggle';

    init() {
        document.querySelectorAll(this.selector).forEach(item => {
            item.addEventListener('click', this.onClick.bind(this))
        })
    }

    onClick(e: HTMLElement | any) {
        let item: HTMLElement = e.target;
        if (!item.className.includes(this.selector)) {
            item = item.closest(this.selector);
        }

        if (item.dataset.target) {
            item = item.closest(item.dataset.target);
        }

        item.classList.toggle('active');
    }

}

class CoinCompare implements ModuleType {
    selector: string = '.coin-compare-convert';

    init() {
        document.querySelectorAll(this.selector).forEach(e => {
            this.setOrder(e as any);
            e.addEventListener('click', this.onClick);
        })
    }

    setOrder(e: HTMLSpanElement) {
        let span: HTMLElement = e;
        let wrapper = span.closest('.coin-compare');
        let list = wrapper.querySelector('.coin-compare-list');
        let items = list.querySelectorAll('.coin-compare-item');

        items.forEach((item, index) => {
            let t = item as HTMLDivElement;
            t.style.order = index.toString();
        })
    }

    onClick(e: any) {
        let span: HTMLElement = e.target;
        let wrapper = span.closest('.coin-compare');
        let list = wrapper.querySelector('.coin-compare-list');
        let items = list.querySelectorAll('.coin-compare-item');

        items.forEach((item, index) => {
            let t = item as HTMLDivElement;
            let order = Number(t.style.order);
            if (order > 0) {
                order--;
            } else {
                order++;
            }

            if (order === 0) {
                t.classList.add('first')
            } else {
                t.classList.remove('first')
            }

            t.style.order = order.toString();
        });
    }
}

class PhoneInput implements ModuleType {
    selector: string = '.phone-input';

    init() {
        document.querySelectorAll(this.selector).forEach(input => {
            input.addEventListener('input', this.onKeyUp);
            input.addEventListener('keydown', this.onKeyUp)
        })
    }

    onKeyUp(e: any) {
        let val = e.target.value.replace(/\D/g, '').toString();
        let newVal = new (window as any).StringMask('(000) 000 00 00').apply(val);
        if (e.keyCode === 8) {
            newVal = String(newVal.replace(/\D/g, ''))
            newVal = newVal.slice(0, newVal.length - 1);
            newVal = new (window as any).StringMask('(000) 000 00 00').apply(newVal);
        }
        e.target.value = newVal;
    }
}

class CharFilter implements ModuleType {
    selector: string = '.char-filter-btn';
    init() {
        document.querySelectorAll(this.selector).forEach((btn, index) => {
            if (index === 0) {
                this.filter(btn as any);
            }
            btn.addEventListener('click', this.onClick.bind(this))
        })
    }

    onClick(e: any) {
        let btn: HTMLLinkElement = e.target;
        this.filter(btn);

    }

    filter(btn: HTMLLinkElement) {
        let char: string = btn.dataset.char || '';
        let wrapper = btn.closest('.char-filter-area');
        let charLists = wrapper.querySelectorAll('.char-list');
        wrapper.querySelectorAll(this.selector).forEach(charBtn => {
            if (charBtn === btn) {
                charBtn.classList.add('active')
            } else {
                charBtn.classList.remove('active')
            }
        })

        charLists.forEach((charItem: HTMLDivElement) => {
            let listChar: HTMLSpanElement = charItem.querySelector('span.char');
            if (String(char) === '#') {
                console.log('show all')
                charItem.classList.remove('hide')
                return;
            }
            if (!listChar.dataset.char) return;
            if (char !== String(listChar.dataset.char)) {
                charItem.classList.add('hide')
            } else {
                charItem.classList.remove('hide')
            }
        })
    }
}

class TabModule implements ModuleType {
    selector: string = '.tab-wrapper';

    init() {
        document.querySelectorAll(this.selector).forEach(tabWrapper => {
            tabWrapper.querySelectorAll('.tab-btn').forEach((tabBtn, index) => {
                if (index === 0) {
                    this.proccess(tabBtn);
                }
                tabBtn.addEventListener('click', this.onClickTabBtn.bind(this));
            });

        })
    }

    onClickTabBtn(e: any) {
        this.proccess(e.currentTarget);
    }

    proccess(thisBtn: any) {
        let wrapper = thisBtn.closest('.tab-wrapper');
        wrapper.querySelectorAll('.tab-btn').forEach((btn: any) => {
            if (btn === thisBtn) {
                btn.classList.add('active')
                return;
            }

            btn.classList.remove('active')
        })

        wrapper.querySelectorAll('.tab-item').forEach((tab: any) => {
            let t: HTMLDivElement = tab as any;
            if (t.dataset.tab === thisBtn.dataset.target) {
                t.classList.add('active');
                return;
            }
            t.classList.remove('active');
        });
    }
}

class ActiveToggleTarget implements ModuleType {
    selector: string = '.toggle-target';

    init() {
        document.querySelectorAll(this.selector).forEach(btn => {
            btn.addEventListener('click', this.onClick);
        })
    }

    onClick(e: any) {
        let source:HTMLElement = e.currentTarget;
        if(!source || !source.dataset.target) return;
        let target = source.dataset.target;
        let targethtml = document.querySelector(target);
        if(!targethtml) return;
        targethtml.classList.toggle('show');
    }

}

// Init App
const app = new App([
    new MenuCollapseModule(),
    new FilterArea(),
    new MenuDropdown(),
    new InputRange(),
    new ActiveToggle(),
    new CoinCompare(),
    new PhoneInput(),
    new CharFilter(),
    new TabModule(),
    new ActiveToggleTarget()
])