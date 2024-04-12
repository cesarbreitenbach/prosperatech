import { ImageSourcePropType } from "react-native";
import Banner1 from "../assets/images/banner1.png" 
import Banner2 from "../assets/images/banner2.png"
import Banner3 from "../assets/images/banner3.png"
import Banner4 from "../assets/images/banner4.png"
import Banner6 from "../assets/images/banner6.png"
import Banner8 from "../assets/images/compreGold.png"

// Interface para definir a estrutura dos objetos de imagem
interface IBannerImage {
    image: ImageSourcePropType; // Tipo da imagem
    route: string; // Propriedade de rota
}

// Array de objetos de imagem com suas respectivas rotas
export const banners: IBannerImage[] = [
    { image: Banner4, route: "Machine" },
    { image: Banner8, route: "buycoins" },
    { image: Banner1, route: "Machine" },
    { image: Banner2, route: "aboutDigitalMines" },
    { image: Banner4, route: "Machine" },
    { image: Banner8, route: "buycoins" },
    { image: Banner3, route: "" },
    { image: Banner2, route: "aboutDigitalMines" },
    { image: Banner4, route: "Machine" },
    { image: Banner8, route: "buycoins" },
    { image: Banner2, route: "aboutDigitalMines" },
    { image: Banner6, route: "" },
    { image: Banner8, route: "buycoins" },
];

