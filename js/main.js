const digimon = Vue.createApp({
    created(){
        console.log("created lifecycle hook called");
        fetch("http://localhost/digimon/public/characters")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.charactersData = data;
        })
        .catch(error => {
            console.error(error);
        })
    },

    data(){
        return{
            charactersData: [],
            levels: "",
            fields: [], 
            types: "",
            attributes: "",
            photo: "",
            error: "" 
        }
    },

    methods: {
        getDigimon(whichDigimon){
            console.log(whichDigimon);
            let title = whichDigimon;
            let convertedTitle = title.split(" ").join("+");
            console.log(convertedTitle);

            fetch(`https://digi-api.com/api/v1/digimon/${convertedTitle}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data){
                    console.log(data);
                    const digimon = data;
                    this.error = false;
                    this.levels = data.levels ? data.levels.map(lev => lev.level).join(", ") : "Not available";                     
                    this.fields = data.fields ? data.fields.map(fie => fie.image.replace(/%20/g, " ")) : [];            
                    this.types = digimon.types ? digimon.types[0].type :  "Not available";
                    this.attributes = data.attributes ? data.attributes.map(attr => attr.attribute).join(", ") : "Not available";                
                } else {
                    this.error = "No digimon found. Try Again."
                }
            })
            .catch(error => {
                console.error(error);
                this.error = "Error fetching digimon data"; 
            })
        }
    }
});

digimon.mount("#app");
