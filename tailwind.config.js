// tailwind.config.js

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        super_larg: "78%",
        registeration: "60%",
        share: "50rem",
        additional_user_data1: "40%",
        additional_user_data2: "80%",
        tour_guide_card: "60%",
        text_width: "500px",
        carousel_image: "100rem",
        larg: "30%",
      },
      height: {
        super_larg_height: "80%",

        super_larg_height2: "85%",
        carousel_height: "40rem",
      },
      backgroundColor: {
        share_color: "#F2BFB3",
      },
      backgroundImage: {
        share_card: 'url("/src/assets/share_card.jpg")',
        signUp: 'url("/src/assets/signUp.jpg")',
        login: 'url("/src/assets/login.jpg")',
        additional_user_data_image:
          'url("/src/assets/additional_user_form_image.jpg")',
        shareBackground: 'url("/src/assets/shareBackground.jpg")',
        recommendations_card: 'url("/src/assets/recommendationsCard.png")',
        admin_Image: 'url("/src/assets/adminBackground.jpg")',
        add_recommendations: 'url("/src/assets/addRecommendations.jpg")',
        explorePicture: 'url("/src/assets/explorePicture.jpg")',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
