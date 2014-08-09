futuristic-sass-guide
=====================

My futuristic thoughts on structuring a SASS project. Ideas all stolen from [BEM](http://bem.info), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/), [SUITECSS](https://github.com/suitcss). 

- [General](#general)
- [Naming](#naming)
- [Building Blocks](#building-blocks)
- [Semantics](#semantics)
- [Comments](#comments)
- [%placeholder](#placeholder)
- [@extend](#extend)
- [DRY](#dry)
- [Directory Structure and File Naming](#directory-structure-and-file-naming)
- [Positioning a Module inside of a Module](#positioning-a-module-inside-of-a-module)
- [Namespacing](#namespacing)
- [Linter](#linter)

----

If you have questions, comments, or suggestions please [open an Issue](https://github.com/gilbox/futuristic-sass-guide/issues). And of course, [PRs](https://github.com/gilbox/futuristic-sass-guide/pulls) are welcome.

----

# General

- Use class selectors instead of element or attr selectors in most cases.
- SASS gives us too much power. In part the purpose of this guide is to restrict our use of that power.
- Try to avoid nesting, except as described in the DRY section.
- **Keep [Modules](#module) small**. When in doubt, create a new [Module](#module) instead of bloating an existing [Module](#module).
- A class name will never have more than 3 dashes, ie: `.MyModule-myElement--myModifier`
- Be sure to click the `[ pen ]` links as you encounter them below.

# Naming

Title-case [Modules](#module), camel-case [Elements](#element). why-not-dashes ? Because cased names are more readable (very objective explanation, I know). Furthermore, if we see a class name that doesntStartWithTitleCase we know that it's not a module. (**Note**: The following does *not* match the conventions laid out in the [DRY](#dry) section because **this is the compiled CSS code**, *not* the SASS code.)

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
    
    .MyModule.is-state {
      ...
    }
    
    .myPlainJaneRule {
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

[[ pen ]](http://codepen.io/gilbox/pen/cDkzn?editors=010)

- `--camelCase`
- Could possibly define margin, top, left, right, or bottom but should probably be avoided in most cases.
- Subclasses a Module
- Do not `@extend` a Module to create a Module Modifier
- Do not `@extend` a Module Modifier to create another Module Modifier

## Element

- `-camelCase`
- Each element has an associated module ie: `.MyModule-myElement`
- Nesting [Modules](#module) should **not** effect the appearance of any Element. 

## Element Modifier

- `--camelCase`
- Each modifier has an associated [Element](#element) ie: `.MyModule-myElement--myModifier`
- Nesting [Modules](#module) should **not** effect the appearance of any Element Modifier. 
- Subclasses an [Element](#element)

## State

- `.is-camelCase`
- Used in conjunction with JavaScript
- **No** style except in context with another rule. For example: `.MyModule.is-state`, `.MyModule-myElement.is-state`, `.MyModule-myElement--myModifier.is-state`, `.is-state .MyModule-myElement`, etc.

## .plainJaneRules

- `.camelCase`
- These rules should be completely flat. They include what are often called [utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName) and [layout rules](http://smacss.com/book/type-layout).

    
# Semantics

**When choosing class names, ignore function, and concentrate on style.** Just because we have a section on our website named *music* doesn't mean that we should name our [Module](#module) `MusicCard`. Name it `Card` instead. But if we need a [modifier](#module-modifier) for a green-tinted card in the section we're currently working on (which happens to be the music section) name it `Card--greenTint`. If it truly is specific to that section then `Card--music` is OK if nothing else comes to mind.

There is a lot of seemingly conflicting information about CSS semantics. Some people say to name your class by function like this:

    <div class="FacebookBtn">FB</div>
    
instead of

    <div class="Btn">FB</div>
    
However, we favor the second approach. Using the `.FacebookBtn` class name is convenient when you're using a library like jQuery because it keeps your JavaScript code semantically correct. However, with HTML5 and modern frameworks like angularjs the markup is already semantically correct via the use of custom element naming, attributes, and event handlers which declaratively describe the content and its function.

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

The [next section](#extend) discusses why we should avoid using `@extend`. However if we do use `@extend` despite our trepedations, we will try to restrict its use to placeholders.  And as we should with any `@extend`ed class, **keep `%placeholders` flat**, [here's why](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html).

    %placeholder {
      // avoid nesting .anyClassRules at all cost...
      .dontDoThis { ... }
    }

`%placeholder`s should be small pieces of reusable styling, and [they should do one thing and do it well](http://en.wikipedia.org/wiki/Single_responsibility_principle).

**Todo**: establish a naming convention for `%placeholder`s ?

# @extend

We don't `@extend` [Modules](#module) to create [Module Modifiers](#module-modifier) because **(1)** keeping modules totally flat may be near impossible, **(2)** `@extend` might result in more code than simple subclassing most of the time, **(3)** `@extend` is incompatible with media queries, **(4)** `@extend` makes understanding the cascade of SCSS code very difficult.

What about using `@extend` in other rules? **In most cases, using `@extend` can lead to confusion and should probably be avoided.**

# DRY

[[ pen ]](http://codepen.io/gilbox/pen/lKAIL?editors=010)


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
    
    
A downside is that doing a full-text search for a class won't take us where we need to go, but if the naming convention is well-established we'll have that in mind when searching anyway. Also, is this code more or less readable than the verbose version?

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
     └─── application.scss
     
In the example above, the sass compiler is compiling `application.scss` and all of the other files are being `@import`ed from `application.scss` (is this the best way?).

Use the SASS underscore naming convention whereby **all partials begin with underscore**.
 
# Positioning a Module inside of a Module

[[ pen ]](http://codepen.io/gilbox/pen/fwBhe?editors=010)

We will inevitably want to nest [Modules](#module) inside of modules. There are [various ways](http://stackoverflow.com/questions/24724929/smacss-and-bem-how-to-position-module-inside-of-a-module) that we could possibly position one [Module](#module) inside of another. In most cases we should **subclass the child [Module](#module) with an [*Element*](#element) class in the parent [Module](#module)**. For example, here we subclass `.Btn` with `.PopupDialog-closeBtn`:

### SCSS

    .Btn {
      ...
    }
    
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
      <button class="Btn PopupDialog-closeBtn"><i class="closeIco"></i> close</btn>
    </div>


# Namespacing

I don't like how it negatively effects readability, but if we need to namespace, prepend a lowercase two or three letter abbreviation.

    .ns-MyModule {
      ...
    }
    
# Linter

This tool does not exist, but it would be cool if it did.

- Confirm proper naming
- Enforce flat [`@extend`](#extend)s



