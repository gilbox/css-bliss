futuristic-sass-guide
=====================

My futuristic thoughts on structuring a SASS project. Ideas all stolen from BEM, SMACSS, OOCSS, SUITECSS

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
    
# Using @extend
    
Keep `%placeholders` flat, [here's why](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html)

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

- No margin
- No top, left, right, bottom
- 100% width

## Module Modifier

- Could possibly define margin, top, left, right, or bottom but should probably be avoided in most cases.

## Element

## Element Modifier

## .plainJaneRules
