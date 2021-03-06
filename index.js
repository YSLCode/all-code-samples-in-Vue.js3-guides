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

// ############################################################################### //

// *** The Root Component ***

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

// ################### Component Instance Properties ##########################

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

//############################# Lifecycle Hooks ###############################

// Each component instance goes through a series of initialization steps when
// it's created - for example, it needs to set up data observation, compile
// the template, mount the instance to the DOM, and update the DOM when data
// changes.Along the way, it also runs functions called lifecycle hooks, giving
// users the opportunity to add their own code at specific stages.

// For example, the "created" hook can be used to run code after
// an instance is created: