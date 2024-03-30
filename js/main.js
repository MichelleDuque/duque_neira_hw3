
//Lightbox Functionality

const instructionCircle = document.querySelector('.instruction-circle');

instructionCircle.addEventListener('click', toggleInstructionBox);

function toggleInstructionBox() {
    const instructionBox = document.querySelector('.instruction-box');
    instructionBox.style.display = instructionBox.style.display === 'block' ? 'none' : 'block';
}


const digimon = Vue.createApp({
    created() {
        // Fetch characters data from the API
        fetch("http://localhost:8888/digimon/public/characters")
            .then(res => res.json())
            .then(data => {
                this.charactersData = data;
                this.displayCharacter(0); // Display the first character
            })
            .catch(error => {
                console.error(error);
            });
    },

    data() {
        return {
            charactersData: [],
            count: 0,
            levels: "",
            fields: [],
            types: "",
            attributes: "",
            photo: "",
            error: ""
        }
    },

    methods: {
        // Method to display a character
        displayCharacter(count) {
            const character = this.charactersData[count];
            this.getDigimon(character.name);
        },

        // Method to fetch exteran API
        getDigimon(whichDigimon) {
            let title = whichDigimon;
            let convertedTitle = title.split(" ").join("+");

            fetch(`https://digi-api.com/api/v1/digimon/${convertedTitle}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        const digimon = data;
                        this.error = false;
                        this.levels = data.levels ? data.levels.map(lev => lev.level).join(", ") : "Not available";
                        this.fields = data.fields ? data.fields.map(fie => fie.image) : "Not available";
                        this.types = digimon.types ? digimon.types[0].type : "Not available";
                        this.attributes = data.attributes ? data.attributes.map(attr => attr.attribute).join(", ") : "Not available";
                    } else {
                        this.error = "No digimon found. Try Again."
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.error = "Error fetching digimon data";
                })
        },

        //SLIDER FUNCTIONS

        // Method to display the next character
        nextDigimon() {
            this.count++;
            if (this.count >= this.charactersData.length) {
                this.count = 0;
            }
            this.displayCharacter(this.count);
        },

        // Method to display the previous character
        previousDigimon() {
            this.count--;
            if (this.count < 0) {
                this.count = this.charactersData.length - 1;
            }
            this.displayCharacter(this.count);
        }
    }
});

digimon.mount("#app");

// second app for evolution

const digimonEvolution = Vue.createApp({
    created() {
        // Fetch characters data from the API
        fetch("http://localhost:8888/digimon/public/evolutions")
            .then(res => res.json())
            .then(data => {
                this.charactersData = data;
                this.displayEvo(0); // Display the first evolution
            })
            .catch(error => {
                console.error(error);
                this.error = "Error fetching data";
            });
    },

    data() {
        return {
            charactersData: [],
            count: 0,
            photo: "",
            evolutionName: "",
            error: "",
        }
    },

    methods: {
        displayEvo(count) {
            if (count >= 0 && count < this.charactersData.length) {
                const evolution = this.charactersData[count];
                this.photo = evolution.photo;
                this.evolutionName = evolution.evolution_name;
            } else {
                this.error = "Invalid evolution index";
            }
        },
    }
});

digimonEvolution.mount("#app-evolution");



