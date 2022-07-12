import { DataTree } from "../components/ui-components/VDataTree.vue/VDataTree.vue"

const useGenerateTree = () => {
  const generateTree = (count: number, nestedLevel: number, index: number = 1): DataTree => {
  let level = nestedLevel
  let childrenCount = count   
  const children = level? [ ...Array(count).keys()]
  .map(i=>generateTree(childrenCount-2,level-1,i)):undefined
  return { 
   label:`Уровень ${level}`,
   id:`${level}-${index}`
   ,children:children
   }

  }
  return {generateTree}
}
