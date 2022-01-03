var cartItems = JSON.parse(localStorage.getItem("cart-items"))||[];
    document.querySelector("#items-cart").textContent = cartItems.length;
    async function loadDishes() {
        try {
            var res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian`);
            var data = await res.json();
            showDishes(data.meals);
        } catch(err) {
            console.log(err);
        }
    }

    function showDishes(data) {
        document.querySelector("#dishes-container").textContent = "";
        data.map(function(dish) {
            var div = document.createElement("div");
            var img = document.createElement("img");
            img.src = dish.strMealThumb;
            var divInner = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = dish.strMeal;
            var h5 = document.createElement("h5");
            var price = Math.floor(Math.random()*400)+100;
            dish.strMealPrice = price;
            h5.textContent = "Rs. " + dish.strMealPrice;
            var button = document.createElement("button");
            button.textContent = "Add to Cart";
            button.addEventListener("click", function() {
                addToCart(dish);
            });
            divInner.append(h4, h5, button);
            div.append(img, divInner);
            document.querySelector("#dishes-container").append(div);
        });
    }

    function addToCart(dish) {
        for(let i = 0; i < cartItems.length; i++) {
            if(cartItems[i].strMeal == dish.strMeal) {
                alert("Already added!")
                return;
            }
        }
        cartItems.push(dish);
        document.querySelector("#items-cart").textContent = cartItems.length;
        localStorage.setItem("cart-items", JSON.stringify(cartItems));
        alert("Added to cart!")
    }

    loadDishes();