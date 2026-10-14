let webStore = new Vue({
    el: '#app',
    data: {
        site_name: 'After School Classes',
        courses: courses,
        cart: []
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
        }
    }
});
