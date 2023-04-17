export interface BreedsResponse <T>{
    message: T,  //   używamy typów generycznych, w momencie odwołania do modelu określamy jakiego typu jest message  
    status: string
}
