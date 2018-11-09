CSS Bliss
=========

A CSS style guide for small to enormous projects, without all that pomp and cruft. Many ideas borrowed from [BEM](http://bem.info), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/), [SUITECSS](https://github.com/suitcss). This style guide uses SCSS. However, the only truly beneficial preprocessor-specific features we discuss are [**variables**, **mixins**, and **partials**](http://sass-lang.com/guide). Therefore, this guide will be useful for any preprocessor or no preprocessor at all as there is very little focus on features that aren't already part of vanilla CSS.

---
There is now a [**Walkthrough**](http://gilbox.github.io/css-bliss/walkthrough/release/). If you have never used BEM, SMACSS, or similar, reading the Walkthrough is highly recommended.

---
There is now a **[linter](https://github.com/gilbox/blint)**. 
Enforcing `css-bliss` rules without it is very difficult.

----

- [General](#general)
- [Naming](#naming)
- [Building Blocks](#building-blocks)
- [Encapsulation](#encapsulation)
- [Semantics](#semantics)
- [Comments](#comments)
- [%placeholder](#placeholder)
- [@extend](#extend)
- [@mixin](#mixin)
- [$variable](#variable)
- [DRY](#dry)
- [Directory Structure and File Naming](#directory-structure-and-file-naming)
- [Positioning a Module inside of a Module](#positioning-a-module-inside-of-a-module)
- [z-index](#z-index)
- [Namespacing](#namespacing)
- [Linter](#linter)
- [Solving Complexity](#solving-complexity)
- [Common Mistakes](#common-mistakes)
- [Additional Resources](#additional-resources)
- [The Future](#the-future)

----

If you have questions, comments, or suggestions please [open an Issue](https://github.com/gilbox/css-bliss/issues). And of course, [PRs](https://github.com/gilbox/css-bliss/pulls) are welcome.

----

# General

- Use class selectors instead of element or attr selectors in most cases.
- Sass gives us too much power; in part the purpose of this guide is to restrict our use of that power.
- Try to avoid nesting, except as described in the DRY section.
- **Keep [Modules](#module) small**. When in doubt, create a new [Module](#module) instead of bloating an existing [Module](#module).
- A class name will almost never have more than 3 dashes, ie: `.MyModule-myElement--myModifier`
- Be sure to click the `[ pen ]` links as you encounter them below.

# Naming

TitleCase [Modules](#module), camelCase [Elements](#element). why-not-dashes ? Because cased names are more readable (very objective explanation, I know). Furthermore, if we see a class name that doesntStartWithTitleCase we know that it's not a module.

**Note**: The following example does *not* match the conventions laid out in the [DRY](#dry) section because **this is the compiled CSS code, *not* the Sass code**.

    .MyModule {
      ...
    }
    
    .MyModule-myElement {
      ...
    }
    
    .MyModule-myElement--modifier {
      ...
    }

    .MyModule--modifier .MyModule-myElement {
      ...
    }
    
    .MyModule.isState {
      ...
    }
    
    .mySimpleRule {
        ...
    }
    

# Building Blocks

## Module

- `.TitleCase`
- Self-contained
- Cannot be `@extend`ed to create [Module Modifiers](#module-modifier)
- Most Modules should not set their own width, margin, and positioning. By authoring a module to be **full-width or inline**, it can better adapt to the dimensions of an ancestral context. [(source)](https://github.com/suitcss/suit/blob/master/doc/components.md#adapting-to-ancestral-context)
    - No margin
    - No top, left, right, bottom
    - 100% width, or auto width

## Module Modifier

[`[ pen ]`](http://codepen.io/gilbox/pen/cDkzn?editors=010)

- `--camelCase`
- Could possibly define margin, top, left, right, or bottom but should probably be avoided in most cases.
- Subclasses a Module
- Do not `@extend` a Module to create a Module Modifier
- Do not `@extend` a Module Modifier to create another Module Modifier

## Element

- `-camelCase`
- Each element has an associated module ie: `.MyModule-myElement`
- Nesting [Modules](#module) should **not** effect the appearance of any Element. 
- Apply at most **one** Element class per DOM element.

## Element Modifier

- `--camelCase`
- Each modifier has an associated [Element](#element) ie: `.MyModule-myElement--myModifier`
- Nesting [Modules](#module) should **not** effect the appearance of any Element Modifier. 
- Subclasses an [Element](#element)

## State

- `.isCamelCase` (formerly `.is-camelCase`)
- Often, but not necessarily used in conjunction with JavaScript
- **No** style except in context with another rule. For example: `.MyModule.isState`, `.MyModule-myElement.isState`, `.MyModule-myElement--myModifier.isState`, `.isState .MyModule-myElement`, etc.

## Utility Classes (aka Simple Rules)

- `.camelCase`
- Utility Classes `.may-containDashes` when the dashed word might imply very similar meaning as a function argument does in javascript. A good use-case for dashed utility classes are device-specific classes such as `.col2-mobile`, `.col2-tablet`, etc.
- These rules should be completely flat. They include what are often called [utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName) and [layout rules](http://smacss.com/book/type-layout).

    
## Encapsulation

Modules promote strict encapsulation. We achieve encapsulation thusly:

- No module may ever effect any other module by creating a selector that
  reaches inside of another module.
- **All** classes inside of a module file are namespaced by the module's name
  (with the notable exception of state (`.is`) classes)
- To achieve the strictest form of encapsulation,
  no DOM element should ever be assigned module-namespaced classes from more than one module.


# Semantics

**When choosing class names, try to ignore function, and concentrate on style.** Just because we have a section on our website named *music* doesn't mean that we should name our music-related card [Module](#module) `MusicCard`. Sure, we can name it `MusicCard` if similar cards do not appear anywhere else on the website. Otherwise, name it `Card` instead. (Since we probably can't know for sure whether the same card might later be added to a new section of the site, when naming classes make a judgement call based on the information available at the time and don't try to plan too far into the future.)

And now that we have our `Card` module, if we need a [modifier](#module-modifier) for a green-tinted card in the section we're currently working on (which happens to be the music section) name it `Card--greenTint`. If your modifier truly is specific to the music section then `Card--music` is OK when a more stylistically descriptive name doesn't present itself.

There is a lot of seemingly conflicting information about CSS semantics. Some people say to name your class by function like this:

    <div class="FacebookBtn">FB</div>
    
instead of

    <div class="Btn">FB</div>
    
However, we favor the second approach. Using the `.FacebookBtn` class name is convenient when you're using a library like jQuery because it keeps your markup and jQuery selector code semantically correct. However, with HTML5 and modern frameworks like angularjs the markup is already semantically correct via the use of custom element naming, attributes, and event handlers which declaratively describe the content and its function.

What about our Jasmine unit tests which are heavy with jQuery selectors? If class names are *un-semantic* does that force us to write unit tests that break when simple stylistic changes are made to the interface? Not if we favor the use of attribute and element selectors in our unit tests which generally means the tests will only break when functionality changes.

# Comments

Above each [Module](#module), describe the purpose of the [Module](#module), as well as it's scope. Be restrictive and specific so that when someone else looks at it and needs to add some styling, they will know if they should add-on to the [Module](#module) or create a new one.

    // A floating dialog with dropshadow, rounded borders, and a header.
    // Includes the header text, but not any buttons and none of the other content inside of the dialog.
    .PopupDialog {
        ...
    }
    
Note that in the example above, the comment answers the question, **what *is* and *isn't* a PopupDialog Module allowed to style?**. Later, if one of our teammates wants to add a close button to this dialog, they can read this comment and determine that the close button should probably be a Module in it's own right, and not an element of the `PopupDialog` module.

# %placeholder

- **Naming:** `%MyModule-placeholderDescriptor`
- **Restrictions:** 
     - Placeholders may only be declared inside of [Modules](#module). ([why?](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/))
     - [Modules](#module) may only use placeholders declared inside of them.
     - A placeholder declared inside of a [Module](#module) may not be used anywhere else.
     
The [next section](#extend) discusses why we should avoid using `@extend`. However if we do use `@extend` despite our trepedations, we will try to restrict its use to placeholders.  And as we should with any `@extend`ed class, **keep `%placeholders` flat**, [here's why](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html).

    %placeholder {
      // avoid nesting .anyClassRules at any cost...
      .dontDoThis { ... }
    }

`%placeholder`s should be small pieces of reusable styling, and [they should do one thing and do it well](http://en.wikipedia.org/wiki/Single_responsibility_principle).


# @extend

Don't `@extend` [Modules](#module) to create [Module Modifiers](#module-modifier) because 

1. keeping modules totally flat may be near impossible
2. `@extend` can result in more code than simple subclassing
3. `@extend` is incompatible with media queries
4. `@extend` makes understanding the cascade of SCSS code very difficult

What about using `@extend` in other rules? **In most cases, using `@extend` can lead to confusion and should probably be avoided.**

# @mixin

When a `@mixin` is declared **inside of a [Module](#module)**:

- **Naming:** `@MyModule-mixinDescriptor`
- It may not be used outside of the [Module](#module) in which it is declared.

When a `@mixin` is declared **outside of a [Module](#module)**:

- **Naming:** `@mixinDescriptor`
- It should not generate complex nested structures.

# $variable

When a `$variable` is declared **inside of a [Module](#module)**:

- **Naming:** `$MyModule-variableDescriptor`
- It may not be used outside of the [Module](#module) in which it is declared.

The purpose of this rule is to make it easy to identify local vs global variables.

# DRY

[`[ pen ]`](http://codepen.io/gilbox/pen/lKAIL?editors=010)


    .MyModule {
      ...
      &-myElement {
        ...
      }
      
      &-myOtherElement {
        ...
      }
      
      &-myOtherElement--myModifier {
        ...
      }
      
      &-myOtherElement--anotherModifier {
        ...
      }
    }
    
and module modifiers:

    .MyModule--myModifier {
      ...
      .MyModule-myOtherElement {
        ...
      }
        
      .MyModule-myOtherElement--anotherModifier {
        ...
      }
    }
    
    
A downside is that doing a full-text search for a class won't take us where we need to go, but if the naming convention is well-established we'll have that in mind when searching anyway.

This DRY approach prevents `@extend`ing [*Elements*](#element) and [*Element Modifiers*](#element-modifier). This is good because `@extend`ing these nested classes creates confusing and difficult to maintain code.

# Directory Structure and File Naming

Create a new file for each [Module](#modules) and it's [Module Modifiers](#module-modifier) and save inside of the `modules` directory. Use TitleCase naming for module files and dashed-names for everything else. The following example suggests putting non-module rules alongside `application.scss` in the `css` dir.

    css
     ├─── modules
     |     ├──── _PopupDialog.scss
     |     ├──── _Btn.scss
     |     └──── _ElmInfo.scss
     ├─── _base.scss
     ├─── _colors.scss
     ├─── _mixins.scss
     ├─── _zindex.scss
     └─── application.scss
     
In the example above, the Sass compiler is compiling `application.scss` and all of the other files are being `@import`ed from `application.scss` (is this the best way?).

Use the Sass underscore naming convention whereby **all partials begin with underscore**.
 
# Positioning a Module inside of a Module

We will inevitably want to nest [Modules](#module) inside of modules. There are [various ways](http://stackoverflow.com/questions/24724929/smacss-and-bem-how-to-position-module-inside-of-a-module) that we could possibly position one [Module](#module) inside of another. In most cases we should **subclass the child [Module](#module) with an [*Element*](#element) class in the parent [Module](#module)**. 

## Preferred approach using Element

[`[ pen ]`](http://codepen.io/gilbox/pen/fwBhe?editors=010)

Here we wrap the `.Btn` element with an `.PopupDialog-closeBtn` element:

### SCSS

    // modules/_Btn.scss
    .Btn {
      ...
    }

    // modules/_PopupDialog.scss
    .PopupDialog {
      ...
      &-closeBtn {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    
### Markup

    <div class="PopupDialog">
      ...
      <div class="PopupDialog-closeBtn">
        <button class="Btn"><i class="closeIco"></i> close</btn>
      </div>
    </div>

Note that the above approach is extremely flexible. If we want to swap out the `Btn` module for a different button module, it won't require any CSS changes. (And if we have a [pattern](http://ux.mailchimp.com/patterns) [library](http://alistapart.com/blog/post/getting-started-with-pattern-libraries), such a change will be as simple as copy-and-pasting some [markup](http://patterns.alistapart.com/).)

Note also that if we wish to completely avoid Module file load-order specificity bugs and/or we need to load multiple CSS files asynchronously, `PopupDialog-closeBtn` shouldn't subclass `.Btn`, but instead [wrap it inside of another `<div>`](https://github.com/gilbox/css-bliss/blob/master/solving-complexity.md#6-non-deterministic-resolution) as we've done here.

## Alternate approach using Module Modifier

[`[ pen ]`](http://codepen.io/gilbox/pen/LbKml?editors=010)

Here we subclass `.Btn` with `.Btn--pullRight`:

### SCSS

    .Btn {
      ...
    }
    
    .Btn--pullRight {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
### Markup

    <div class="PopupDialog">
      ...
      <button class="Btn Btn--pullRight"><i class="closeIco"></i> close</btn>
    </div>
    
Note that the above approach is inflexible because in the future we won't be able to easily swap out the button without refactoring the css. Also, since it creates an unpredictable parent-child module positioning relationship the code is fragile which will make it more difficult to maintain.

# z-index

A ***globally-scoped*** z-index is any z-index who's [stacking context](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) is the `<html>` tag or another tag which we deem to be the top-level stacking context of the page.

All ***globally-scoped*** z-index rules should reference `$zindexVariables` in `_zindex.scss`. This [creates a central place](http://css-tricks.com/handling-z-index/) to manage z-indexes across the application.

Note that there are many ways to create a stacking context, these [three](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) are the most common:

> 1. When an element is the root element of a document (the `<html>` element)
> 2. When an element has a position value other than static and a z-index value other than auto
> 3. When an element has an opacity value less than 1

# Namespacing

I don't like how it negatively effects readability, but if we need to namespace, prepend a lowercase two or three letter abbreviation.

    .ns-MyModule {
      ...
    }
    
# Linter

The css-bliss linter is **[blint](https://github.com/gilbox/blint)**, 
it helps enforce the naming conventions and proper module structure. 
It is nearly impossible to maintain a modular css structure for a complex
web project without good tools to enforce the myriad of rules.

# Solving Complexity

[solving-complexity.md](https://github.com/gilbox/css-bliss/blob/master/solving-complexity.md)
is another document in this repo inspired by the challenges identified
by Facebook's [vjeux](https://speakerdeck.com/vjeux).
solving-complexity presents some additional guidelines, which, when applied
in addition to this guide
help to solve problems faced by the most complex websites.


# Common Mistakes

[common-mistakes.md](https://github.com/gilbox/css-bliss/blob/master/common-mistakes.md)
is a living document in this repo where I record common mistakes and their solutions.

# Additional Resources

- [include-media](https://github.com/eduardoboucas/include-media) - A nice way to handle @media queries.

# The Future

Unfortunately, in large part the need for something like css-bliss is a result of the poor scalability of vanilla CSS. There are various efforts in the works to drastically improve this situation. Most of this work is being conducted in the context of React, which is arguably the most cutting-edge JavaScript UI library. Some of these solutions are useable right now, while others are still experimental. Check out the following projects:

- [webpack CSS modules](https://github.com/css-modules/webpack-demo) (started with the article [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284))
- [react-inline](https://github.com/martinandert/react-inline)
- [react-in-style](https://github.com/ericwooley/react-in-style)
- [jsxstyle](https://github.com/petehunt/jsxstyle)
- [VirtualCSS](https://github.com/VirtualCSS/planning)
- [stilr](https://github.com/kodyl/stilr)
- [react-inline-style](https://github.com/dowjones/react-inline-style)
- [aphrodite](https://github.com/Khan/aphrodite)

