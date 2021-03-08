// Every Vue application starts by creating a new application instance with the
// createApp function:

const app = Vue.ceateApp({
    /* Options */
});

// The application instance is used to register 'globals' that can then be used
// by components within that application.

const app = Vue.createApp({});
app.component("SearchInput", SearchInputComponent);
app.directive("focus", FocusDirective);
app.use(LocalePlugin);

// Most of the methods exposed by the application instance return that same
// instance, allowing for chaining:

Vue.createApp({})
    .component("SearchInput", SearchInputComponent)
    .directive("focus", FocusDirective)
    .use(LocalePlugin);

// You can browse the full application API in the API reference.

// #####################  The Root Component  ###########################


// The options passed to createApp are used to configure the root component.
// That component is used as the starting point for rendering when we mount
// the application.
// An application needs to be mounted into a DOM element. For example, if we
// want to mount a Vue application into <div id = "app" ></div>, we should pass
// #app:
const RootComponent = {
    /* options */
};
const app = Vue.createApp(RootComponent);
const vm = app.mount("#app");

// Unlike most of the application methods, mount does not return the
// application.Instead it returns the root component instance.

// As a convention, we often use the variable vm (short for ViewModel) to
// refer to a component instance.

// While all the examples on this page only need a single component, most real
// applications are organized into a tree of nested, reusable components.For
// example, a Todo application's component tree might look like this:

`Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics`;
//   Each component will have its own component instance, vm. For some
// components, such as TodoItem, there will likely be multiple instances
// rendered at any one time.All of the component instances in this application
// will share the same application instance.

// that the root component isn't really any different from any other component.
// The configuration options are the same, as is the behavior of the
// corresponding component instance.

// #####################  Component Instance Properties  ###########################


//Earlier in the guide we met data properties. Properties defined in data are
// exposed via the component instance:

const app = Vue.createApp({
    data() {
        return { count: 4 };
    },
});

const vm = app.mount("#app");

console.log(vm.count); // => 4

// There are various other component options that add user-defined properties
// To the component instance, such as methods, props, computed, inject and setup
// All of the properties of the component instance, no matter how they are
// defined, will be accessible in the component's template.

// Vue also exposes some built-in properties via the component instance, such
// as $attrs and $emit.These properties all have a $ prefix to avoid
// conflicting with user - defined property names.

// #####################  Lifecycle Hooks ###########################

// Each component instance goes through a series of initialization steps when
// it's created - for example, it needs to set up data observation, compile
// the template, mount the instance to the DOM, and update the DOM when data
// changes.Along the way, it also runs functions called lifecycle hooks, giving
// users the opportunity to add their own code at specific stages.

// For example, the "created" hook can be used to run code after
// an instance is created:
Vue.createApp({
    data() {
        return { count: 1 };
    },
    created() {
        // `this` points to the vm instance
        console.log("count is: " + this.count); // => "count is: 1"
    },
});

// There are also other hooks which will be called at different stages of the
// instance's lifecycle, such as mounted, updated, and unmounted. All
// lifecycle hooks are called with their this context pointing to the current
// active instance invoking it.

// *TIP*
// Don't use arrow functions (opens new window)on an options property or
// callback, such as created: () => console.log(this.a) or vm.$watch('a',
// newValue => this.myMethod()).Since an arrow function doesn't have a this,
// this will be treated as any other variable and lexically looked up through
// parent scopes until found, often resulting in errors such as Uncaught
// TypeError: Cannot read property of undefined or Uncaught TypeError: this.
// myMethod is not a function.

// #####################  Lifecycle Diagram  ###########################

// Below is a diagram for the instance lifecycle. You don't need to fully
// understand everything going on right now, but as you learn and build more,
// it will be a useful reference.  ** https://v3.vuejs.org/images/lifecycle.svg **

// #####################  Template Syntax  ###########################
// Vue.js uses an HTML-based template syntax that allows you to declaratively
// bind the rendered DOM to the underlying component instance's data. All Vue.
// js templates are valid HTML that can be parsed by spec - compliant browsers
// and HTML parsers.

// Under the hood, Vue compiles the templates into Virtual DOM render functions.
// Combined with the reactivity system, Vue is able to intelligently figure out
// the minimal number of components to re - render and apply the minimal amount
// of DOM manipulations when the app state changes.

// If you are familiar with Virtual DOM concepts and prefer the raw power of
// JavaScript, you can also directly write render functions instead of templates,
// with optional JSX support. **https://v3.vuejs.org/guide/render-function.html**

// #####################  Interpolations  ###########################

// # Text

// The most basic form of data binding is text interpolation using the
// "Mustache" syntax(double curly braces):
("<span>Message: {{ msg }}</span>");

// The mustache tag will be replaced with the value of the msg property from
// the corresponding component instance.It will also be updated whenever
// the msg property changes.

// You can also perform one-time interpolations that do not update on data
// change by using the v - once directive, but keep in mind this will also
// affect any other bindings on the same node:
("<span v-once>This will never change: {{ msg }}</span>");

// # Raw HTML

// The double mustaches interprets the data as plain text, not HTML. In order
// to output real HTML, you will need to use the v - html directive:
`<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>`;

// The contents of the span will be replaced with the value of the rawHtml property,
// interpreted as plain HTML - data bindings are ignored.Note that you
// cannot use v - html to compose template partials, because Vue
// is not a string - based templating engine.Instead, components are preferred
// as the fundamental unit for UI reuse and composition.

// *TIP

