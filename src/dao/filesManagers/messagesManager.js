//importamos fileSystem desde fileSystem
import fs from "fs";
//importamos __dirname ruta absoluta desde utils
import __dirname from "../../utils.js";

//Manager tiene la logica - el router es el encargado de exponer los endpoints

//creamos una clase que siempre tiene un constructor que nos ayuda a definir  variables que hacen falta en esta clase THIS.PATH (el path hace referencia a una ruta, la ruta que se van a guardar los archivos, para eso importamos desde utils el __dirname (ruta absoluta) hacemos que busque en la carpeta files y los guarde como .json )
// los Manager son los encargados de hablar con nuestros archivos, tienen la logica del fileSystem , readFile writeFile.
//si no le digo al editor que exporte el manager al router no voy a poder configurar la respuesta  
export default class MessagesManager {
    constructor(){
        this.path = `${__dirname}/files/Messages.json`;
    }

        //ahora creamos el metodo findAll(encontrar todos) que va a traer y leer todos los mensajes; debemos asegurarnos que el archivo exista (fs.existsSync) y le pasamos la variable this.path. Aca le preguntamos a fileSystem si en esa ruta existe algun archivo (if) y si, si existe que me lo traiga, sino (else) retorname (return)  un array vacio. 
        //Hacemos manejo de errores con el try(intenta hacer tal cosa) catch(sino atrapalo) (manejo de errores) . usamos el catch para asegurarnos que nuestro servidor no se rompa (atrape el error) en caso de que tenga un error. Ventaja de usarlo: si usamos una request (peticion) y tenemos un error vamos a tener que desactivar y volver a activar el servidor, con el try catch lo encapsula y nos deja seguir trabajando, me muestra el error por consola  
        //creamos una variable const messagesString (me lo va a traer en string)
        //utilizamos el await fs.promises cuanto utilizamos el fileSystem con funcionalidades asyncrona 
        //readfile para leer el archivo que se encuentra en esa ruta y en formato utf-8, esto me lo devuelve en string y es incomodo para trabajar con un objeto entonces necesito transformarlo en un archivo de JSON lo parseamos y retornamos el messages.

        findAll = async () => {
            try {
                if (fs.existsSync(this.path)){
                    const messagesString = await fs.promises.readFile(this.path,"utf-8");
                    const messages = JSON.parse (messagesString);
                    return messages;
                }else {
                    return [];
                }
            }catch(error){
                console.log(error);
            }
        };

        //ahora creamos el metodo create ( crear mensajes ) y le agregamos una variable para traer los mensajes existentes y crear los mensajes nvos utilizando el manejo de errores con el Try Catch 
        //el this. (seria busca en messagesManager ) y el findAll nos va a retornar un array vacio hasta que le agreguemos un mensaje
        //luego llamamos al mensaje y lo pusheamos, antes debemos ir a crearlo al archivo, pero a ese archivo tenemos que hacerle stringify 
        create = async(message)=>{
            try {
                const messages = await this.findAll();
                messages.push(message);
                await fs.promises.writeFile(this.path,JSON.stringify(messages, null,'\t' )
                );
                return message;

            } catch (error) {
                console.log (error);
        }
        };
}




