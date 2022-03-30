import { Node } from "cheerio";

declare global {
    interface ModifiedNode implements Node {
        data:string
    }
  }
  
  // eslint-disable-next-line import/prefer-default-export
  export { global };
  