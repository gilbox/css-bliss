# Common css-bliss Mistakes

**Note:** Some of these only make sense if you read them in order, because they build on the previous.

# Multiple Modules applied to one tag

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

# Module and Element classes applied to one tag

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
  
  
  