// Dynamically rendering arbitrary HTML on your website can be very dangerous
// because it can easily lead to XSS vulnerabilities(opens new window).Only use
// HTML interpolation on trusted content and never on user - provided content

// # Attributes

// Mustaches cannot be used inside HTML attributes. Instead,
// use a v - bind directive:
`<div v-bind:id="dynamicId"></div>`;

// If the bound value is null or undefined then the attribute will not be
// included on the rendered element.
`<button v-bind:disabled="isButtonDisabled">Button</button>`;

// The disabled attribute will be included if isButtonDisabled has a truthy value.
// It will also be included if the value is an empty string, maintaining
// consistency with <button disabled="">. For other falsy values the attribute
// will be omitted.

// # Using JavaScript Expressions

// So far we've only been binding to simple property keys in our templates. But
// Vue.js actually supports the full power of JavaScript expressions inside all
// data bindings:
`{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>`;

// These expressions will be evaluated as JavaScript in the data scope of
// the current active instance.One restriction is that each binding can only
// contain one single expression, so the following will NOT work:

// this is a statement, not an expression:
`{{ var a = 1 }}`;
// flow control won't work either, use ternary expressions
`{{ if (ok) { return message } }}`;

// # Directives

// Directives are special attributes with the v- prefix. Directive attribute
// values are expected to be a single JavaScript expression(with the exception
// of v -for and v - on, which will be discussed later).A directive's job is
// to reactively apply side effects to the DOM when the value of its expression
// changes.Let's review the example we saw in the introduction:
`<p v-if="seen">Now you see me</p>`;
// Here, the v-if directive would remove/insert the <p> element based on the
// truthiness of the value of the expression seen.

// # Arguments

// Some directives can take an "argument", denoted by a colon after
// the directive name.For example, the v - bind directive is used to reactively
// update an HTML attribute:
('<a v-bind:href="url"> ... </a>');
// Here href is the argument, which tells the v-bind directive to bind
// the element's href attribute to the value of the expression url.

// Another example is the v-on directive, which listens to DOM events:
('<a v-on:click="doSomething"> ... </a>');
// Here the argument is the event name to listen to. We will talk about
// event handling in more detail too

// # Dynamic Arguments

// It is also possible to use a JavaScript expression in a directive argument
// by wrapping it with square brackets:
// Note that there are some constraints to the argument expression, as explained
// in the "Dynamic Argument Expression Constraints" section below.
('<a v-bind:[attributeName]="url"> ... </a>');
// Here attributeName will be dynamically evaluated as a JavaScript expression,
// and its evaluated value will be used as the final value for the argument.For example,
// if your component instance has a data property, attributeName, whose value
// is "href", then this binding will be equivalent to v - bind: href.

// Similarly, you can use dynamic arguments to bind a handler to
// a dynamic event name:
('<a v-on:[eventName]="doSomething"> ... </a>');
// In this example, when eventName's value is "focus", v-on:[eventName] will be
// equivalent to v - on: focus

// # Modifiers

// Modifiers are special postfixes denoted by a dot, which indicate that
// a directive should be bound in some special way.For example, the.prevent
// modifier tells the v - on directive to call event.preventDefault() on
// the triggered event:
('<form v-on:submit.prevent="onSubmit">...</form>');
// You'll see other examples of modifiers later, for v-on and for v-model,
// when we explore those features

// # Shorthands

// The v- prefix serves as a visual cue for identifying Vue-specific attributes
//  in your templates.This is useful when you are using Vue.js to apply dynamic
// behavior to some existing markup, but can feel verbose for some frequently
// used directives.At the same time, the need for the v - prefix becomes
// less important when you are building a SPA(opens new window), where Vue
// manages every template.Therefore, Vue provides special shorthands for two of
// the most often used directives, v - bind and v - on:

//#v-bind Shorthand
`<!-- full syntax -->
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>

<!-- shorthand with dynamic argument -->
<a :[key]="url"> ... </a>`;

//#v-on Shorthand
`<!-- full syntax -->
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>

<!-- shorthand with dynamic argument -->
<a @[event]="doSomething"> ... </a>`;

// They may look a bit different from normal HTML, but : and @ are valid characters
// for attribute names and all Vue - supported browsers can parse it correctly.
// In addition, they do not appear in the final rendered markup.The shorthand
// syntax is totally optional, but you will likely appreciate it when you learn
// more about its usage later.

//#Caveats

//Dynamic Argument Value Constraints

// Dynamic arguments are expected to evaluate to a string, with the exception
// of null.The special value null can be used to explicitly remove the binding.
// Any other non - string value will trigger a warning.

//Dynamic Argument Expression Constraints

// Dynamic argument expressions have some syntax constraints because certain
// characters, such as spaces and quotes, are invalid inside HTML attribute names.
// For example, the following is invalid:
`<!-- This will trigger a compiler warning. -->
<a v-bind:['foo' + bar]="value"> ... </a>`;
// We recommend replacing any complex expressions with a computed property,
// one of the most fundamental pieces of Vue, which we'll cover shortly.

// When using in-DOM templates (templates directly written in an HTML file),
// you should also avoid naming keys with uppercase characters, as browsers
// will coerce attribute names into lowercase:
`<!--
This will be converted to v-bind:[someattr] in in-DOM templates.
Unless you have a "someattr" property in your instance, your code won't work.
-->
<a v-bind:[someAttr]="value"> ... </a>`;

//JavaScript Expressions

// Template expressions are sandboxed and only have access to a whitelist of globals
// (opens new window) such as Math and Date.You should not attempt to access 
// user defined globals in template expressions.