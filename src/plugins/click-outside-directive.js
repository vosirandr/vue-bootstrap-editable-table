const ID = 'click-outside';

const isTouch = (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.msMaxTouchPoints > 0))
);

const EVENTS = isTouch ? ['touchstart'] : ['click'];

function processDirectiveArguments(bindingValue) {
    const isFunction = typeof bindingValue === 'function';

    if (!isFunction && typeof bindingValue !== 'object') {
        throw new Error('click-outside: Binding value must be a function or an object');
    }

    return {
        handler: isFunction ? bindingValue : bindingValue.handler,
        middleware: bindingValue.middleware || ((item) => item),
        events: bindingValue.events || EVENTS,
        isActive: !(bindingValue.isActive === false)
    };
}

function onEvent({el, event, handler, middleware}) {
    const path = event.path || (event.composedPath && event.composedPath());
    const isClickOutside = path ? path.indexOf(el) < 0 : !el.contains(event.target);

    if (!isClickOutside) return;

    if (middleware(event)) {
        handler(event);
    }
}

const directive = {
    bind(el, {value}) {
        const {
            events,
            handler,
            middleware,
            isActive
        } = processDirectiveArguments(value);

        if (!isActive) return;

        el[ID] = events.map((eventName) => ({
            event: eventName,
            handler: (event) => onEvent({event, el, handler, middleware})
        }));

        el[ID].forEach(({event, handler}) =>
            setTimeout(() => {
                if (!el[ID]) return;

                document.documentElement.addEventListener(event, handler, false);
            }, 0)
        );
    },
    unbind(el) {
        const handlers = el[ID] || [];

        handlers.forEach(({event, handler}) =>
            document.documentElement.removeEventListener(event, handler, false)
        );

        delete el[ID];
    },
    update(el, {value, oldValue}) {
        if (JSON.stringify(value) === JSON.stringify(oldValue)) return;

        directive.unbind(el);
        directive.bind(el, {value});
    }
};

const exportDirective = (typeof window !== 'undefined') ? directive : {};

const plugin = {
    install(Vue) {
        Vue.directive('click-outside', exportDirective);
    },
    exportDirective,
};

// export default plugin;
import Vue from 'vue';

Vue.use(plugin);
