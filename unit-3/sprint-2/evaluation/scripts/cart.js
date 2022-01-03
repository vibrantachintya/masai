var cartItems = JSON.parse(localStorage.getItem("cart-items"))||[];

    function showDishes(data) {
        let total = 0;
        document.querySelector("#dishes-container").textContent = "";
        data.map(function(dish) {
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = dish.strMeal;
            var h5 = document.createElement("h5");
            h5.textContent = "Rs. " + dish.strMealPrice;
            total += dish.strMealPrice;
            var button = document.createElement("button");
            button.textContent = "Remove";
            button.addEventListener("click", function() {
                removeFromCart(dish);
            });
            div.append(h4, h5, button);
            document.querySelector("#dishes-container").append(div);
        });
        if(total == 0)  {
            document.querySelector("#total-amount").textContent = "No Items.";
            document.querySelector("#checkout").style.display = "none";
        }else  {
            document.querySelector("#total-amount").textContent = "Rs. " + total;
            document.querySelector("#checkout").style.display = "block";
        }
    }

    function removeFromCart(dish) {
        let found = false;
        for(let i = 0; i < cartItems.length; i++) {
            if(cartItems[i].strMeal == dish.strMeal) {
                cartItems.splice(i, 1);
                found = true;
                break;
            }
        }
        if(found) {
            localStorage.setItem("cart-items", JSON.stringify(cartItems));
            showDishes(cartItems);
            alert("Item removed");
        } else {
            alert("Item not found or cart is empty!")
        }
    }

    showDishes(cartItems);