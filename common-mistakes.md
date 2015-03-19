# Common css-bliss Mistakes

**Note:** Some of these only make sense if you read them in order, because they build on the previous.

# Multiple Modules applied to same tag

### Bad

    <div class="PriceWidget">
      <button class="PriceWidget-submit Button">Recalculate</button>
    </div>
      
### Good

    <div class="PriceWidget">
      <div class="PriceWidget-submit">
        <button class="Button">Recalculate</button>
      </div>
    </div>

**OR**

    <div class="PriceWidget">
      <button class="Button Button--recalculate">Recalculate</button>
    </div>

# Module and Element classes applied to same tag

### Bad

    <div class="PriceWidget PriceWidget-submit">
      <button class="Button">Recalculate</button>
    </div>
      
### Good

    <div class="PriceWidget">
      <div class="PriceWidget-submit">
        <button class="Button">Recalculate</button>
      </div>
    </div>

# Width Applied at Module-level

### Bad

    .Button {
      width: 60px;
    }
  
### Good

    .PriceWidget-submit {   // wraps the button
      width: 60px;
    }
  
# Margin Applied at Module-level

### Bad

    .Button {
      margin-left: 10px;
    }
  
### Good

    .PriceWidget-submit {   // wraps the button
      padding-left: 10px;
    }  
    
# Margin Applied to Module Modifier

While css-bliss doesn't explicitly prohibit doing this, it should generally be avoided. Overuse of margin is bad for modularity. Whenever you find yourself utilizing `margin`, consider using `padding` on the parent element instead.

### Not Great

    .Button--margin10px {
      margin: 10px 0;
    }
  
### Good

    .PriceWidget-submit {   // wraps the button
      padding: 10px 0;
    }
  
  
  
