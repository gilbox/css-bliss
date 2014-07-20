futuristic-sass-guide
=====================

My futuristic thoughts on structuring a SASS project. Ideas all stolen from BEM, SMACSS, OOCSS, SUITECSS

# General

- Use class selectors instead of element or attr selectors in most cases.
- SASS gives you too much power. In part the purpose of this guide is to restrict your use of that power.
- Try to avoid nesting, except as described in the DRY section.
- When in doubt, create a new module instead of bloating an existing module
- A class name will never have more than 3 dashes, ie: `.MyModule-myElement--myModifier`

# Naming

Title-case modules, camel-case elements. why-not-dashes ? Because cased names are more readable (very objective explanation, I know). Furthermore, if you see a class name that doesntStartWithTitleCase you know that it's not a module. (What?!? not everything is a module?)

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

When choosing names, ignore function, concentrate on style. Just because we have a section on our website named *music* doesn't meen that we should name our module `MusicCard`. Name it `Card` instead. But if we need a modifier for a green-tinted card in the section we're currently working one (which happens to be the music section) name it `Card--greenTint`. If it truly is specific to that section then `Card--music` is OK as well.

# Comments

Above each module, describe the purpose of the module, as well as it's scope. Be restrictive and specific so that when someone else looks at it and needs to add some styling, they will know if they should add-on to the module or create a new one.

# Using @extend
    
Keep `%placeholders` flat, [here's why](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html). Furthermore, don't try to use @extend just to avoid adding multiple classes to an element in your markup.

    %placeholder {
      // avoid nesting .child rules at all cost...
    }
    
    .MyModule--modifier {
      // don't use @extend .MyModule here for reason stated above
    }

Based on the above, do **not** structure `@extend`s the way you structure modules. Don't think of `@extend`s as if they are modules. They should be small pieces of reusable styling, and they should be used sparingly.

**Todo**: establish a naming convention for `@extend`s ?

# DRY

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
    
It starts to get hairy with module modifiers:

    .MyModule--myModifier {
       .MyModule {
          ...
          &-myOtherElement {
            ...
            &--anotherModifier {
              ...
            }
          }
        }
    }
    
    
Another downside is that doing a full-text search for a class won't take you where you need to go, but if the naming convention is well-established you'll have that in mind when searching anyway.


# Namespacing

I don't like how it negatively effects readability, but if we need to namespace, prepend a lowercase two or three letter abbreviation.

    .ns-MyModule {
      ...
    }


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

## Element

- `-camelCase`
- Each element has an associated module ie: `.MyModule-myElement`
- Should **not** be effected by any module except for it's own. Ie., the module can be nested inside of any other module and it should not effect the appearance of the element.

## Element Modifier

- `--camelCase`
- Each modifier has an associated Element ie: `.MyModule-myElement--myModifier`
- Should **not** be effected by another other element except for its own. Ie., the module can be nested inside of any other module and it should not effect the appearance of the modifier.

## State

- `.is-camelCase`
- Used in conjunction with JavaScript
- **No** style except in context with another rule. For example: `.MyModule.is-state`, `.MyModule-myElement.is-state`, `.MyModule-myElement--myModifier.is-state`, `.is-state .MyModule-myElement`, etc.

## .plainJaneRules

These rules should be completely flat. They include [utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName) and [layout rules](http://smacss.com/book/type-layout).

How do you tell them apart? Do a full-text search. Why so flippant? Because I'm not sure that we really need all that `u-` and `l-` prefix stuff.
