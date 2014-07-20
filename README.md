futuristic-sass-guide
=====================

My futuristic thoughts on structuring a SASS project. Ideas all stolen from BEM, SMACSS, OOCSS, SUITECSS

# Naming

Title-case modules, camel-case elements.

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
      }
    }
    
Downside is that doing a full-text search for a class won't take you where you need to go, but if the naming convention is well-established you'll have that in mind when searching anyway.

