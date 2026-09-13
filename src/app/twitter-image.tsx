// O Next lê a configuração de rota no código, antes de executar qualquer
// coisa, então ela precisa estar escrita literalmente em cada arquivo:
// reexportar o `dynamic` do Open Graph não funciona, o build recusa.
export const dynamic = "force-static";

// O resto do card é o mesmo do Open Graph.
export { default, size, contentType, alt } from "./opengraph-image";
