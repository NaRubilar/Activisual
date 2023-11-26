

export interface Usuarios {
    usuario: string;
    correo: string;
    password: string;
    repetirPassword: string;
    ubicacion: {
        lat: number;
        lng: number;
    }
}

export interface Foto {
    nombre: string;
    path: string;
    url: string;


}