import {createContext,useContext,useState} from "react"

const LatexContext = createContext({})
export function useLatexContext(){
    return useContext(LatexContext);
}
export default function Latexprovider({children}){
    const [latex,setLatex]=useState('');
    function change(string){
        setLatex(string)
    }
    const store={
        latex:latex,
        setLatex:{change}
    }
    return <LatexContext.Provider value={store}>{children}</LatexContext.Provider>
}
