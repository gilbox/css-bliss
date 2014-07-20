futuristic-sass-guide
=====================

My futuristic thoughts on structuring a SASS project. Ideas all stolen from BEM, SMACSS, OOCSS, SUITECSS

# General

- Use class selectors instead of element or attr selectors in most cases.
- SASS gives you too much power. In part the purpose of this guide is to restrict your use of that power.
- Try to avoid nesting, except as described in the DRY section.

# Naming

Title-case modules, camel-case elements. why-not-dashes ? Because cased names are more readable (very objective explanation, I know). Furthermore, now if you see a class name that doesntStartWithTitleCase you know that it's not a module. (What?!? not everything is a module?)

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
    
# Using @extend
    
Keep `%placeholders` flat, [here's why](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html). Furthermore, don't try to use @extend just to avoid adding multiple classes to an element in your markup.

    %placeholder {
      // avoid nesting .child rules at all cost...
    }
    
    .MyModule--modifier {
      // probably shouldn't use @extend .MyModule here for reason stated above
    }

# DRY

I'm not entirely sure this is a good idea, but here goes:

    .MyModule {
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
    
Downside is that doing a full-text search for a class won't take you where you need to go, but if the naming convention is well-established you'll have that in mind when searching anyway.

# .plainJaneRules

These rules should be mostly or completely flat. They include [utility classes](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityName) and [layout rules](http://smacss.com/book/type-layout).

How do you tell them apart? Do a full-text search. Why so flippant? Because I'm not sure that we really need all that `u-` and `l-` prefix stuff.

# Namespacing

I don't like how it negatively effects readability, but if one needs to namespace, prepend a lowercase two or three letter abbreviation.

    .ns-MyModule {
      ...
    }


# Building Blocks

## Module

- `TitleCase`
- No margin
- No top, left, right, bottom
- 100% width
- Self-contained

## Module Modifier

- `--camelCase`
- Could possibly define margin, top, left, right, or bottom but should probably be avoided in most cases.

## Element

- `-camelCase`
- Each element has an associated module ie: `MyModule-myElement`
- Should **not** be effected by any module except for it's own. Ie., the module can be nested inside of any other module and it should not effect the appearance of the element.

## Element Modifier

- `--camelCase`
- Each modifier has an associated Element ie: `MyModule-myElement--myModifier`
- Should **not** be effected by another other element except for its own. Ie., the module can be nested inside of any other module and it should not effect the appearance of the modifier.

## State

- `is-camelCase`
- Used in conjunction with JavaScript
- **No** style except in context with another rule. For example: `MyModule.is-state`, `MyModule-myElement.is-state`, `MyModule-myElement--myModifier.is-state`, `.is-state MyModule-myElement`, etc.

## .plainJaneRules

- Should be flat (might be some flexibility for layout rules)
