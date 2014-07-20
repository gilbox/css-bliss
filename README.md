futuristic-sass-guide
=====================

My futuristic thoughts on structuring a SASS project. Ideas all stolen from BEM, SMACSS, OOCSS, SUITECSS.

# General

- Use class selectors instead of element or attr selectors in most cases.
- SASS gives us too much power. In part the purpose of this guide is to restrict our use of that power.
- Try to avoid nesting, except as described in the DRY section.
- **Keep modules small**. When in doubt, create a new module instead of bloating an existing module
- A class name will never have more than 3 dashes, ie: `.MyModule-myElement--myModifier`
- Be sure to click the `[ pen ]` links as you encounter them below.

# Naming

Title-case modules, camel-case elements. why-not-dashes ? Because cased names are more readable (very objective explanation, I know). Furthermore, if we see a class name that doesntStartWithTitleCase we know that it's not a module.

    .MyModule {
      .MyModule-myElement {
        ...
      }
      .MyModule-myElement--modifier {
        ...
      }
    }
    
    .MyModule--modifier {
      ...
    }
    
    .MyModule.is-state {
      ...
    }
    
    .myPlainJaneRule {
        ...
    }
    
# Linter

This tool does not exist, but it would be cool if it did.

- Confirm proper naming
- Enforce flat `@extend`s

# Semantics

**When choosing class names, ignore function, and concentrate on style.** Just because we have a section on our website named *music* doesn't meen that we should name our module `MusicCard`. Name it `Card` instead. But if we need a modifier for a green-tinted card in the section we're currently working on (which happens to be the music section) name it `Card--tintedAndSlanted`. If it truly is specific to that section then `Card--music` is OK if nothing else comes to mind.

There is a lot of seemingly conflicting information about CSS semantics. Some people say to name your class by function like this:

    <div class="FacebookBtn">FB</div>
    
instead of

    <div class="Btn">FB</div>
    
However, we favor the second approach. Using the `.FacebookBtn` class name is convenient when you're using a library like jQuery because it keeps your JavaScript code semantically currect. However, with HTML5 and modern frameworks like angularjs the markup is already semantically correct via the use of custom element naming, attributes, and event handlers which declaratively describe the content and its function.

What about our Jasmine unit tests which are heavy with jQuery selectors? If class names are *un-semantic* does that force us to write unit tests that break when simple stylistic changes are made to the interface? The solution to this is to favor the use of attribute and element selectors in our unit tests which generally means the tests will only break when functionality changes.

# Comments

Above each module, describe the purpose of the module, as well as it's scope. Be restrictive and specific so that when someone else looks at it and needs to add some styling, they will know if they should add-on to the module or create a new one.

# Using `%placeholder` and `@extend`
    
Keep `%placeholders` flat, [here's why](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html). Furthermore, don't try to use @extend just to avoid adding multiple classes to an element in our markup.

    %placeholder {
      // avoid nesting .child rules at all cost...
    }
    
    .MyModule--modifier {
      // don't use @extend .MyModule here for reason stated above
    }

Do **not** structure `@extend`s the way we structure modules. Don't think of `@extend`s as if they are modules. They should be small pieces of reusable styling, and [they should do one thing and do it well](http://en.wikipedia.org/wiki/Single_responsibility_principle).

**Todo**: establish a naming convention for `@extend`s ?

# DRY

[[ pen ]](http://codepen.io/gilbox/pen/adAtp?editors=010)

I'm not entirely sure this is a good idea, but here goes: 

    .MyModule {
      ...
      &-myElement {
        ...
      }
      
      &-myOtherElement {
        ...
        &--myModifier {
          ...
        }
        
        &--anotherModifier {
          ...
        }
      }
    }
    
and module modifiers:

    .MyModule--myModifier {
      ...
      .MyModule {
        &-myOtherElement {
          ...
          &--anotherModifier {
            ...
          }
        }
      }
    }
    
    
A downside is that doing a full-text search for a class won't take us where we need to go, but if the naming convention is well-established we'll have that in mind when searching anyway. Also, is this code more or less readable than the verbose version?


# Namespacing

I don't like how it negatively effects readability, but if we need to namespace, prepend a lowercase two or three letter abbreviation.

    .ns-MyModule {
      ...
    }


# Positioning a Module inside of a Module

[[ pen ]](http://codepen.io/gilbox/pen/fwBhe?editors=010)

We will inevitably want to nest modules inside of modules. There are [various ways](http://stackoverflow.com/questions/24724929/smacss-and-bem-how-to-position-module-inside-of-a-module) that we could possibly position one module inside of another. In most cases we should **subclass the child module with an *Element* class in the parent module**. For example:

### SCSS

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



# Building Blocks

## Module

- `.TitleCase`
- Self-contained
- Most modules should not set their own width, margin, and positioning. By authoring a module to be full-width or inline, it can better adapt to the dimensions of an ancestral context. [(source)](https://github.com/suitcss/suit/blob/master/doc/components.md#adapting-to-ancestral-context)
    - No margin
    - No top, left, right, bottom
    - 100% width, or auto width

## Module Modifier

- `--camelCase`
- Could possibly define margin, top, left, right, or bottom but should probably be avoided in most cases.
- Subclasses a module

## Element

- `-camelCase`
- Each element has an associated module ie: `.MyModule-myElement`
- Should **not** be effected by any module except for it's own. Ie., the module can be nested inside of any other module and it should not effect the appearance of the element.

## Element Modifier

- `--camelCase`
- Each modifier has an associated Element ie: `.MyModule-myElement--myModifier`
- Should **not** be effected by another other element except for its own. Ie., the module can be nested inside of any other module and it should not effect the appearance of the modifier.
- Subclasses an element
- **Todo**: Do we really need element modifiers, or should we rely on module modifiers instead ?

## State

- `.is-camelCase`
- Used in conjunction with JavaScript
- **No** style except in context with another rule. For example: `.MyModule.is-state`, `.MyModule-myElement.is-state`, `.MyModule-myElement--myModifier.is-state`, `.is-state .MyModule-myElement`, etc.

## .plainJaneRules

These rules should be completely flat. They include what are often called [utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName) and [layout rules](http://smacss.com/book/type-layout).

