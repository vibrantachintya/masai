    var cartItems = JSON.parse(localStorage.getItem("cart-items"))||[];
    if(cartItems.length == 0) {
        document.querySelector("#submit").style.display = "none";
        document.querySelector("#status-text").textContent = "No items in cart!";
    } else document.querySelector("#submit").addEventListener("click", placeOrder);

    function placeOrder() {
        var address = document.querySelector("#address").value;
        if(address == "") {
            alert("Enter Address for Delivery");
            return;
        }
        document.querySelector("#address").value = "";
        var timeElapsed = 0;
        var id = setInterval(function() {
            document.querySelector("#status-text").textContent = "Time since order placed : " + timeElapsed + " Secs";
            if(timeElapsed == 0)
                alert("Your Order is Accepted!");
            else if(timeElapsed == 3)
                alert("Your Order is being Cooked!");
            else if(timeElapsed == 8)
                alert("Your Order is ready!");
            else if(timeElapsed == 10)
                alert("Order out for Delivery!");
            else if(timeElapsed == 12) {
                document.querySelector("#status-text").textContent = "Enjoy the food";
                clearInterval(id);
                localStorage.clear("cart-items");
                document.querySelector("#submit").style.display = "none";
                alert("Order Delivered!");
            }
            timeElapsed++;
        }, 1000);
    }
