# Solving Complexity

This document is about solving
[Facebook's CSS complexity problems](https://speakerdeck.com/vjeux/react-css-in-js)
with the [futuristic-sass-guide](https://github.com/gilbox/futuristic-sass-guide)
(the FSG).

Facebook's challenges are applicable to any very complex websites with many developers.
Or any situation where CSS is bundled into multiple files and loaded asynchronously,
and often loaded lazily.

## Terminology

Terms below like [CSS Module](https://github.com/gilbox/futuristic-sass-guide#modules),
[CSS Module Element](https://github.com/gilbox/futuristic-sass-guide#element),
and [utility classes](https://github.com/gilbox/futuristic-sass-guide#simple-rules)
are references to definitions within the FSG.


## 1 Globals

Modules solve global variable issues with organization and naming.
TitleCase naming with all modules in the same folder makes it impossible
to have class-name conflicts. A TitleCased class name *must* only reside
in a file with the same name inside of the `modules` directory.

All other classes within a module are namespaced by the module's name
and thus are all deliberately private. Any class namespaced
with a module's name can only exist within the file of the same name.
For example, the class `.IconButton-icon` must only live inside of
`/modules/_IconButton.scss`.

Facebook's solution to public variables was to make most variables
private, and allow exporting public variables explicitly as needs.
This solution is brittle and creates difficult to manage dependencies between CSS modules
as well as requiring strict ordering of rules which is problematic in
an application with multiple style sheets.


## 2 Dependencies

We think of CSS Modules inside of the `modules/` folder as
dependencies of our javascript components.
The FSG says nothing specific about the relationship between
your javascript code and the CSS modules. That is, there is
no explicit dependency management. You are expected to list
required CSS modules inside of application.scss.

A simplified version of facebook's `cx()` function (there is no
need for their namespacing features) and tooling can manage dependencies
automatically the same way it does now.


## 3 Dead Code Elimination

grep for a module name and if it doesn't appear in the context
of a CSS class then we can remove the module file as a dependency.
We are guaranteed that module files will not contain any selectors that
don't relate to them, nor placeholders nor mixins that are used
by any other scss files.


## 4 Minification

Facebook's `cx()` function and tooling could handle minification the same way it
does now.


## 5 Sharing constants

I've never found a good solution for this.


## 6 Non-Deterministic Resolution

Facebook was applying classes from multiple CSS Modules
to a single element:

    <div className={cx(
      'buton/container/public',
      'overlay-button/container'
    )} />

This presented load-order problems with asynchronously loaded
CSS bundles. With the FSG we almost have completely eliminated
the possibility of this even happening. Just one more constraint,
and problem solved:

> ***Modules may not share common elements***

Without this new rule, the FSG allowed a parent Module to sublass a child Module like this:

    <div class="ParentModule">
        <div class=ChildModule ParentModule-child">...</div>
    </div>

However, with this new rule, if we have a module nested inside of
another module, the parent may only indirectly affect it's child by wrapping it:

    <div class="ParentModule">
      <div class="ParentModule-child">
        <div class=ChildModule">...</div>
      </div>
    </div>

Because of module rules, there is no way for `_ParentModule.scss` to directly effect
`.ChildModule` or any `.ChildModule`-namespaced classes (aka CSS Module Elements).

Now the order in which we include modules is irrelevant. We are
free to load CSS asynchronously and lazily without negative repercussions.
Note that the order of rules within a single module file is still relevant,
so when bundling files a single module may not be split across multiple bundles.

Of course, we have been ignoring utility classes. There are various approaches
to deal with utility classes. Here is the simplest:

> ***Option 1: Always load all utility classes before loading any modules.***

But then we lose the ability to load utilities asynchronously. Here's an alternative
that solves the async problem:

> ***Option 2: Make all utility classes `!important`***

This may sound like blasphemy, but it makes sense if we think of utility classes
as overrides. Everything else is a module. Of course, **this means that we may never
use `!important` inside of CSS Module**, but that's not a terribly difficult restriction to
adhere to.


## 7 Breaking Isolation

Facebook's challenge is that although they try to use modular encapsulation,

> [developers] have the ability to modify the style of the internals
> via selectors. The override looks like regular CSS, so it's often not being
> caught by code review. It's also nearly impossible to write lint rules
> against it. When this code gets checked in, it puts the maintainer of the
> component in a very bad spot because when he changes the internals of the
> component, she is going to break all those call sites. It makes you feel fearful
> of changing code which is very bad. --vjeux

The example that Facebook's vjeux give's of such a selector looks like:

    .product/button > div {
      /* override everything ! */
    }

The FSG doesn't allow modules to contain any class name other than those
namespaced by the module name. Combine this with a slight tweak of the following
FSG rule, and this problem is (almost) completely solved:

> Use class selectors instead of element or attr selectors in ~~most~~ **all** cases.

Note that the FSG does allow the use of state classes (`is-`) pretty much anywhere in the markup.
How do we prevent state classes from inviting developers to circumvent the linter?
Well, since state classes are not allowed to have styles of their own we can
augment our linter to disallow any rule with a state rule at the end of it.

So now the following is allowed:

    .is-someState.MyModule { ... }

But this isn't:

    .MyModule .is-someState { ... }

So now it becomes trivial to create tooling that prevents encapsulation-busting selectors.


# Caveats

- Tooling is still required
- All problems aren't solved (notably 5 Sharing constants)
- A lot of rules to follow
- Legacy code can make it difficult to follow the rules.
However, it might be possible to transition from legacy code fairly painlessly
if TitleCased class selectors were never used previously


# Conclusion

Solving these challenges is really hard. Although I think we can come pretty
close to a satisfactory solution, it's still far from ideal.
Thus, I am intrigued by Facebook's **CSS in JS** approach and how easily it solves
the problems above, and will definitely be looking at it some more.
