let webStore = new Vue({
    el: '#app',
    data: {
        site_name: 'After School Classes',
        courses: courses,
        cart: [],
        showCourses: true
    },
    methods: {
        addToCart(course) {
            if (this.canAddToCart(course)) {
                this.cart.push(course.id);
                course.spaces--;
            }
        },
        canAddToCart(course) {
            return course.spaces > 0;
        },
        showCart() {
            this.showCourses = this.showCourses ? false : true;
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        removeFromCart(course) {
            // Build a new cart, leaving out one copy of this course
            let newCart = [];
            let removed = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === course.id && removed === false) {
                    removed = true;
                } else {
                    newCart.push(this.cart[i]);
                }
            }
            this.cart = newCart;
            course.spaces++;
            // Go back to the lessons page once the cart is empty
            if (this.cart.length === 0) {
                this.showCourses = true;
            }
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        }
    }
});
