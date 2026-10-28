let webStore = new Vue({
    el: '#app',
    data: {
        site_name: 'After School Classes',
        courses: courses,
        cart: [],
        showCourses: true,
        sortBy: 'subject',
        sortOrder: 'ascending',
        order: {
            name: '',
            phone: '+971'
        }
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
            // Build a new cart by removing the particular item and pushing the rest of items in new cart and mapping the new cart back to cart
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
        },
        submitForm() {
            alert('Order submitted! Thank you, ' + this.order.name + '.');
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        },
        sortedCourses() {
            let coursesArray = this.courses.slice(0);
            // Save these first, because "this" doesn't mean the Vue app inside compare
            let sortBy = this.sortBy;
            let sortOrder = this.sortOrder;
            function compare(a, b) {
                let result = 0;
                if (a[sortBy] > b[sortBy]) {
                    result = 1;
                }
                if (a[sortBy] < b[sortBy]) {
                    result = -1;
                }
                // Flip the result to sort the other way
                if (sortOrder === 'descending') {
                    result = -result;
                }
                return result;
            }
            return coursesArray.sort(compare);
        },
        validName() {
            // Letters only (spaces allowed between words, e.g. "Rayaan Ali")
            let nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
            return nameRegex.test(this.order.name);
        },
        validPhone() {
            // UAE mobile: +971 followed by 5 and 8 more digits, e.g. +971501234567
            let phoneRegex = /^\+9715[0-9]{8}$/;
            return phoneRegex.test(this.order.phone);
        },
        canCheckout() {
            return this.validName && this.validPhone;
        }
    }
});
